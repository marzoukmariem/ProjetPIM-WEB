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



@Injectable({
  providedIn: 'root'
})
export class EnfantService {
  downloadURL: Observable < string > ;
  imageUrl = '/assets/img/enfant3.jpg';
  img: object = [];
  formData3: Enfant;
  formData4: Enfant;
  constructor(private http: HttpClient, private storage: AngularFireStorage) {

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

  readonly rootURL = 'http://192.168.43.223:8000/kidspay/';
  private z1: string;

  apiUrl = 'http://localhost/kidspay/up.php';

  upload(formData) {

    return this.http.post<any>(`${this.apiUrl}`, formData, {
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
    this.http.get(environment.apiURL + '/ActiverCompteEnfant/?idEnfant=' + id).subscribe(resp => { console.log('hello from service activer'); });
  }
Desactivercompteenfant(id: number) {
    this.http.get(environment.apiURL + '/DesactiverCompteEnfant/?idEnfant=' + id).subscribe(resp => {console.log('hello from service desactiver'); });
  }
gethistoriquebyenfant(id: number) {

  this.http.get(environment.apiURL + '/getcommandebyenfant/?idenfant=' + id).subscribe(resp => {



    this.listhist2 = [];
    this.listhist3 = [];
    // @ts-ignore
    for (let i = 0; i < Number(resp.length); i++) {

 // @ts-ignore
      this.historique = {
        idstore: null,
        nommagasin: '',
        dateachat: null,
        prixcommande: null,
        adresse: '',



      };
      const idstore = resp[i].fields.Store;
      console.log('idstore :' + resp[i].fields.Store);


      this.http.get(environment.apiURL + '/getstorebyid/?idstore=' + idstore).subscribe(rep => {

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
  this.http.post('http://localhost/kidspay/up.php', file);
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

}
