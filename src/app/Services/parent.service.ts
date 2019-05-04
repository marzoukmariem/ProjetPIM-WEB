import { Injectable } from '@angular/core';
import {Parent} from '../Models/parent.model';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {User} from '../Models/user.model';
import {Carte} from '../Models/carte';

@Injectable({
  providedIn: 'root'
})
export class ParentService {
  formData: Parent;
  formData1: Parent;
  formData3: Parent;
  formData4: User;
  formData5: Carte;
  formData6: Parent;
  usernv: { password: string; role: string; balance: null; cin: string; photo: string; id: null; nom: string; prenom: string; numTel: string; email: string };
  parent1: Parent ;
  idenfant: number;
  Data: [any];
  list: Parent[] = [];
  list1: Parent[];
  readonly rootURL = 'http://79.137.75.40:8000/kidspay/';
  constructor(private http: HttpClient) {
    this.list1 = [];

    // @ts-ignore
    this.formData1 = {
      id: null,
      nom: '',
      prenom: '',
      numTel: '',
      role: 'parent',
      cin: '',
      email: '',
      password: '',
    };
    // @ts-ignore
    this.formData6 = {
      id: null,
      nom: '',
      prenom: '',
      numTel: '',
      role: 'parent',
      cin: '',
      email: '',
      password: '',
    };
    // @ts-ignore
    this.formData3 = {
      id: null,
      nom: '',
      prenom: '',
      numTel: '',
      role: 'parent',
      cin: '',
      email: '',
      password: '',
      Montant: null,
    };
    // @ts-ignore
    this.formData4 = {
      id: null,
      nom: '',
      prenom: '',
      numTel: '',
      role: 'parent',
      cin: '',
      email: '',
      password: '',
      photo: '',
      balance: null
    };


    // @ts-ignore
    this.usernv = {
      id: null,
      nom: '',
      prenom: '',
      numTel: '',
      role: 'parent',
      cin: '',
      email: '',
      password: '',
      photo: '',
      balance: null
    };
    this.formData5 = {
      id: null,
      code: '',
      montant:  null,
    };


        }

  postparent(Data) {


      return this.http.post(environment.apiURL + '/users/', Data);

  }



  getparent(id: number) {
    this.http.get(environment.apiURL +  '/users/' + id + '/').subscribe(resp => {
      console.log(resp, 'le parent');
      // @ts-ignore
      console.log(resp.length, 'nb elment');
      // this.list1==resp;
      this.list = [];
      // @ts-ignore


        // @ts-ignore
      this.formData4 = {
          id: null,
          nom: '',
          prenom: '',
          numTel: '',
          role: 'parent',
          cin: '',
          email: '',
          password: '',
          photo: '',
         balance: null
        };
      // @ts-ignore
      this.formData4.id = resp.id;
      // @ts-ignore
      this.formData4.nom = resp.nom;
      // @ts-ignore
      localStorage.setItem('nomuser', resp.nom);
      // @ts-ignore
      this.formData4.prenom = resp.prenom;
      // @ts-ignore
      localStorage.setItem('prenomuser', resp.prenom);
      // @ts-ignore
      this.formData4.numTel = resp.numTel;
      // @ts-ignore
      localStorage.setItem('numuser', resp.numTel);
      // @ts-ignore
      this.formData4.role = resp.role;
      // @ts-ignore
      this.formData4.cin = resp.cin;
      // @ts-ignore
      this.formData4.email = resp.email;
      // @ts-ignore
      localStorage.setItem('emailuser', resp.email);
      // @ts-ignore
      this.formData4.password = resp.password;
      // @ts-ignore
      this.formData4.photo = resp. photo;
      // @ts-ignore
      localStorage.setItem('photouser', resp. photo);
      // @ts-ignore
      this.formData4.balance = resp.balance;
      // @ts-ignore
      localStorage.setItem('balanceuser', resp.balance);

      console.log(this.formData4, 'le parent');
 });

  }
  refreshlist() {



     this.http.get(environment.apiURL + '/getallparent/').subscribe(resp => {
     console.log(resp, 'nb elment');
       // @ts-ignore
     console.log(resp.length, 'nb elment');
     // this.list1==resp;
     this.list = [];
       // @ts-ignore
     for (let i = 0; i < Number(resp.length); i++) {

        // @ts-ignore
        this.parent1 = {
          id: null,
          nom: '',
          prenom: '',
          numTel: '',
          role: 'parent',
          cin: '',
          email: '',
          password: '',
        };
        this.parent1.id = resp[i].pk;
        this.parent1.nom = resp[i].fields.nom;
        this.parent1.prenom = resp[i].fields.prenom;
        this.parent1.numTel = resp[i].fields.numTel;
        this.parent1.role = resp[i].fields.role;
        this.parent1.cin = resp[i].fields.cin;
        this.parent1.email = resp[i].fields.email;
        this.parent1.password = resp[i].fields.password;
        this.list.push(this.parent1);
      }




     console.log(this.list, 'list');

    });


  }

 // getenfantbyidparent(id: number) {this.http.get(this.rootURL + 'getefantbyidparent/?idparent=' + id ).subscribe(resp => {console.log() }); }
  deleteparent(id: number) {
    return this.http.delete(environment.apiURL + '/users/' + id + '/').toPromise();
  }
remplirform(id: number) {

    this.http.get(environment.apiURL + '/users/' + id + '/').subscribe(resp => {
      // @ts-ignore
      console.log(resp.nom, 'nom');


      // @ts-ignore
      this.formData1.nom = resp.nom;
      // @ts-ignore
      this.formData1.prenom = resp.prenom;
      // @ts-ignore
      this.formData1.email = resp.email;
      // @ts-ignore
      this.formData1.cin = resp.cin;
      // @ts-ignore
      this.formData1.password = resp.password;
      // @ts-ignore
      this.formData1.numTel = resp.numTel;



      console.log(this.formData1, 'formservice');

    });

  }
  remplirform1(id: number) {

    this.http.get(environment.apiURL + '/users/' + id + '/').subscribe(resp => {
      // @ts-ignore
      console.log(resp.nom, 'nom');


      // @ts-ignore
      this.formData6.nom = resp.nom;
      // @ts-ignore
      this.formData6.prenom = resp.prenom;
      // @ts-ignore
      this.formData6.email = resp.email;
      // @ts-ignore
      this.formData6.cin = resp.cin;
      // @ts-ignore
      this.formData6.password = resp.password;
      // @ts-ignore
      this.formData6.numTel = resp.numTel;



      console.log(this.formData6, 'formservice');

    });

  }
updateparent(Data, id: number) {
    return this.http.put(environment.apiURL + '/users/' + id + '/', Data);
  }
  updateparent2(idp: number, ide: number, Montant: number, password: String) {
  this.http.get(environment.apiURL + '/Alimentation/?idp=' + idp + '&ide=' + ide + '&montant=' + Montant + '&p=' + password + '').subscribe(response => {
  console.log(response.toString());
  // @ts-ignore
  if (response.toString() === '1') {alert(' Trasmssion a été éffectuer avec succées');


} else {alert('Solde insuffisant ou Mot de passe incorrecte'); }


});
  }

informationscarte(code: string) {

this.formData5 = {
  id: null,
  code: '',
  montant:  null,
};

this.http.get(environment.apiURL + '/getdetailcarte/?code=' + code ).subscribe(resp => {
  console.log(resp, 'detailcarte');
    // @ts-ignore
  console.log(resp.nom, 'nom');


    // @ts-ignore
  this.formData5.id = resp[0].pk ;
    // @ts-ignore
  this.formData5.code = resp[0].fields.code;
    // @ts-ignore
  this.formData5.montant = resp[0].fields.montant;

  console.log(this.formData5, 'detailcarte');
  this.http.get(environment.apiURL + '/updatesoldeuser/?idp=' + Number(localStorage.getItem('idparent')) + '&montant=' + this.formData5.montant).subscribe(response => {
    console.log(response.toString());

    this.http.get(environment.apiURL + '/users/' + Number(localStorage.getItem('idparent')) + '/').subscribe(resp1 => {

      this.usernv = {
        id: null,
        nom: '',
        prenom: '',
        numTel: '',
        role: 'parent',
        cin: '',
        email: '',
        password: '',
        photo: '',
        balance: null
      };
      // @ts-ignore
      this.usernv.balance = resp1.balance;
      console.log('balance user', this.usernv.balance);
      localStorage.setItem('balance', this.usernv.balance);
     // const nvsolde = Number(localStorage.getItem('balance') ) + this.formData5.montant;
    // @ts-ignore
      this.http.delete(environment.apiURL + '/cartes/' + this.formData5.id + '/').toPromise();
      if (response.toString() === '1') {alert(' Alimentation a été éffectuer avec succées votre nouveau solde est ' + this.usernv.balance);
    } });
  });
  });



}


}
