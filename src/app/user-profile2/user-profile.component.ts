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
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfile2Component implements OnInit {
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
    this.service.getProductsByStore(this.storenumber);
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
      this.http.post('http://localhost/kidspay/up.php', formData)
        .subscribe((data) => {
          console.log('Got some data from backend ', data);
          // @ts-ignore
          console.log('Got some data from backend ', data.url);
          const produit = {
        
        nom: this.service.formData1.nom,
        genre: this.service.formData1.genre,
        code: this.service.formData1.code,
        Store:this.storenumber,
        // @ts-ignore
        photo: data.url
      };


      // console.log(author,"author")
          this.service.ajoutProduit(produit)
        .subscribe(resp => {
            console.log(resp, 'res');
            alert('Parent a été modifié avec succès');
            this.router.navigate(['KidsPay/Aceuilcommercant/Historique/dashboard2'], { queryParams: { idm: this.storenumber } });
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
}
