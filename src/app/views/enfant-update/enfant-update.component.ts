import { Component, OnInit } from '@angular/core';
import {ParentService} from '../../Services/parent.service';
import {ActivatedRoute, Router} from '@angular/router';
import {EnfantService} from '../../Services/enfant.service';
import {FormBuilder, FormGroup, NgForm} from '@angular/forms';
import * as firebase from 'firebase';

import {from} from 'rxjs';
import {resolve} from 'url';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';



@Component({
  selector: 'app-enfant-update',
  templateUrl: './enfant-update.component.html',
  styleUrls: ['./enfant-update.component.css']
})
export class EnfantUpdateComponent implements OnInit {
   imageUrl = '/assets/img/pro.png';
  file: File = null;
  fileToUpload: File = null;
  enfantnumber: number;
  profileForm: FormGroup;
  error: string;
  URLphoto = environment.apiURL1 ;
  photouser = '';
  photoenfant = '';
  photoenfant1 = '';
  nomuser = '';

  prenomuser = '';

  balanceuser = '';
 fileUpload = {status: '', message: '', filePath: ''};

  constructor(private fb: FormBuilder, private service: EnfantService , private route: ActivatedRoute, private router: Router, private http: HttpClient) {
    this.route.queryParams.subscribe(params => {
      console.log(params); // {order: "popular"}

      this.enfantnumber = params.ide;
      console.log('id:' + this.enfantnumber); // popular
    });

    this.URLphoto = environment.apiURL1 ;
    this.photouser = localStorage.getItem('photouser');

    this.nomuser = localStorage.getItem('nom');

    this.prenomuser = localStorage.getItem('prenom');

    this.balanceuser = localStorage.getItem('balance');


 }


  ngOnInit() {


    if ( localStorage.getItem('session') === 'false') {

      this.router.navigate(['KidsPay/Erreur']);


    }

    this.http.get(environment.apiURL + '/enfants/' + this.enfantnumber + '/').subscribe(resp => {
      // @ts-ignore
      this.photoenfant1 = resp.photo;
      if (this.photoenfant1 !== 'null') {

  this.imageUrl = environment.apiURL1 + this.photoenfant1;

}

    });




    this.service.remplirform(this.enfantnumber);

    console.log('this.imageUrl', this.imageUrl);
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

    if ( this.fileToUpload !== null) {






    try {



     const formData = new FormData();
     formData.append('file', this.file);

     this.http.post(environment.apiURL1 + '/up.php', formData)
        .subscribe((data) => {
          console.log('Got some data from backend ', data);
          // @ts-ignore
          console.log('Got some data from backend ', data.url);
          const user = {
            id: this.enfantnumber,
            nom: this.service.formData3.nom,
            prenom: this.service.formData3.prenom,
            solde: this.service.formData3.solde,
            idtag: this.service.formData3.idtag,
            etatCompte: this.service.formData3.etatCompte,
            code: this.service.formData3.code,
            // @ts-ignore
            photo: data.url,
            parent: this.service.formData3.parent
          };

          this.service.updateenfant(user, this.enfantnumber)
            .subscribe(resp => {
                console.log(resp, 'res');
                alert('Enfant a été modifié avec succès');
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

    } else {


      this.http.get(environment.apiURL + '/enfants/' + this.enfantnumber + '/').subscribe(resp => {
        // @ts-ignore
        this. photoenfant = resp.photo;


        const user = {
          id: this.enfantnumber,
          nom: this.service.formData3.nom,
          prenom: this.service.formData3.prenom,
          solde: this.service.formData3.solde,
          idtag: this.service.formData3.idtag,
          etatCompte: this.service.formData3.etatCompte,
          code: this.service.formData3.code,
          // @ts-ignore
          photo:  this. photoenfant,
          parent: this.service.formData3.parent
        };



        this.service.updateenfant(user, this.enfantnumber)
          .subscribe(resp1 => {
              console.log(resp1, 'res');
              alert('Enfant a été modifié avec succès');
              //  this.router.navigate(['KidsPay/AceuilAdmin/parents']);
            },
            error => {
              alert('Error');
            });

      });
      }
    }

}
