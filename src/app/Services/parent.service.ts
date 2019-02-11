import { Injectable } from '@angular/core';
import {Parent} from "../Models/parent.model";
import { HttpClient } from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ParentService {
  formData:Parent;
  parent1:Parent ;

  Data:[any];
  list:Parent[]=[];
  list1:Parent[];
  readonly rootURL ="http://localhost:8000/kidspay/"
  constructor(private http : HttpClient) {
    this.list1=[];
    // @ts-ignore
    this.parent1 = {
      id:null,
      nom:"",
      prenom:"",
      numTel: "",
      role: "parent",
      cin:"",
      email:"",
      password:"",
    }
        }

  postparent(Data){


      return this.http.post(this.rootURL+'users/',Data)

  }
  refreshlist(){



     this.http.get(this.rootURL+'getallparent/').subscribe(resp => {
     console.log(resp, "nb elment");
     console.log(resp['length'], "nb elment");
     //this.list1==resp;
       this.list=[]
      for (var i=0; i<Number(resp['length']); i++) {

        // @ts-ignore
        this.parent1 = {
          id:null,
          nom:"",
          prenom:"",
          numTel: "",
          role: "parent",
          cin:"",
          email:"",
          password:"",
        }
        this.parent1.id=resp[i]["pk"];
        this.parent1.nom=resp[i]["fields"]["nom"];
         this.parent1.prenom=resp[i]["fields"]["prenom"];
        this.parent1.numTel=resp[i]["fields"]["numTel"];
        this.parent1.role=resp[i]["fields"]["role"];
        this.parent1.cin=resp[i]["fields"]["cin"];
        this.parent1.email=resp[i]["fields"]["email"];
        this.parent1.password=resp[i]["fields"]["password"];
        this.list.push(this.parent1);
      }




      console.log(this.list, "list");

    })


  }
}
