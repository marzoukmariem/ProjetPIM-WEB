import { Component, OnInit } from '@angular/core';
import {ParentService} from '../../../Services/parent.service';
import {NgForm} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-parentadd',
  templateUrl: './parentadd.component.html',
  styleUrls: ['./parentadd.component.css']
})
export class ParentaddComponent implements OnInit {

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
  constructor(private service: ParentService, private router: Router, private http: HttpClient) { }
  ngOnInit() {
    this.resetForm();
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

  onSubmit(form?: NgForm ) {

    let email = 0;
    const cinExiste = 0;
    this.http.get(environment.apiURL +  '/users/').subscribe(res => {
      console.log(res, 'hereeeeeeeeeeeeeeeeeeeeeeeeeee');
      // @ts-ignore
      for (let i = 0; i < Number(res.length); i++) {
        console.log(res, res[i].email);
        // @ts-ignore
        if (res[i].email === this.service.formData.email) {
          email = 1;

        }}

      console.log(email, 'email');
      this.hasDigitNomFind(this.service.formData.nom);
      this.hasDigitFind(this.service.formData.prenom);
      this.hasNoDigitFind(this.service.formData.numTel);
      this.hasNoDigitCinFind(this.service.formData.cin);
      console.log(this._code_, '_code_ prenom');
      console.log(this._codeNom_, '_codeNom_ nom');
      console.log(this._codeNum_, 'codeNum');
      console.log(this._codeCin_, 'codeCin');
      if (this._code_ === -1 || this._code_ === 10 || this._codeNom_ === -1 || this._codeNom_ === 10 || !this.isEmail(this.service.formData.email ) || this._codeNum_ === 1 || this._codeNum_ === 10 || this._codeCin_ === 1 || this._codeCin_ === 10 || this.service.formData.numTel.length < 8 ||  this.service.formData.cin.length != 8 || String(this.service.formData.password).length === 0 ) {
        alert('veuillez valider tous les champs');
      } else if (email === 1) {
        alert('ce commercant possede deja un compte, email redandant');
      } else  {try {


      const user = {
        nom: this.service.formData.nom,
        prenom: this.service.formData.prenom,
        numTel: this.service.formData.numTel,
        role: 'Parent',
        cin: this.service.formData.cin,
        email: this.service.formData.email,
        password: this.service.formData.password
      };


      // console.log(author,"author")
      this.service.postparent(user)
        .subscribe(resp => {
            console.log(resp, 'res');
            alert('Parent a été ajouté avec succès');
            this.router.navigate(['KidsPay/AceuilAdmin/parents']);

          },
          error => {
            console.log(error, 'error');
          });

    } catch (e) {
      console.log(e);
    }

    } });



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
