import { Component, OnInit } from '@angular/core';
import { User } from '../Models/user.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LoginComponent } from '../views/login/login/login.component';
import { NgForm } from '@angular/forms';
import { CommercantService } from '../Services/commercant.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profileEdit.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileEditComponent implements OnInit {
  user1: User
  balance:number=0
  readonly rootURL = environment.apiURL+"/"
  _codeCin_: any;
  _codeNum_: any;
  _code_: any;
  _codeNom_: any;
  userEmail: any;
  constructor(private http: HttpClient,
    private service: CommercantService,
    private router: Router,) { 
  }

  ngOnInit() {
    if ( localStorage.getItem('session') === 'false') {

      this.router.navigate(['KidsPay/Erreur']);
    
    
    }
     // @ts-ignore
    this.user1 = {
      id:null,
      nom: '',
      prenom:'',
      email:'',
      numTel:'null',
      password :'',
      role:'',
    }
    
    this.http.get(this.rootURL + 'userInfo/?iduser='+localStorage.getItem("token")).subscribe(resp2 => {
      console.log(localStorage.getItem("token"), "token dans profile");
      this.user1.id = resp2[0]["pk"];
      this.user1.nom = resp2[0]["fields"]["nom"];
      this.user1.prenom = resp2[0]["fields"]["prenom"];
      this.user1.email = resp2[0]["fields"]["email"];
      this.user1.numTel = resp2[0]["fields"]["numTel"];
      this.user1.password = resp2[0]["fields"]["password"];
      this.user1.role = resp2[0]["fields"]["role"];
      this.user1.cin = resp2[0]["fields"]["cin"];
      this.balance= resp2[0]["fields"]["balance"];
      console.log( this.user1.nom,'nom')
      this.userEmail=resp2[0]["fields"]["email"];

    })
    }

    onSubmit(form:NgForm){
      var emailExiste=0
      var cinExiste=0
      this.service.getCommercantList().then(res => { 
       console.log(res,'hereeeeeeeeeeeeeeeeeeeeeeeeeee')
        for (var i = 0; i < Number(res['length']); i++) {
          console.log(res,res[i]["email"])
          if(res[i]["email"]==this.user1.email && this.userEmail!=this.user1.email){
            emailExiste=1
            
          }
          
       } 
// @ts-ignore
      this.service.formData=this.user1
      this.hasDigitNomFind(this.service.formData.nom)
      this.hasDigitFind(this.service.formData.prenom)
      this.hasNoDigitFind(this.service.formData.numTel)
      this.hasNoDigitCinFind(this.service.formData.cin)
      console.log(this._code_,'_code_ prenom')
      console.log(this._codeNom_,'_codeNom_ nom')
      console.log(this._codeNum_,'codeNum')
      console.log(this._codeCin_,'codeCin')
      if (this._code_ == -1 || this._code_ == 10 || this._codeNom_ == -1 || this._codeNom_ == 10|| !this.isEmail(this.service.formData.email ) || this._codeNum_ == 1 || this._codeNum_ == 10|| this._codeCin_ == 1 || this._codeCin_ == 10 || this.service.formData.numTel.length<8 ||  this.service.formData.cin.length!=8 || String(this.service.formData.password).length==0 ) {
        alert('veuillez valider tous les champs')
      } else if(emailExiste==1){
        alert('ce commercant possede deja un compte, email redandant')
      }else{
      
      
      this.service.UpdateCommercantProfile().subscribe(res =>{
        
        alert('Updated Successfully')
        this.router.navigate(['KidsPay/AceuilComerçant/user-profile'])
      })

    }

  })
    }

    

    


    hasDigitNomFind(_str_) {
      this._codeNom_ = 10;  /*When empty string found*/
      var _strArray = [];
    
      if (_str_ !== '' || _str_ !== undefined || _str_ !== null) {
        _strArray = _str_.split('');
        for (var i = 0; i < _strArray.length; i++) {
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
      var _strArray = [];
    
      if (_str_ !== '' || _str_ !== undefined || _str_ !== null) {
        _strArray = _str_.split('');
        for (var i = 0; i < _strArray.length; i++) {
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
      var _strArray = [];
    
      if (_str_ !== '' || _str_ !== undefined || _str_ !== null) {
        _strArray = _str_.split('');
        for (var i = 0; i < _strArray.length; i++) {
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
      var _strArray = [];
    
      if (_str_ !== '' || _str_ !== undefined || _str_ !== null) {
        _strArray = _str_.split('');
        for (var i = 0; i < _strArray.length; i++) {
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
    
    
    isEmail(search:string):boolean
    {
        var  serchfind:boolean;
    
        var regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    
    
        serchfind = regexp.test(search);
    
        console.log(serchfind)
        return serchfind
    }

}
