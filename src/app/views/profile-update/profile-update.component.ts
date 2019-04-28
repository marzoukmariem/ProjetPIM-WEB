import { Component, OnInit } from '@angular/core';
import {ParentService} from '../../Services/parent.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import * as firebase from 'firebase';
import {HttpClient} from '@angular/common/http';




@Component({
  selector: 'app-profile-update',
  templateUrl: './profile-update.component.html',
  styleUrls: ['./profile-update.component.css']
})
export class ProfileUpdateComponent implements OnInit {
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
    console.log('idparentfromsession', localStorage.getItem('idparent'));
    this.parentnumber = Number(localStorage.getItem('idparent'));
    }

  ngOnInit() {

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

  onSubmit(form?: NgForm) {
    {try {
      const formData = new FormData();
      formData.append('file', this.file);
      this.http.post('http://79.137.75.40/kidspay/up.php', formData)
        .subscribe((data) => {
          console.log('Got some data from backend ', data);
          // @ts-ignore
          console.log('Got some data from backend ', data.url);
          const user = {
        id: this.parentnumber,
        nom: this.service.formData1.nom,
        prenom: this.service.formData1.prenom,
        numTel: this.service.formData1.numTel,
        role: 'parent',
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
