import { Component, OnInit } from '@angular/core';
import { CommercantService } from 'src/app/Services/commercant.service';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ComponentsModule } from 'src/app/components/components.module';
declare var $: any;

@Component({
  selector: 'app-commercant',
  templateUrl: './commercant.component.html',
  styleUrls: ['./commercant.component.css']
})
export class CommercantComponent implements OnInit {
  _code_: number;
  _codeNum_: number;
  _codeNom_: number;
  _codeCin_: number;
  constructor(private service: CommercantService,
              private router: Router,
              private currentRoute: ActivatedRoute) { }
  NomIsValid;
  ngOnInit() {
    if ( localStorage.getItem('session') === 'false') {

      this.router.navigate(['KidsPay/Erreur']);
    
    
    }
    const commercantId = this.currentRoute.snapshot.paramMap.get('id');
    if (commercantId == null) {
      this.resetForm();
    } else {
      this.service.getCommercantById(parseInt(commercantId)).then(res => {
        this.service.formData = res;
      });
    }
  }

  resetForm(form?: NgForm) {
    if (form = null) {
      form.resetForm();
    }
    // @ts-ignore
    this.service.formData = {
      id: null,
      nom: '',
      prenom: '',
      numTel: '',
      role: 'Commercant',
      cin: '',
      email: '',
      password: '',
    };
  }

  onSubmit(form: NgForm) {
    let emailExiste = 0;
    let cinExiste = 0;
    this.service.getCommercantList().then(res => {
     console.log(res, 'hereeeeeeeeeeeeeeeeeeeeeeeeeee');
     // @ts-ignore
     for (let i = 0; i < Number(res.length); i++) {
        console.log(res, res[i].email);
        // @ts-ignore
        if (res[i].email == this.service.formData.email) {
          emailExiste = 1;

        }
        // @ts-ignore
        if (res[i].cin == this.service.formData.cin) {
          cinExiste = 1;
        }
     }

     this.hasDigitNomFind(this.service.formData.nom);
     this.hasDigitFind(this.service.formData.prenom);
     this.hasNoDigitFind(this.service.formData.numTel);
     this.hasNoDigitCinFind(this.service.formData.cin);
     console.log(this._code_, '_code_ prenom');
     console.log(this._codeNom_, '_codeNom_ nom');
     console.log(this._codeNum_, 'codeNum');
     console.log(this._codeCin_, 'codeCin');
     if (this._code_ == -1 || this._code_ == 10 || this._codeNom_ == -1 || this._codeNom_ == 10 || !this.isEmail(this.service.formData.email ) || this._codeNum_ == 1 || this._codeNum_ == 10 || this._codeCin_ == 1 || this._codeCin_ == 10 || this.service.formData.numTel.length < 8 ||  this.service.formData.cin.length != 8 || String(this.service.formData.password).length == 0 ) {
      alert('veuillez valider tous les champs');
    } else if (emailExiste == 1) {
      alert('ce commercant possede deja un compte, email redandant');
    } else if (cinExiste == 1) {
      alert('ce commercant possede deja un compte, cin redandante');
    } else {
      $('#spinner2').show();
      this.service.saveOrUpdateCommercant().subscribe(res => {
        this.resetForm();
        alert('Submittedsuccessfully');
        this.router.navigate(['KidsPay/AceuilAdmin/commercants']);
      });

    }

  });

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


