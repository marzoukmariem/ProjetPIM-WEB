import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Parent} from '../Models/parent.model';
import {Enfant} from '../Models/enfant.model';
import {Historique} from '../Models/historique.model';
import {Store} from '../Models/store.model';
@Injectable({
  providedIn: 'root'
})
export class EnfantService {
  formData: Enfant;
  enfant: Enfant;
  list: Enfant[] = [];
  listhist1: Historique[] = [];
  listhist2: Historique[] = [];
   listhist3: Store[] = [];
  historique: Historique;
  store: Store;
  Data: [any];
  somme: number;

  readonly rootURL = 'http://localhost:8000/kidspay/';
  constructor(private http: HttpClient) {
    // @ts-ignore
    this.historique = {

      nommagasin: '',
      dateachat: null,
      prixcommande: null,
      adresse: '',


    };
    // @ts-ignore
    this.enfant = {
      id: null,
      nom : '',
      prenom : '',
      solde : null,
      idtag: '',
      etatCompte: '',
      parent: null,



    };
    // @ts-ignore
    this.store = {
      StoreID: null,
      nom: '',
      adresse: '',
      Commercant: null,



    };


  }
  postenfant(Data) {


    return this.http.post(this.rootURL + 'enfants/', Data);

  }
  getallenfantbyid(id: number) {
    this.http.get(this.rootURL + 'getefantbyidparent/?idparent=' + id).subscribe(resp => {
      console.log(resp, 'nb elment');


      this.list = [];
      for (let i = 0; i < Number(resp.length); i++) {

        // @ts-ignore
        this.enfant = {
          id: null,
          nom : '',
          prenom : '',
          solde : null,
          idtag: '',
          etatCompte: '',
          parent: null,
        };
        this.enfant.id = resp[i].pk;
        this.enfant.nom = resp[i].fields.nom;
        this.enfant.prenom = resp[i].fields.prenom;
        this.enfant.solde = resp[i].fields.solde;
        this.enfant.idtag = resp[i].fields.idtag;
        this.enfant.etatCompte = resp[i].fields.etatCompte;


        this.list.push(this.enfant);
      }




      console.log(this.list, 'list');

    });


  }

  getsommebyid(id: number) {
    this.http.get(this.rootURL + 'somme/?idenfant=' + id).subscribe(resp => {
      console.log(resp.Sum_dep.Sum_dep);
      this.somme = resp.Sum_dep.Sum_dep;
    });

    }
  activercompteenfant(id: number) {
    this.http.get(this.rootURL + 'ActiverCompteEnfant/?idEnfant=' + id).subscribe(resp => { console.log('hello from service activer'); });
  }
  Desactivercompteenfant(id: number) {
    this.http.get(this.rootURL + 'DesactiverCompteEnfant/?idEnfant=' + id).subscribe(resp => {console.log('hello from service desactiver'); });
  }
gethistoriquebyenfant(id: number) {

  this.http.get(this.rootURL + 'getcommandebyenfant/?idenfant=' + id).subscribe(resp => {



    this.listhist2 = [];
    this.listhist3 = [];
    for (let i = 0; i < Number(resp.length); i++) {


      this.historique = {
        store:null,
        nommagasin: '',
        dateachat: null,
        prixcommande: null,
        adresse: '',
        enfant:null


      };
      const idstore = resp[i].fields.Store;
      console.log('idstore :' + resp[i].fields.Store);


      this.http.get(this.rootURL + 'getstorebyid/?idstore=' + idstore).subscribe(rep => {

        this.store = {
          StoreID: null,
          nom: '',
          adresse: '',
          Commercant: null,

        };

        this.store.adresse = rep[0].fields.adresse;
        this.store.nom = rep[0].fields.nom;
        console.log('store ' + i + ':' + this.store.adresse);
        this.listhist3.push(this.store);
        console.log(this.store.adresse, 'this.store.nom');
        this.historique.nommagasin = this.store.nom  ;
        console.log(this.historique.nommagasin, 'this.historique.nommagasin');
        this.historique.adresse = this.store.adresse;

        }
      );




      this.historique.dateachat = resp[i].fields.dateCommande;

      this.historique.prixcommande = resp[i].fields.prixTotal;

     // console.log(this.listhist3[i].StoreID, 'listcomplete3333');

      this.listhist2.push(this.historique);

    }




    console.log(this.listhist2, 'listcomplete');
    console.log(this.listhist3, 'list3complete');
  });





}

}
