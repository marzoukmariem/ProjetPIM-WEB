import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {Parent} from "../Models/parent.model";
import {Enfant} from "../Models/enfant.model";
@Injectable({
  providedIn: 'root'
})
export class EnfantService {
  formData:Enfant
  enfant:Enfant
  list:Enfant[]=[];

  Data:[any];
  readonly rootURL ="http://localhost:8000/kidspay/"
  constructor(private http : HttpClient) {
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



}
