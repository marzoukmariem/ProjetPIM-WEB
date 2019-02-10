import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from "@angular/common/http";
import {EnfantService} from "../../../Services/enfant.service";
import {UserService} from "../../../Services/user.service";
import {NgForm} from "@angular/forms";
import {User} from "../../../Models/user.model";
import {Parent} from "../../../Models/parent.model";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  list:User[];
  user1:User;

  Data: [any];
  private test:[any];

  set _test(value: [any]) {
    this._test = value;
  }

  get _test(): [any] {
    return this.test;
  }

  readonly rootURL = "http://localhost:8000/kidspay/"

  constructor(
    private router: Router, private service: UserService
  ) {
    this.list=[];

  }

  ngOnInit() {

    document.body.className = 'hold-transition login-page';
    this.resetForm();

  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.resetForm();
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
    }
  }

  login(form?: NgForm) {

    this.service.toconnect(this.service.formData.email, this.service.formData.password).toPromise().then(res=>this.list=res as User[]);
    console.log(this.list, "list");
      if (this.list.length==0) {
      alert("login ou mot de passse éronné")
    } else {
      try {

        this.service.toconnect(this.service.formData.email, this.service.formData.password).subscribe(resp => {
            console.log(resp, "res");
            this.router.navigate(['KidsPay/AceuilAdmin/']);
          },
          error => {
            console.log(error, "error");
          })

      } catch (e) {
        console.log(e);
      }

    }
  }



  }


