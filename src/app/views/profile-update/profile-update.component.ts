import { Component, OnInit } from '@angular/core';
import {ParentService} from '../../Services/parent.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import * as firebase from 'firebase';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';




@Component({
  selector: 'app-profile-update',
  templateUrl: './profile-update.component.html',
  styleUrls: ['./profile-update.component.css']
})
export class ProfileUpdateComponent implements OnInit {
  _codeNum_: number;
  URLphoto = '';
  photouser = '';
  nomuser = '';
  prenomuser = '';
  numuser = '';
  email = '';
  balanceuser = null;
  file: File = null;
  fileToUpload: File = null;
  imageUrl = '/assets/img/pro.png';
  parentnumber: number;
  private _data: [any];
  get data(): [any] {
    return this._data;
  }

  set data(value: [any]) {
    this._data = value;
  }
  constructor(private service: ParentService , private route: ActivatedRoute, private router: Router, private http: HttpClient) {
    this.URLphoto = environment.apiURL1 ;
    this.photouser = localStorage.getItem('photouser');

    this.nomuser = localStorage.getItem('nom');

    this.prenomuser = localStorage.getItem('prenom');

    this.balanceuser = localStorage.getItem('balance');
    if (localStorage.getItem('photouser') !== 'null') {this.imageUrl = environment.apiURL1 + localStorage.getItem('photouser'); }





    console.log('idparentfromsession', localStorage.getItem('idparent'));
    this.parentnumber = Number(localStorage.getItem('idparent'));
    console.log('idfrom update', this.parentnumber);
    }

  ngOnInit() {
    if ( localStorage.getItem('session') === 'false') {

      this.router.navigate(['KidsPay/Erreur']);


    }
    this.resetForm();
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



  resetForm(form?: NgForm) {
    // @ts-ignore
    this.service.formData1 = {
      id: null,
      nom: '',
      prenom: '',
      cin: '',
      email: '',
      numTel: '',
      password: '',
      role: ''
    };
    if ( this.service.formData1.id == null) {
      this.service.remplirform(this.parentnumber);
    }
    console.log(this.service.formData1, 'formserviceedit');

  }
  hasNoDigitFind(_str_) {
    this._codeNum_ = 10;  /*When empty string found*/
    let _strArray = [];

    if (_str_ !== '' || _str_ !== undefined || _str_ !== null) {
      _strArray = _str_.split('');
      for (let i = 0; i < _strArray.length; i++) {
        if (!isNaN(parseInt(_strArray[i]))) {
          this._codeNum_ = -1;
        } else {
          this._codeNum_ = 1;
        }
      }

    }
    return this._codeNum_;
  }
  onSubmit(form?: NgForm) {

    let email = 0;
    const cinExiste = 0;
    this.http.get(environment.apiURL +  '/users/').subscribe(res => {
      console.log(res, 'hereeeeeeeeeeeeeeeeeeeeeeeeeee');

        // @ts-ignore
      for (let i = 0; i < Number(res.length); i++) {
        console.log(res, res[i].email);
        // @ts-ignore
        if (res[i].email === this.service.formData1.email && res[i].id !== this.parentnumber ) {
          email = 1;

        }}


      this.hasNoDigitFind(this.service.formData1.numTel);
      console.log(this._codeNum_, 'oui');


      if (String(this.service.formData1.password).length === 0 || email === 1 || String(this.service.formData1.email).length === 0 ||
  String(this.service.formData1.numTel).length === 0 || String(this.service.formData1.prenom).length === 0 ||
  String(this.service.formData1.password).length === 0 || String(this.service.formData1.nom).length === 0  || this._codeNum_ === 1) {
  alert('Veuillez Remplir  Corectement les champs');

} else {
if ( this.fileToUpload !== null) {

  {
    try {
      const formData = new FormData();
      formData.append('file', this.file);
      this.http.post(environment.apiURL1 + 'up.php', formData)
        .subscribe((data) => {
          console.log('Got some data from backend ', data);
          // @ts-ignore
          console.log('Got some data from backend ', data.url);
          const user = {
            id: this.parentnumber,
            nom: this.service.formData1.nom,
            prenom: this.service.formData1.prenom,
            numTel: this.service.formData1.numTel,
            role: 'Parent',
            cin: this.service.formData1.cin,
            email: this.service.formData1.email,
            password: this.service.formData1.password,
            // @ts-ignore
            photo: data.url
          };


          // console.log(author,"author")
          this.service.updateparent(user, this.parentnumber)
            .subscribe(resp => {
                console.log(resp, 'res');
                alert('Parent a été modifié avec succès');
                this.router.navigate(['KidsPay/Aceuilparent/']);
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

  }

} else {


  const user = {
    id: this.parentnumber,
    nom: this.service.formData1.nom,
    prenom: this.service.formData1.prenom,
    numTel: this.service.formData1.numTel,
    role: 'Parent',
    cin: this.service.formData1.cin,
    email: this.service.formData1.email,
    password: this.service.formData1.password,
    // @ts-ignore
    photo: localStorage.getItem('photouser')
  };


  this.service.updateparent(user, this.parentnumber)
    .subscribe(resp => {
        console.log(resp, 'res');
        alert('Parent a été modifié avec succès');
        this.router.navigate(['KidsPay/Aceuilparent/']);
      },
      error => {
        console.log(error, 'error');
      });



}


}

}); }



}
