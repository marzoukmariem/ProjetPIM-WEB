import { Component, OnInit } from '@angular/core';
import {ParentService} from '../../../Services/parent.service';
import {NgForm} from '@angular/forms';
import {EnfantService} from '../../../Services/enfant.service';
import {ActivatedRoute, Router} from '@angular/router';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';

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
  _code_: number;
  _codeNum_: number;
  _codeNom_: number;
  _codeCin_: number;
  constructor(private service: ParentService, private route: ActivatedRoute, private router: Router, private http: HttpClient) {
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

      this.hasDigitNomFind(this.service.formData1.nom);
      this.hasDigitFind(this.service.formData1.prenom);
      this.hasNoDigitFind(this.service.formData1.numTel);
      this.hasNoDigitCinFind(this.service.formData1.cin);
      console.log(this._code_, '_code_ prenom');
      console.log(this._codeNom_, '_codeNom_ nom');
      console.log(this._codeNum_, 'codeNum');
      console.log(this._codeCin_, 'codeCin');
      if ( String(this.service.formData1.password).length === 0 ||  String(this.service.formData1.email).length === 0 ||  String(this.service.formData1.nom).length === 0 ||  String(this.service.formData1.prenom).length === 0 || !this.isEmail(this.service.formData1.email) ||  String(this.service.formData1.cin).length === 0 ||  String(this.service.formData1.numTel).length === 0 ) {
        alert('veuillez valider tous les champs');
      } else {try {


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

      }



  }




hasDigitNomFind(_str_) {
  this._codeNom_ = 10;  /*When empty string found*/
  let _strArray = [];

  if (_str_ !== '' || _str_ !== undefined || _str_ !== null) {
    _strArray = _str_.split('');
    for (let i = 0; i < _strArray.length; i++) {
      if (!isNaN(parseInt(_strArray[i]))) {
        this._codeNom_ = -1;
        break;
      } else {
        this._codeNom_ = 1;
      }
    }

  }
  return this._codeNom_;
}

hasDigitFind(_str_) {
  this._code_ = 10;  /*When empty string found*/
  let _strArray = [];

  if (_str_ !== '' || _str_ !== undefined || _str_ !== null) {
    _strArray = _str_.split('');
    for (let i = 0; i < _strArray.length; i++) {
      if (!isNaN(parseInt(_strArray[i]))) {
        this._code_ = -1;
      } else {
        this._code_ = 1;
      }
    }

  }
  return this._code_;
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

hasNoDigitCinFind(_str_) {
  this._codeCin_ = 10;  /*When empty string found*/
  let _strArray = [];

  if (_str_ !== '' || _str_ !== undefined || _str_ !== null) {
    _strArray = _str_.split('');
    for (let i = 0; i < _strArray.length; i++) {
      if (!isNaN(parseInt(_strArray[i]))) {
        this._codeCin_ = -1;
        break;
      } else {
        this._codeCin_ = 1;
      }
    }

  }
  return this._codeCin_;
}


isEmail(search: string): boolean {
  let  serchfind: boolean;

  const regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);


  serchfind = regexp.test(search);

  console.log(serchfind);
  return serchfind;
}




}
