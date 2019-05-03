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
  templateUrl: './user-profile3.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfile3Component implements OnInit {
  storenumber: number

  file: File = null;
  fileToUpload: File = null;
  imageUrl = '/assets/img/newProduct.png';

  constructor(private service: StoreService, private route: ActivatedRoute, private router: Router, private http: HttpClient) {
    this.route.queryParams.subscribe(params => {
      console.log(params); 

      this.storenumber = params.idm;
      console.log('idstore:' + this.storenumber); 
    });
  }

  ngOnInit() {
    this.service.getNewProductsByStore(this.storenumber);
     
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
      this.http.post(environment.apiURL2+'/up.php', formData)
        .subscribe((data) => {
          console.log('Got some data from backend ', data);
          // @ts-ignore
          console.log('Got some data from backend ', data.url);
          const produit = {
        
        nom: this.service.formData1.nom,
        categorie: this.service.formData1.categorie,
        code: this.service.formData1.code,
        Store:this.storenumber,
        prix:this.service.formData1.prix,
        // @ts-ignore
        photo: data.url
      };


      // console.log(author,"author")
          this.service.ajoutProduit(produit)
        .subscribe(resp => {
            console.log(resp, 'res');
            alert('produit mis a jour avec succès');
            this.service.getNewProductsByStore(this.storenumber);
            this.service.refresh();
            // @ts-ignore
     this.service.formData1 = {
      id: null,
      nom: '',
      categorie: '',
      code: '',
      Store: null
    };

          //  this.router.navigate(['KidsPay/AceuilAdmin/parents']);
          },
          error => {
            console.log(error, 'error');
          });


        }, (error) => {
          console.log('Error! ', error);
        });


    } catch (e) {
      console.log(e);
    }

    }}

    onOrderDelete(id: number) {
      if (confirm('Are you sure to delete this ?')) {
        this.service.deleteProduct(id).then(res => {
          this.service.refresh();
          this.service.getNewProductsByStore(this.storenumber);
        });
      }
    }

    openForEdit(id:number){
      this.router.navigate(['/KidsPay/Aceuilcommercant/Historique/dashboard3Edit/'+id], { queryParams: { idm: this.storenumber } })
    }

    cancel(){
      
    }
  

  }
