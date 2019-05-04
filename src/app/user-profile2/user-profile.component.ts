import { Component, OnInit } from '@angular/core';
import { User } from '../Models/user.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LoginComponent } from '../views/login/login/login.component';
import { StoreService } from '../Services/store.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfile2Component implements OnInit {
  storenumber: number

  file: File = null;
  fileToUpload: File = null;
  imageUrl = '/assets/img/newProduct.png';
  _codeNom_: number;
  _codeCode_: any;
  _codePrix_: any;

  constructor(private service: StoreService, private route: ActivatedRoute, private router: Router, private http: HttpClient) {
    this.route.queryParams.subscribe(params => {
      console.log(params);

      this.storenumber = params.idm;
      console.log('idstore:' + this.storenumber);
    });
  }

  ngOnInit() {
    this.service.getProductsByStore(this.storenumber);
      // @ts-ignore
    
  }

  featuredPhotoSelected(event: any) {


    this.file = event.target.files[0];
    console.log('selected file name: =', this.file.name);

    this.fileToUpload = event.target.files.item(0);
    const reader = new FileReader();
    reader.onload = (event1: any) => {
      this.imageUrl = event1.target.result;
    };
    reader.readAsDataURL(this.fileToUpload);


  }

  onSubmit(form?: NgForm) {
    this.hasDigitNomFind(this.service.formData1.nom)
    this.hasNoDigitFind(this.service.formData1.code)
    this.hasNoDigitPrixFind(this.service.formData1.prix+"")

    if (this._codeNom_ == -1 || this._codeNom_ == 10 || this._codeCode_ == 1 || this._codeCode_ == 10 || this._codePrix_ == 1 || this._codePrix_ == 10 || this.service.formData1.categorie=="" ) {
      alert('veuillez valider tous les champs')
    } else {

    {
      try {
        const formData = new FormData();
        formData.append('file', this.file);
        this.http.post(environment.apiURL2+'/up.php', formData)
          .subscribe((data) => {
            console.log('Got some data from backend ', data);
            // @ts-ignore
            console.log('Got some data from backend ', data.url);
            const produit = {

              nom: this.service.formData1.nom,
              categorie: this.service.formData1.categorie,
              code: this.service.formData1.code,
              Store: this.storenumber,
              prix: this.service.formData1.prix,
              // @ts-ignore
              photo: data.url
            };


            // console.log(author,"author")
            this.service.ajoutProduit(produit)
              .subscribe(resp => {
                console.log(resp, 'res');
                alert('produit ajouté avec succès');

                // @ts-ignore
                this.service.formData1 = {
                  id: null,
                  nom: '',
                  categorie: '',
                  code: '',
                  Store: null
                };
                this.imageUrl = '/assets/img/newProduct.png';

                this.service.getProductsByStore(this.storenumber);
                this.service.refresh();
                //  this.router.navigate(['KidsPay/AceuilAdmin/parents']);
              },
                error => {
                  console.log(error, 'error');
                  alert('veuillez choisir une photo');
                });



          }, (error) => {
            console.log('Error! ', error);
            alert('veuillez choisir une photo');
          });


      } catch (e) {
        console.log(e);
        alert('veuillez choisir une photo');
      }
    }


  }
  }

  onOrderDelete(id: number) {
    if (confirm('Are you sure to delete this ?')) {
      this.service.deleteProduct(id).then(res => {
        this.service.refresh();
        this.service.getProductsByStore(this.storenumber);
      });
    }
  }

  openForEdit(id: number) {
    this.router.navigate(['/KidsPay/Aceuilcommercant/Historique/dashboard2Edit/' + id], { queryParams: { idm: this.storenumber } })
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

  hasNoDigitFind(_str_) {
    this._codeCode_ = 10;  /*When empty string found*/
    var _strArray = [];
  
    if (_str_ !== '' || _str_ !== undefined || _str_ !== null) {
      _strArray = _str_.split('');
      for (var i = 0; i < _strArray.length; i++) {
        if (!isNaN(parseInt(_strArray[i]))) {
          this._codeCode_ = -1;
        } else {
          this._codeCode_ = 1;
        }
      }
  
    }
    return this._codeCode_;
  }

  hasNoDigitPrixFind(_str_) {
    this._codePrix_ = 10;  /*When empty string found*/
    var _strArray = [];
  
    if (_str_ !== '' || _str_ !== undefined || _str_ !== null) {
      _strArray = _str_.split('');
      for (var i = 0; i < _strArray.length; i++) {
        if (!isNaN(parseInt(_strArray[i]))) {
          this._codePrix_ = -1;
          break;
        } else {
          this._codePrix_ = 1;
        }
      }
  
    }
    return this._codePrix_;
  }
}
