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
  parent1:Parent;
  Data:[any];
  list:Parent[];

  readonly rootURL ="http://localhost:8000/kidspay/"
  constructor(private http : HttpClient) {

     }

  postparent(Data){


      return this.http.post(this.rootURL+'users/',Data)

  }
  refreshlist(){

    this.http.get(this.rootURL+'users/').toPromise().then(res=>this.list=res as Parent[]);
  }
}
