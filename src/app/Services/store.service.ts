import { Injectable } from '@angular/core';
import { Store } from '../Models/store.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Historique } from '../Models/historique.model';
import {Enfant} from '../Models/enfant.model';
import {Histo} from '../Models/histo';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  formData: Store;
  readonly rootURL = 'http://192.168.43.223:8000/kidspay/';
  list: Store[] = [];
  store: Store;
  store2: Store
  listhist2: Historique[] = [];
  historique: Historique;
  listhist3: Histo[] = [];
  balance: any;
  historique3: Histo;
  enfant: Enfant;
  // @ts-ignore
  balance: any;
  nbmagazins: number;
  nbtransaction: number;
  listeEnfant: Enfant[] = [];
  listeStore2: Store[] = [];
  enfant2: Enfant;
  listeLastTransactionsRecentes: Historique[] = []
  enfant3: Enfant;
  listeEnfant2: Enfant[] = [];


  constructor(private http: HttpClient) { }

  saveOrUpdateStore() {
    const body = {
      ...this.formData
    };
    return this.http.post(environment.apiURL + '/stores/', body);
 }

 getStoresList() {
  return this.http.get(environment.apiURL + '/stores/').toPromise();
}

getCommercantList() {
  return this.http.get(environment.apiURL + '/users/').toPromise();
}

getStoreByID(id: number): any {
  return this.http.get(environment.apiURL + '/stores/' + id).toPromise();
}

deleteStore(id: number) {
  return this.http.delete(environment.apiURL + '/stores/' + id).toPromise();
 }

 getallStoresbyid(id: number) {
  this.http.get(this.rootURL + 'getStoreByIdCommercant/?idCommercant=' + id).subscribe(resp => {
    console.log(resp, 'nb elment');
    // @ts-ignore
    console.log(resp.length, 'nb elment');
    // @ts-ignore
    this.list = [];
    // @ts-ignore
    for (let i = 0; i < Number(resp.length); i++) {

      // @ts-ignore
      this.store = {
        StoreID: null,
        nom : '',
        adresse : '',
        Commercant: null,
      };
      this.store.StoreID = resp[i].pk;
      this.store.nom = resp[i].fields.nom;
      this.store.adresse = resp[i].fields.adresse;
      this.store.Commercant = resp[i].fields.Commercant;
      this.list.push(this.store);
    }
    console.log(this.list, 'list');
  });

}

getSolde(id: number) {
  this.http.get(this.rootURL + 'userInfo/?iduser=' + id).subscribe(resp => {
// @ts-ignore
    console.log(resp.length, 'nb users:');
    this.balance = 0;
    // @ts-ignore
    for (let i = 0; i < Number(resp.length); i++) {

      // @ts-ignore
      this.balance = 0;
      this.balance = resp[i].fields.balance;

    }

  });
  console.log(this.balance, 'balance:');
}

getHistoriqueByStore(id: number) {

  this.http.get(this.rootURL + 'getcommandebystore/?idstore=' + id).subscribe(resp => {


    console.log(resp, 'nb elment');
    // @ts-ignore
    console.log(resp.length, 'nb elment');


    this.listhist2 = [];
    // @ts-ignore
    for (let i = 0; i < Number(resp.length); i++) {

      // @ts-ignore
      this.historique = {
        nommagasin: '',
        dateachat: null,
        prixcommande: null,
        adresse: '',
      };



      this.historique.dateachat = (resp[i].fields.dateCommande).substring(0, 10);
      this.historique.prixcommande = resp[i].fields.prixTotal;


      this.listhist2.push(this.historique);
    }




    console.log(this.listhist2, 'listcomplete');

  });





}
  getNumberOfTransactions(id: number) {
    this.nbtransaction = 0;
    this.http.get(this.rootURL + 'getStoreByIdCommercant/?idCommercant=' + id).subscribe(resp => {
      // @ts-ignore
      for (let i = 0; i < Number(resp.length); i++) {

        this.store = {
          StoreID: null,
          nom: '',
          adresse: '',
          Commercant: null,
        }
        // @ts-ignore
        this.store.StoreID = resp[i].pk;

        this.http.get(this.rootURL + 'getcommandebystore/?idstore=' + this.store.StoreID).subscribe(respp => {
          // @ts-ignore
          for (let ii = 0; ii < Number(resp.length); ii++)  {

            this.nbtransaction++;
          }
        });

      }

    });

  }

  getNumberOfStores(id: number) {
    this.http.get(this.rootURL + 'getStoreByIdCommercant/?idCommercant=' + id).subscribe(resp => {
      this.nbmagazins = 0;
      // @ts-ignore
      this.nbmagazins = resp.length;
    });

  }
  getLastTransactions(id: number) {
    this.listeEnfant2 = []
    this.listeStore2 = []
    this.listhist3 = []
    this.http.get(this.rootURL + 'commandes/').subscribe(resp2 => {

      this.http.get(this.rootURL + 'enfants/').subscribe(resp => {

        this.http.get(this.rootURL + 'stores/').subscribe(resp3 => {
          // @ts-ignore
          for (let i = 0; i < Number(resp.length); i++) {
            // @ts-ignore
            this.enfant = {
              id: null,
              nom: '',
              prenom: '',
            }

            this.enfant.id = resp[i].id;
            this.enfant.nom = resp[i].nom;
            this.enfant.prenom = resp[i].prenom;

            this.listeEnfant2.push(this.enfant);

          }
          console.log(this.listeEnfant2, 'listeEnfant2');


          // @ts-ignore
          for (let i = 0; i < Number(resp3.length); i++) {
            // @ts-ignore
            this.store2 = {
              StoreID: null,
              nom: ''
            }

            this.store2.StoreID = resp3[i].id;
            this.store2.nom = resp3[i].nom;
            this.store2.Commercant = resp3[i].Commercant;
            this.listeStore2.push(this.store2);

          }
          // console.log(this.listeStore2, "listeStore2");


          // @ts-ignore
          for (let i = 0; i < Number(resp2.length); i++) {
            // @ts-ignore
            this.historique3 = {
              enfant: null,
              store: null,
              prixcommande: 0,
              dateachat: null

            }

            this.historique3.dateachat = (resp2[i].dateCommande).substring(0, 10);
            this.historique3.prixcommande = (resp2[i].prixTotal);
            for (let j = 0; j < this.listeEnfant2.length; j++) {

              if (resp2[i].Enfant === this.listeEnfant2[j].id) {

                this.historique3.enfant = this.listeEnfant2[j];
              }
            }
            for (let j = 0; j < this.listeStore2.length; j++) {

              if (resp2[i].Store === this.listeStore2[j].StoreID) {

                this.historique3.store = this.listeStore2[j];
              }

              if(this.historique3.store!=null && this.historique3.store.Commercant==id){
                this.listhist3.push(this.historique3);
              }



            console.log(this.listhist3, "listhist3");

            }

            if(this.historique3.store !== null) {
              this.listhist3.push(this.historique3);
            }



            console.log(this.listhist3, 'listhist3');

          }

        });
      });
    });

  }
}
