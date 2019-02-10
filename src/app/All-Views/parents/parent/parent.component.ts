import { Component, OnInit } from '@angular/core';
import {ParentService} from "../../../Services/parent.service";
import {NgForm} from "@angular/forms";
import {printLine} from "tslint/lib/verify/lines";


@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent implements OnInit {
  private _data:[any]
  get data(): [any] {
    return this._data;
  }

  set data(value: [any]) {
    this._data = value;
  }

  constructor(private service:ParentService) { }
  ngOnInit() {
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
     email:'',
      numTel:'',
      password:'',
      role:''
    }
  }

  onSubmit(form?: NgForm ) {
    {try {


        let user = {
          nom:this.service.formData.nom,
          prenom:this.service.formData.prenom,
          numTel: this.service.formData.numTel,
          role: "parent",
          cin:this.service.formData.cin,
          email: this.service.formData.email,
          password:this.service.formData.password
        }


        // console.log(author,"author")
        this.service.postparent(user)
          .subscribe(resp => {
              console.log(resp, "res");
              alert('Parent a été ajouté avec succès')
              this.service.refreshlist();

            },
            error => {
              console.log(error, "error");
            })

      } catch (e) {
        console.log(e);
      }

  }


}}
