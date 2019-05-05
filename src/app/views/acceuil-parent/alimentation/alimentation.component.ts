import { Component, OnInit } from '@angular/core';
import {ParentService} from '../../../Services/parent.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-alimentation',
  templateUrl: './alimentation.component.html',
  styleUrls: ['./alimentation.component.css']
})
export class AlimentationComponent implements OnInit {
  parentnumber: number;
  enfantnumber: number;
  URLphoto = '' ;
  photouser = '';
  prenomuser = '';
  nomuser = '';
  _codeNum_: number;
  constructor(private service: ParentService, private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe(params => {
      console.log(params); // {order: "popular"}

      this.parentnumber = params.idp;
      this.enfantnumber = params.ide;
      console.log(this.parentnumber);
      console.log(this.enfantnumber);
      // popular
    });

    this.URLphoto = environment.apiURL1 ;
    this.photouser = localStorage.getItem('photouser');

    this.nomuser = localStorage.getItem('nom');
    this.prenomuser = localStorage.getItem('prenom');
  }

  ngOnInit() {

    if ( localStorage.getItem('session') === 'false') {

      this.router.navigate(['KidsPay/Erreur']);


    }



    this.resetForm();
  }
  resetForm(form?: NgForm) {
    if (form != null) {
      form.resetForm();
    }
    // @ts-ignore
    this.service.formData3 = {
      id: null,
      nom: '',
      prenom: '',
      cin: '',
      email: '',
      numTel: '',
      password: '',
      role: '',
      Montant: null,
    };

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

  onSubmit(form?: NgForm) {
    this.hasNoDigitFind(this.service.formData3.Montant);
    console.log(this._codeNum_, 'oui');
    if (String(this.service.formData3.Montant).length === 0 || String(this.service.formData3.password).length === 0 || this._codeNum_ === 1) { alert('Veuillez remplir les champs correctement correcte ' ); } else {

      this.service.updateparent2(this.parentnumber, this.enfantnumber, this.service.formData3.Montant, this.service.formData3.password);


    }
  }
}
