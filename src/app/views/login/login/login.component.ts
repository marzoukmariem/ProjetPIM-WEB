import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { EnfantService } from '../../../Services/enfant.service';
import { UserService } from '../../../Services/user.service';
import { NgForm } from '@angular/forms';
import { User } from '../../../Models/user.model';
import { Parent } from '../../../Models/parent.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  static idcommercantGlobal;
  list: User[];
  user1: User;

  Data: [any];
  private test: [any];

  set _test(value: [any]) {
    this._test = value;
  }

  get _test(): [any] {
    return this.test;
  }

  readonly rootURL = 'http://localhost:8000/kidspay/';

  constructor(
    private router: Router, private service: UserService
  ) {
    this.list = [];

  }

  ngOnInit() {
    localStorage.clear();
    localStorage.setItem('session', 'false');
    document.body.className = 'hold-transition login-page';
    this.resetForm();
    console.log('nom from login session', localStorage.getItem('nomfromlogin'));

    }

  resetForm(form?: NgForm) {
    if (form != null) {
      form.resetForm();
    }
    // @ts-ignore
    this.service.formData = {
      id: null,
      nom: '',
      prenom: '',
      cin: '',
      email: '',
      numTel: '',
      password: '',
      role: ''
    };
  }

  login(form?: NgForm) {
// this.service.toconnect(this.service.formData.email, this.service.formData.password).toPromise().then(res=>this.list=res as User[]);
    this.service.toconnect(this.service.formData.email, this.service.formData.password).subscribe(res => {

      // @ts-ignore
      if (res.length === 0) {
      alert('login ou mot de passse éronné');
    } else {


        this.service.toconnect(this.service.formData.email, this.service.formData.password).subscribe(resp => {
          console.log(resp, 'res');
          localStorage.setItem('session', 'true');
          console.log(resp['0'].fields.role, 'role');
          localStorage.setItem('idparent', resp['0'].pk);
          console.log('id from login', localStorage.getItem('idparent'));
          localStorage.setItem('nom', resp['0'].fields.nom);
          console.log('id from login', localStorage.getItem('nom'));
          localStorage.setItem('prenom', resp['0'].fields.prenom);
          localStorage.setItem('balance', resp['0'].fields.balance);
          localStorage.setItem('photouser', resp['0'].fields.role);
          localStorage.setItem('numuser', resp['0'].fields.numTel);
          if (resp['0'].fields.role == 'Parent') {
            console.log('hello parent', 'heloo');

            this.router.navigate(['KidsPay/Aceuilparent'], { queryParams: { idp: resp['0'].pk} });
          }
          if (resp['0'].fields.role == 'Commercant') {
            console.log('hello comercant', 'comm');

            localStorage.setItem('token', resp['0'].pk);
            console.log(localStorage.getItem('token'), 'token');

            this.router.navigate(['KidsPay/AceuilComerçant/dashboard'], {queryParams: { idc: resp['0'].pk } });

          } if (resp['0'].fields.role == 'admin') {
            console.log('hello admin', 'heloo');
            this.router.navigate(['KidsPay/AceuilAdmin/Gestioncompte']);
          }


        });
      }});


  }






}
