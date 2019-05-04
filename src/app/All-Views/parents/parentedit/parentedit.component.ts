import { Component, OnInit } from '@angular/core';
import {ParentService} from '../../../Services/parent.service';
import {NgForm} from '@angular/forms';
import {EnfantService} from '../../../Services/enfant.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-parentedit',
  templateUrl: './parentedit.component.html',
  styleUrls: ['./parentedit.component.css']
})
export class ParenteditComponent implements OnInit {
  parentnumber: number;
  private _data: [any];
  get data(): [any] {
    return this._data;
  }

  set data(value: [any]) {
    this._data = value;
  }
  constructor(private service: ParentService, private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe(params => {
      console.log(params); // {order: "popular"}

      this.parentnumber = params.idp;
      console.log(this.parentnumber); // popular
    }); }

  ngOnInit() {

   this.resetForm();
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


      const user = {
        id: this.parentnumber,
        nom: this.service.formData1.nom,
        prenom: this.service.formData1.prenom,
        numTel: this.service.formData1.numTel,
        role: 'Parent',
        cin: this.service.formData1.cin,
        email: this.service.formData1.email,
        password: this.service.formData1.password
      };


      // console.log(author,"author")
      this.service.updateparent(user, this.parentnumber)
        .subscribe(resp => {
            console.log(resp, 'res');
            alert('Parent a été modifié avec succès');
            this.router.navigate(['KidsPay/AceuilAdmin/parents']);
          },
          error => {
            console.log(error, 'error');
          });

    } catch (e) {
      console.log(e);
    }

    }}

}
