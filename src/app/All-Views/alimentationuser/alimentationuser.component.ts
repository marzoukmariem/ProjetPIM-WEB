import { Component, OnInit } from '@angular/core';
import {environment} from '../../../environments/environment';
import {ParentService} from '../../Services/parent.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-alimentationuser',
  templateUrl: './alimentationuser.component.html',
  styleUrls: ['./alimentationuser.component.css']
})
export class AlimentationuserComponent implements OnInit {
  URLphoto = '';
  photouser = '';
  prenomuser = '';
  nomuser = '';
  parentnumber: number;
  _code_: number;
  _codeNum_: number;
  constructor(private service: ParentService, private route: ActivatedRoute, private router: Router, private http: HttpClient) {


    this.URLphoto = environment.apiURL1;

    this.photouser = localStorage.getItem('photouser');
    console.log(this.photouser);
    this.nomuser = localStorage.getItem('nom');

    this.prenomuser = localStorage.getItem('prenom');

    this.parentnumber = Number(localStorage.getItem('idparent'));
    console.log('idfrom update', this.parentnumber);


  }

  ngOnInit() {
    if (localStorage.getItem('session') === 'false') {

      this.router.navigate(['KidsPay/Erreur']);


    }


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

  alimenter(form: NgForm) {
    this.hasNoDigitFind(this.service.formData5.code);
    console.log(this._codeNum_, 'oui');
    if (String(this.service.formData5.code).length === 0 || this._codeNum_ === 1) { alert('Veuillez remplir un code correcte ' ); } else {
    this.http.get(environment.apiURL + '/getdetailcarte/?code=' + this.service.formData5.code).subscribe(response => {
      console.log(response.toString());
      // @ts-ignore
      if (response.length !== 0) {
        this.service.informationscarte(this.service.formData5.code);
      } else {
        alert('Code érroné ' );
      }
    });

  }}
}
