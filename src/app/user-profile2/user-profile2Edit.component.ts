import { Component, OnInit } from '@angular/core';
import { User } from '../Models/user.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LoginComponent } from '../views/login/login/login.component';
import { StoreService } from '../Services/store.service';
import { ActivatedRoute, Router } from '@angular/router';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile2Edit.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfile2EditComponent implements OnInit {
  storenumber: number

  file: File = null;
  fileToUpload: File = null;
  imageUrl = '/assets/img/newProduct.png';
  productId= this.currentRoute.snapshot.paramMap.get('id')
  constructor(private service: StoreService, 
    private route: ActivatedRoute, 
    private router: Router, 
    private http: HttpClient,
    private currentRoute:ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      console.log(params); 

      this.storenumber = params.idm;
      console.log('idstore:' + this.storenumber); 
    });
  }

  ngOnInit() {
    
    console.log(this.productId,'idProduit:')

    this.service.getProductsByStore(this.storenumber);
    this.service.getProduct(parseInt(this.productId)).then(res=>{
        
      this.service.formData1 = res;
      this.imageUrl='http://79.137.75.40/kidspay/'+this.service.formData1.photo
    });
    }

    featuredPhotoSelected(event: any) {


      this.file = event.target.files[0];
      console.log('selected file name: =', this.file.name);
 
      this.fileToUpload = event.target.files.item(0);
      const reader = new FileReader();
      reader.onload = (event1: any) => {
       this.imageUrl = event1.target.result;
     };
      reader.readAsDataURL(this.fileToUpload);
 
 
   }

   onSubmit(form?: NgForm) {
    {try {
      const formData = new FormData();
      formData.append('file', this.file);
      this.http.post('http://79.137.75.40/kidspay/up.php', formData)
        .subscribe((data) => {
          console.log('Got some data from backend ', data);
          // @ts-ignore
          console.log('Got some data from backend ', data.url);
          const produit = {
        id:this.productId,
        nom: this.service.formData1.nom,
        categorie: this.service.formData1.categorie,
        code: this.service.formData1.code,
        Store:this.storenumber,
        // @ts-ignore
        photo: data.url,
        prix: this.service.formData1.prix,
      };


      // console.log(author,"author")
      console.log(produit.id,"yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy")
          this.service.updateProduit(produit)
          
        .subscribe(resp => {
          this.service.refresh();
            console.log(resp, 'res');
            alert('produit ajouté avec succès');
            this.service.getProductsByStore(this.storenumber);
          //  this.router.navigate(['KidsPay/AceuilAdmin/parents']);
          },
          error => {
            console.log(error, 'error');
          });

          this.service.formData1.nom=''
        this.service.formData1.categorie=''
        this.service.formData1.code=''
        this.service.formData1.prix=0
       
        this.imageUrl = '/assets/img/newProduct.png';
        this.service.formData1.prix

        }, (error) => {
          console.log('Error! ', error);
        });


    } catch (e) {
      console.log(e);
    }

    }
    this.router.navigate(['/KidsPay/Aceuilcommercant/Historique/dashboard2'], { queryParams: { idm: this.storenumber } })
  }

    onOrderDelete(id: number) {
      if (confirm('Are you sure to delete this ?')) {
        this.service.deleteProduct(id).then(res => {
          this.service.getProductsByStore(this.storenumber);
        });
      }
    }

    openForEdit(id:number){
      this.router.navigate(['/KidsPay/Aceuilcommercant/Historique/dashboard2Edit/'+id], { queryParams: { idm: this.storenumber } })
      console.log(this.productId,'idProduit:')
      localStorage.setItem("idProduit",id+"");
      console.log(localStorage.getItem("idProduit"), "idProduit");

      
    this.service.getProductsByStore(this.storenumber);
    this.service.getProduct(parseInt(localStorage.getItem("idProduit"))).then(res=>{
        
      this.service.formData1 = res;
      this.imageUrl='http://79.137.75.40/kidspay/'+this.service.formData1.photo
    });
    }

    

    

  }
