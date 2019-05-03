import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpEvent, HttpEventType} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, finalize, map} from 'rxjs/operators';
import {Parent} from '../Models/parent.model';
import {Enfant} from '../Models/enfant.model';
import {Historique} from '../Models/historique.model';
import {Store} from '../Models/store.model';
import {environment} from '../../environments/environment';
import * as firebase from 'firebase';
import {AngularFireDatabase, FirebaseObjectObservable} from '@angular/fire/database-deprecated';
import {from} from 'rxjs';
import {resolve} from 'url';
import {forEach} from '@angular/router/src/utils/collection';
import {AngularFireStorage} from '@angular/fire/storage';
import {DeetilCommande} from '../Models/deetil-commande';



@Injectable({
  providedIn: 'root'
})
export class EnfantService {
  downloadURL: Observable < string > ;
  imageUrl = '/assets/img/enfant3.jpg';
  img: object = [];
  formData3: Enfant;
  formData4: Enfant;
  janvier = 0;
  février = 0;
  Mars = 0;
  avril = 0;
  mai = 0;
  juin = 0;
  juillet = 0;
  aout = 0;
  septembre = 0;
  octobre = 0;
  novembre = 0;
  decembre = 0;


  constructor(private http: HttpClient, private storage: AngularFireStorage) {


    // @ts-ignore
    this.lignecommande = {
      id: null,
      nomproduit : '',
      photoproduit : '',
      quantiteproduit : null,
      nomstore : '',
      photostore : '',
      logitude : null,
      latitude : null,
      prixproduit : null,
      prixtotale : null,
      idproduit: null,
      idstore: null,
    };










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
    // @ts-ignore
    this.store1 = {
      StoreID: null,
      nom: '',
      adresse: '',
      Commercant: null,



    };
    // @ts-ignore
    this.formData3 = {
      id: null,
      nom: '',
      prenom: '',
      solde: null,
      idtag: null,
      etatCompte: '',
      code: '',
      photo: '',
      parent: null,
    };
    // @ts-ignore
    this.formData4 = {
      id: null,
      nom: '',
      prenom: '',
      solde: null,
      idtag: null,
      etatCompte: '',
      code: '',
      photo: '',
      parent: null,
    };
  }
  formData: Enfant;

  enfant: Enfant;
  list: Enfant[] = [];
  listsen: Enfant[] = [];
  listhist1: Historique[] = [];
  listsum: Historique[] = [];
  listhist2: Historique[] = [];
   listhist3: Store[] = [];
  listlignecommande: DeetilCommande[] = [];
  listlignecommande1: DeetilCommande[] = [];
  listlignecommande2: DeetilCommande[] = [];
  listlignecommande3: DeetilCommande[] = [];
  lisstores: Store[] = [];
  historique: Historique;
  historiquesum: Historique;
  historiquesum1: Historique;
  store: Store;
  store1: Store;
  Data: [any];
  Data1: [any];
  listhist4: Enfant[] = [];
  somme: number;
  idenf: number;
  lignecommande: DeetilCommande;
  lignecommande1: DeetilCommande;
  lignecommande2: DeetilCommande;
  lignecommande3: DeetilCommande;
  lignecommande4: DeetilCommande;
  lignecommande5: DeetilCommande;
  detailsore: DeetilCommande;
  readonly rootURL = 'http://192.168.43.223:8000/kidspay/';
  private z1: string;

  apiUrl = 'http://localhost/kidspay/up.php';

  upload(formData) {

    return this.http.post<any>(`${environment.apiURL + '/up.php'}`, formData, {
      reportProgress: true,
      observe: 'events'
    }).pipe(
      map(event =>  this.getEventMessage(event, formData)),
      catchError(this.handleError)
  );
  }

  private getEventMessage(event: HttpEvent<any>, formData) {

    switch (event.type) {

      case HttpEventType.UploadProgress:
        return this.fileUploadProgress(event);

      case HttpEventType.Response:
        return this.apiResponse(event);

      default:
        return `File "${formData.get('profile').name}" surprising upload event: ${event.type}.`;
    }
  }

  private fileUploadProgress(event) {
    const percentDone = Math.round(100 * event.loaded / event.total);
    return { status: 'progress', message: percentDone };
  }

  private apiResponse(event) {
    return event.body;
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened. Please try again later.');
  }


  postenfant(Data) {


    return this.http.post(environment.apiURL + '/enfants/', Data);

  }
  remplirlistsum(id: number) {
    this.listsum = [];
    this.http.get(environment.apiURL + '/getefantbyidparent/?idparent=' + id).subscribe(resp => {
      console.log(environment.apiURL + '/getefantbyidparent/?idparent=' + id, 'urlfromservice');
      console.log(resp, 'respfromservice');

      // @ts-ignore
      for (let i = 0; i < Number(resp.length); i++) {
        this.idenf = resp[i].pk;
        console.log(' id enf n :' + i, this.idenf);
        this.http.get(environment.apiURL + '/somme/?idenfant=' + this.idenf).subscribe(resp1 => {
           // @ts-ignore
          this.historiquesum = {
            idstore: null,
            nommagasin: '',
            dateachat: null,
            prixcommande: null,
            adresse: '',
          };
           // @ts-ignore
          this.historiquesum1 = {
            idstore: null,
            nommagasin: '',
            dateachat: null,
            prixcommande: null,
            adresse: '',

          };
          // @ts-ignore
          console.log('somme n :' + i, resp1.Sum_dep.Sum_dep);
        //  this.somme = resp1.Sum_dep.Sum_dep;
          // @ts-ignore
          if (resp1.Sum_dep.Sum_dep === null) {resp1.Sum_dep.Sum_dep = 0; }
          // @ts-ignore
          this.historiquesum1.prixcommande = resp1.Sum_dep.Sum_dep;
          // @ts-ignore
          this.historiquesum1.prixcommande = resp1.Sum_dep.Sum_dep;
          this.historiquesum.prixcommande = this.historiquesum1.prixcommande ;
          console.log('somme histo n :' + i, this.historiquesum.prixcommande);
          this.historiquesum.idstore = resp[i].pk;
          console.log(' histo n :' + i, this.historiquesum);
          this.listsum.push(this.historiquesum);
        });




      }


    });

    console.log(this.listsum,    'listsumfromservice');
  }





getallenfantbyid(id: number) {
    this.http.get(environment.apiURL + '/getefantbyidparent/?idparent=' + id).subscribe(resp => {
      console.log(resp, 'nb elment');


      this.list = [];
      // @ts-ignore
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
          photo: ''
        };
        this.enfant.id = resp[i].pk;
        this.enfant.nom = resp[i].fields.nom;
        this.enfant.prenom = resp[i].fields.prenom;
        this.enfant.solde = resp[i].fields.solde;
        this.enfant.idtag = resp[i].fields.idtag;
        this.enfant.etatCompte = resp[i].fields.etatCompte;
        this.enfant.photo = resp[i].fields.photo;


        this.list.push(this.enfant);
      }




      console.log(this.list, 'list');

    });


  }
getStoresList() {
    this.lisstores = [];
    return this.http.get(environment.apiURL + '/stores/').subscribe(resp => {
      console.log(resp);
      // @ts-ignore
      for (let i = 0; i < Number(resp.length); i++) {
        // @ts-ignore
        this.store1 = {
          StoreID: null,
          nom: '',
          adresse: '',
          Commercant: null,

        };
        this.store1.StoreID = resp[i].id;
        this.store1.nom = resp[i].nom;
        this.store1.adresse = resp[i].adresse;
        this.lisstores.push(this.store1);
      }
    });

  }
getsommebyid(id: number) {

    this.http.get(environment.apiURL + '/somme/?idenfant=' + id).subscribe(resp => {
      // @ts-ignore
      console.log(resp.Sum_dep.Sum_dep);
      // @ts-ignore
      this.somme = resp.Sum_dep.Sum_dep;
    });

    }
activercompteenfant(id: number) {
    this.http.get(environment.apiURL + '/ActiverCompteEnfant/?idEnfant=' + id)
      .subscribe(resp => { console.log('hello from service activer'); });
  }
Desactivercompteenfant(id: number) {
    this.http.get(environment.apiURL + '/DesactiverCompteEnfant/?idEnfant=' + id)
      .subscribe(resp => {console.log('hello from service desactiver'); });
  }
gethistoriquebyenfant(id: number) {

  this.http.get(environment.apiURL + '/getcommandebyenfant/?idenfant=' + id).subscribe(resp => {



    this.listhist2 = [];
    this.listhist3 = [];
    // @ts-ignore
    for (let i = 0; i < Number(resp.length); i++) {

 // @ts-ignore
      this.historique = {
        id: null,
        idstore: null,
        nommagasin: '',
        dateachat: null,
        prixcommande: null,
        adresse: '',



      };
      const idstore = resp[i].fields.Store;
      console.log('idstore :' + resp[i].fields.Store);


      this.http.get(environment.apiURL + '/getstorebyid/?idstore=' + idstore).subscribe(rep => {
// @ts-ignore
        this.store = {
          StoreID: null,
          nom: '',
          adresse: '',
          Commercant: null,

        };
        this.store.StoreID = rep[0].pk;
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



      this.historique.id = resp[i].pk;
      this.historique.dateachat = resp[i].fields.dateCommande;

      this.historique.prixcommande = resp[i].fields.prixTotal;
      this.historique.idstore = resp[i].fields.Store;
     // console.log(this.listhist3[i].StoreID, 'listcomplete3333');

      this.listhist2.push(this.historique);

    }




    console.log(this.listhist2, 'listcomplete');
    console.log(this.listhist3, 'list3complete');
  });





}
uploadimage(file: File) {
  console.log('hello1');
  this.http.post(environment.apiURL + '/up.php', file);
  console.log('hello2');
  }



  remplirform(id: number) {

    this.http.get(environment.apiURL + '/enfants/' + id + '/').subscribe(resp => {
      // @ts-ignore
      this.formData3.nom = resp.nom;
      // @ts-ignore
      this.formData3.prenom = resp.prenom;
      // @ts-ignore
      this.formData3.idtag = resp.idtag;
      // @ts-ignore
      this.formData3.photo = resp.photo;
      // @ts-ignore
      this.formData3.solde = resp.solde;
      // @ts-ignore
      this.formData3.idtag = resp.idtag;
      // @ts-ignore
      this.formData3.code = resp.code;
      // @ts-ignore
      this.formData3.etatCompte = resp.etatCompte;
      // @ts-ignore
      this.formData3.parent = resp.parent;


      console.log(this.formData3, 'formserviceenfant');

    });

  }


  updateenfant(Data, id: number) {
    return this.http.put(environment.apiURL + '/enfants/' + id + '/', Data);
  }




  detailstore(id: number) {

      this.http.get(environment.apiURL + '/detailcommande/?idcommande=' + id).subscribe(resp => {

        console.log(resp, 'respfromservice');

        // @ts-ignore
        this.detailsore = {
          id: null,
          nomproduit : '',
          photoproduit : '',
          quantiteproduit : null,
          nomstore : '',
          photostore : '',
          logitude : null,
          latitude : null,
          prixproduit : null,
          prixtotale : null,
          idproduit: null,
          idstore: null,
        };



        this.http.get(environment.apiURL + '/detailcommande1/?idcommende=' + id).subscribe(resp1 => {
          this.detailsore.prixtotale = resp1[0].fields.prixTotal;
          this.detailsore.idstore = resp1[0].fields.Store;

          this.http.get(environment.apiURL + '/getstorebyid/?idstore=' + this.detailsore.idstore).subscribe(resp2 => {
            this.detailsore.photostore = resp2[0].fields.photo;
            this.detailsore.nomstore = resp2[0].fields.nom;
            this.detailsore.logitude = resp2[0].fields.longitude;
            this.detailsore.latitude = resp2[0].fields.latitude;

            console.log('storedetail', this.detailsore);
          });
          });
          });
      console.log('storedetail', this.detailsore);

  }




  detailcommande(id: number) {
    this.listlignecommande = [];
    this.http.get(environment.apiURL + '/detailcommande/?idcommande=' + id).subscribe(resp => {

      console.log(resp, 'respfromservice');

          // @ts-ignore
      this.lignecommande = {
          id: null,
          nomproduit : '',
          photoproduit : '',
          quantiteproduit : null,
          nomstore : '',
          photostore : '',
          logitude : null,
          latitude : null,
          prixproduit : null,
          prixtotale : null,
          idproduit: null,
           idstore: null,
         };



      this.http.get(environment.apiURL + '/detailcommande1/?idcommende=' + id).subscribe(resp1 => {
        this.lignecommande.prixtotale = resp1[0].fields.prixTotal;
        this.lignecommande.idstore = resp1[0].fields.Store;

        this.http.get(environment.apiURL + '/getstorebyid/?idstore=' + this.lignecommande.idstore).subscribe(resp2 => {
          this.lignecommande.photostore = resp2[0].fields.photo;
          this.lignecommande.nomstore = resp2[0].fields.nom;
          this.lignecommande.logitude = resp2[0].fields.longitude;
          this.lignecommande.latitude = resp2[0].fields.latitude;
          console.log( 'ligncommande', resp2[0].fields.longitude);
        // @ts-ignore
          for (let i = 0; i < Number(resp.length); i++) {
          // @ts-ignore
          this.lignecommande1 = {
            id: null,
            nomproduit : '',
            photoproduit : '',
            quantiteproduit : null,
            nomstore : '',
            photostore : '',
            logitude : null,
            latitude : null,
            prixproduit : null,
            prixtotale : null,
            idproduit: null,
            idstore: null,
          };
          this.lignecommande1.prixtotale = this.lignecommande.prixtotale;
          this.lignecommande1.idstore = this.lignecommande.idstore;
          this.lignecommande1.photostore = this.lignecommande.photostore;
          this.lignecommande1.nomstore = this.lignecommande.nomstore;
          this.lignecommande1.logitude =  this.lignecommande.logitude;
          this.lignecommande1.latitude = this.lignecommande.latitude;
          this.lignecommande1.quantiteproduit = resp[i].fields.quantite;
          this.lignecommande1.idproduit =  resp[i].fields.Produit;
          console.log(this.lignecommande1.idproduit,    'idproduit');
          this.http.get(environment.apiURL + '/detailprod/?idprod=' + this.lignecommande1.idproduit).subscribe(resp3 => {
            // @ts-ignore
            this.lignecommande2 = {
              id: null,
              nomproduit : '',
              photoproduit : '',
              quantiteproduit : null,
              nomstore : '',
              photostore : '',
              logitude : null,
              latitude : null,
              prixproduit : null,
              prixtotale : null,
              idproduit: null,
              idstore: null,
            };
            this.lignecommande2.quantiteproduit = resp[i].fields.quantite;
            console.log(this.lignecommande2,    'photoproduits');
            this.lignecommande2.photoproduit = resp3[0].fields.photo;
            this.lignecommande2.nomproduit = resp3[0].fields.nom;
            this.lignecommande2.prixproduit = resp3[0].fields.prix;
            console.log(this.lignecommande2,    'produitedans');

            this.listlignecommande.push(this.lignecommande2);

          });



        }
          console.log(this.lignecommande,    'Commande');


      });


    });
    });
    console.log(this.listlignecommande,    'listlignecommande');
    console.log(this.lignecommande,    'Commande1');
  }

getJ(id) {
  this.http.get(environment.apiURL + '/getjanvier/?idparent=' + id).subscribe(resp1 => {
    // @ts-ignore
    console.log(resp1,    'janvier1');
    // @ts-ignore
    if (resp1.janvier === null) {
      this.janvier = 0;
      console.log(this.janvier,    'janvier');
    } else {
      // @ts-ignore
      this.janvier = resp1.janvier;
      // @ts-ignore
      console.log(resp1.janvier,    'janvier');
      console.log(this.janvier,    'janvier1');
    }



  });

}

  getF(id) {
    this.http.get(environment.apiURL + '/getfivrier/?idparent=' + id).subscribe(resp1 => {
      // @ts-ignore
      console.log(resp1,    'janvier1');
      // @ts-ignore
      if (resp1.janvier === null) {
        this.février = 0;
        console.log(this.février,    'janvier');
      } else {
        // @ts-ignore
        this.février = resp1.janvier;
        // @ts-ignore
        console.log(resp1.janvier,    'janvier');
        console.log(this.février,    'janvier1');
      }



    });

  }

  getM(id) {
    this.http.get(environment.apiURL + '/getmars/?idparent=' + id).subscribe(resp1 => {
      // @ts-ignore
      console.log(resp1,    'janvier1');
      // @ts-ignore
      if (resp1.janvier === null) {
        this.Mars = 0;
        console.log(this.Mars,    'janvier');
      } else {
        // @ts-ignore
        this.Mars = resp1.janvier;
        // @ts-ignore
        console.log(resp1.janvier,    'janvier');
        console.log(this.Mars,    'janvier1');
      }



    });

  }


  getAv(id) {
    this.http.get(environment.apiURL + '/getavril/?idparent=' + id).subscribe(resp1 => {
      // @ts-ignore
      console.log(resp1, 'janvier1');
      // @ts-ignore
      if (resp1.janvier === null) {
        this.avril = 0;
        console.log(this.avril, 'janvier');
      } else {
        // @ts-ignore
        this.avril = resp1.janvier;
        // @ts-ignore
        console.log(resp1.janvier, 'janvier');
        console.log(this.avril, 'janvier1');
      }


    });



  }


  getMai(id) {
    this.http.get(environment.apiURL + '/getmai/?idparent=' + id).subscribe(resp1 => {
      // @ts-ignore
      console.log(resp1, 'janvier1');
      // @ts-ignore
      if (resp1.janvier === null) {
        this.mai = 0;
        console.log(this.mai, 'janvier');
      } else {
        // @ts-ignore
        this.mai = resp1.janvier;
        // @ts-ignore
        console.log(resp1.janvier, 'janvier');
        console.log(this.mai, 'janvier1');
      }


    });


  }

   getJuin(id) {
    this.http.get(environment.apiURL + '/getjuin/?idparent=' + id).subscribe(resp1 => {
      // @ts-ignore
      console.log(resp1, 'janvier1');
      // @ts-ignore
      if (resp1.janvier === null) {
        this.juin = 0;
        console.log(this.mai, 'janvier');
      } else {
        // @ts-ignore
        this.juin = resp1.janvier;
        // @ts-ignore
        console.log(resp1.janvier, 'janvier');
        console.log(this.juin, 'janvier1');
      }


    });


  }
  getJuillet(id) {
    this.http.get(environment.apiURL + '/getjuillet/?idparent=' + id).subscribe(resp1 => {
      // @ts-ignore
      console.log(resp1, 'janvier1');
      // @ts-ignore
      if (resp1.janvier === null) {
        this.juillet = 0;
        console.log(this.juillet, 'janvier');
      } else {
        // @ts-ignore
        this.juillet = resp1.janvier;
        // @ts-ignore
        console.log(resp1.janvier, 'janvier');
        console.log(this.juillet, 'janvier1');
      }


    });


  }
  getOut(id) {
    this.http.get(environment.apiURL + '/getaout/?idparent=' + id).subscribe(resp1 => {
      // @ts-ignore
      console.log(resp1, 'janvier1');
      // @ts-ignore
      if (resp1.janvier === null) {
        this.aout = 0;
        console.log(this.mai, 'janvier');
      } else {
        // @ts-ignore
        this.aout = resp1.janvier;
        // @ts-ignore
        console.log(resp1.janvier, 'janvier');
        console.log(this.aout, 'janvier1');
      }


    });


  }

  getSeptembre(id) {
    this.http.get(environment.apiURL + '/getSeptembre/?idparent=' + id).subscribe(resp1 => {
      // @ts-ignore
      console.log(resp1, 'janvier1');
      // @ts-ignore
      if (resp1.janvier === null) {
        this.septembre = 0;
        console.log(this.septembre, 'janvier');
      } else {
        // @ts-ignore
        this.septembre = resp1.janvier;
        // @ts-ignore
        console.log(resp1.janvier, 'janvier');
        console.log(this.septembre, 'janvier1');
      }


    });


  }
  getOctobre(id) {
    this.http.get(environment.apiURL + '/getOctobre/?idparent=' + id).subscribe(resp1 => {
      // @ts-ignore
      console.log(resp1, 'janvier1');
      // @ts-ignore
      if (resp1.janvier === null) {
        this.octobre = 0;
        console.log(this.octobre, 'janvier');
      } else {
        // @ts-ignore
        this.octobre = resp1.janvier;
        // @ts-ignore
        console.log(resp1.janvier, 'janvier');
        console.log(this.octobre, 'janvier1');
      }


    });


  }

  getNovembre(id) {
    this.http.get(environment.apiURL + '/getNovembre/?idparent=' + id).subscribe(resp1 => {
      // @ts-ignore
      console.log(resp1, 'janvier1');
      // @ts-ignore
      if (resp1.janvier === null) {
        this.novembre = 0;
        console.log(this.novembre, 'janvier');
      } else {
        // @ts-ignore
        this.novembre = resp1.janvier;
        // @ts-ignore
        console.log(resp1.janvier, 'janvier');
        console.log(this.novembre, 'janvier1');
      }


    });


  }
  getDcembre(id) {
    this.http.get(environment.apiURL + '/getDecembre/?idparent=' + id).subscribe(resp1 => {
      // @ts-ignore
      console.log(resp1, 'janvier1');
      // @ts-ignore
      if (resp1.janvier === null) {
        this.decembre = 0;
        console.log(this.decembre, 'janvier');
      } else {
        // @ts-ignore
        this.decembre = resp1.janvier;
        // @ts-ignore
        console.log(resp1.janvier, 'janvier');
        console.log(this.decembre, 'janvier1');
      }


    });


  }

  gettop3forall(id) {

    this.listlignecommande3 = [];
    this.http.get(environment.apiURL + '/gettop3productforallkids/?idp=' + id).subscribe(resp => {
      console.log(resp, 'top3enfants');
      // @ts-ignore
      for (let i = 0; i < Number(resp.length); i++) {
        // @ts-ignore
        this.lignecommande5 = {
          id: null,
          nomproduit : '',
          photoproduit : '',
          quantiteproduit : null,
          nomstore : '',
          photostore : '',
          logitude : null,
          latitude : null,
          prixproduit : null,
          prixtotale : null,
          idproduit: null,
          idstore: null,
        };

        // @ts-ignore
        this.lignecommande5.idproduit = resp[i].fields.Produit;

        this.listlignecommande3.push(this.lignecommande5);
      }});

    console.log('top3enfants', this.listlignecommande3);
  }
gettop3(id) {

  this.listlignecommande1 = [];
  this.http.get(environment.apiURL + '/gettop3/?ide=' + id).subscribe(resp => {
    console.log(resp, 'respfromservice');
    // @ts-ignore
    for (let i = 0; i < Number(resp.length); i++) {
       // @ts-ignore
    this.lignecommande3 = {
      id: null,
      nomproduit : '',
      photoproduit : '',
      quantiteproduit : null,
      nomstore : '',
      photostore : '',
      logitude : null,
      latitude : null,
      prixproduit : null,
      prixtotale : null,
      idproduit: null,
      idstore: null,
    };

      // @ts-ignore
    this.lignecommande3.idproduit = resp[i].fields.Produit;

    this.listlignecommande1.push(this.lignecommande3);
    }});

  console.log('listdestopproduuit', this.listlignecommande1);
  }
getallproduit() {


  this.listlignecommande2 = [];
  this.http.get(environment.apiURL + '/produits/').subscribe(resp => {
    console.log(resp, 'produitsss');
    // @ts-ignore
    for (let i = 0; i < Number(resp.length); i++) {
      // @ts-ignore
      this.lignecommande4 = {
        id: null,
        nomproduit: '',
        photoproduit: '',
        quantiteproduit: null,
        nomstore: '',
        photostore: '',
        logitude: null,
        latitude: null,
        prixproduit: null,
        prixtotale: null,
        idproduit: null,
        idstore: null,
      };

      // @ts-ignore
      this.lignecommande4.idproduit = resp[i].id;
      // @ts-ignore
      this.lignecommande4.photoproduit = resp[i].photo;
      // @ts-ignore
      this.lignecommande4.nomproduit = resp[i].nom;
      this.listlignecommande2.push(this.lignecommande4);
    }});

  console.log('list-detousles-produuit', this.listlignecommande2);
  }



}
