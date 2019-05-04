import { Component, OnInit } from '@angular/core';
import {EnfantService} from '../../Services/enfant.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ParentService} from '../../Services/parent.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-gestionadmin',
  templateUrl: './gestionadmin.component.html',
  styleUrls: ['./gestionadmin.component.css']
})
export class GestionadminComponent implements OnInit {
  parentnumber: number;
  private _data: [any];
  get data(): [any] {
    return this._data;
  }

  set data(value: [any]) {
    this._data = value;
  }
  constructor(private service: ParentService, private route: ActivatedRoute, private router: Router) {

    this.parentnumber = Number(localStorage.getItem('idparent')) ;
  }




  ngOnInit() {
    if (localStorage.getItem('session') === 'false') {

      this.router.navigate(['KidsPay/Erreur']);


    }


    this.resetForm();
  }



    resetForm(form?: NgForm) {
      // @ts-ignore
      this.service.formData6 = {
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
        this.service.remplirform1(this.parentnumber);
      }
      console.log(this.service.formData6, 'formserviceedit');

    }

    onSubmit(form?: NgForm) {
      {try {


        const user = {
          id: this.parentnumber,
          nom: this.service.formData6.nom,
          prenom: this.service.formData6.prenom,
          numTel: this.service.formData6.numTel,
          role: 'admin',
          cin: this.service.formData6.cin,
          email: this.service.formData6.email,
          password: this.service.formData6.password
        };


        // console.log(author,"author")
        this.service.updateparent(user, this.parentnumber)
          .subscribe(resp => {
              console.log(resp, 'res');
              alert('Admin a été modifié avec succès');

            },
            error => {
              console.log(error, 'error');
            });

      } catch (e) {
        console.log(e);
      }

      }}









  }


