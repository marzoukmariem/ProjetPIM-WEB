import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {Parent} from "../Models/parent.model";
import {Enfant} from "../Models/enfant.model";
import {Historique} from "../Models/historique.model";
import {Store} from "../Models/store.model";
@Injectable({
  providedIn: 'root'
})
export class EnfantService {
  formData:Enfant
  enfant:Enfant
  list:Enfant[]=[];
  listhist1:Historique[]=[];
  listhist2: Historique[]=[];
  historique:Historique;
  store:Store;
  Data:[any];
  readonly rootURL ="http://localhost:8000/kidspay/"
  constructor(private http : HttpClient) {
    // @ts-ignore
    this.historique={

      nommagasin:"",
      dateachat:null,
      prixcommande:null,
      adresse:"",


    }
    // @ts-ignore
    this.enfant={
      id:null,
      nom :"",
      prenom :"",
      solde :null,
      idtag:"",
      etatCompte:"",
      parent:null,



    }
    // @ts-ignore
    this.store={
      StoreID:null,
      nom: "",
      adresse: "",
      Commercant: null,



    }


  }
  postenfant(Data){


    return this.http.post(this.rootURL+'enfants/',Data)

  }
  getallenfantbyid(id:number){
    this.http.get(this.rootURL+'getefantbyidparent/?idparent='+id).subscribe(resp => {
      console.log(resp, "nb elment");
      console.log(resp['length'], "nb elment");

      this.list=[]
      for (var i=0; i<Number(resp['length']); i++) {

        // @ts-ignore
        this.enfant={
          id:null,
          nom :"",
          prenom :"",
          solde :null,
          idtag:"",
          etatCompte:"",
          parent:null,
        }
        this.enfant.id=resp[i]["pk"];
        this.enfant.nom=resp[i]["fields"]["nom"];
        this.enfant.prenom=resp[i]["fields"]["prenom"];
        this.enfant.solde=resp[i]["fields"]["solde"];
        this.enfant.idtag=resp[i]["fields"]["idtag"];
        this.enfant.etatCompte=resp[i]["fields"]["etatCompte"];


        this.list.push(this.enfant);
      }




      console.log(this.list, "list");

    })


  }

gethistoriquebyenfant(id:number){

  this.http.get(this.rootURL+'getcommandebyenfant/?idenfant='+id).subscribe(resp => {


    console.log(resp, "nb elment");
    console.log(resp['length'], "nb elment");


    this.listhist2=[]
    for (var i=0; i<Number(resp['length']); i++) {

      // @ts-ignore
      this.historique={

        nommagasin:"",
        dateachat:null,
        prixcommande:null,
        adresse:"",



      }
      // @ts-ignore
      this.store={
        StoreID:null,
        nom: "",
        adresse: "",
        Commercant: null,

      }
      var idstore= this.historique.dateachat=resp[i]["fields"]["Store"];

      this.http.get(this.rootURL+'getstorebyid/?idstore='+id).subscribe(resp=> {
        console.log('nommag:'+resp[0]['fields']['nom'])
        console.log('nommag:'+resp[0]['fields']['adresse'])
        this.historique.nommagasin=resp[0]['fields']['nom'];
        this.historique.adresse=resp[0]['fields']['adresse'];

      });

      this.historique.nommagasin=this.store.nom;
      this.historique.dateachat=resp[i]["fields"]["dateCommande"];
      var str = resp[i]["fields"]["dateCommande"];


      console.log(str.substr(0, 10),"helodate");
      console.log(str.substr(11, 14),"helotime");
      this.historique.prixcommande=resp[i]["fields"]["prixTotal"];
      this.historique.adresse=resp[i]['fields']['adresse'];


      this.listhist2.push(this.historique);
    }




    console.log(this.listhist2, "listcomplete");

  })





}

}
