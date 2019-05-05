import { Component, OnInit } from '@angular/core';
import {ParentService} from '../../Services/parent.service';
import {EnfantService} from '../../Services/enfant.service';
import {NgForm} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-enfant',
  templateUrl: './enfant.component.html',
  styleUrls: ['./enfant.component.css']
})
export class EnfantComponent implements OnInit {
parentnumber: number;
  _code_: number;
  _codeNum_: number;
  _codeNom_: number;
  constructor(private service: EnfantService, private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe(params => {
      console.log(params); // {order: "popular"}

      this.parentnumber = params.idp;
      console.log(this.parentnumber); // popular
    });
  }

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
      solde: null,
      idtag: '',
      etatCompte: '',
      parent: null,
    };

  }

  onSubmit(form?: NgForm) {
    { this.hasDigitNomFind(this.service.formData.nom);
      this.hasDigitNomFind(this.service.formData.prenom);
      this.hasDigitNomFind(this.service.formData.idtag);

      if ( this._codeNom_ === 11) { alert('Veuillez remplir le formulaire'); } else {
      try {


        const user = {
          nom: this.service.formData.nom,
          prenom: this.service.formData.prenom,
          solde: 0,
          idtag: this.service.formData.idtag,
          etatCompte: '1',
          parent: this.parentnumber,
          code: '1234',
          photo: 'hello'
        };


        // console.log(author,"author")
        this.service.postenfant(user)
          .subscribe(resp => {
              console.log(resp, 'res');
              alert('enfant a été ajouté avec succès');
              this.router.navigate(['KidsPay/AceuilAdmin/parents']);

            },
            error => {
              console.log(error, 'error');
            });

      } catch (e) {
        console.log(e);
      }

    }

  }}

  hasDigitNomFind(_str_) {
    this._codeNom_ = 10;  /*When empty string found*/


    if (_str_ == '' || _str_ == undefined || _str_ == null) {

      this._codeNom_ = 11;
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



}
