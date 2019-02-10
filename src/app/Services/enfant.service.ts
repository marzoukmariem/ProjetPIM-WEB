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
  Data:[any];
  readonly rootURL ="http://localhost:8000/kidspay/"
  constructor(private http : HttpClient) { }
  postenfant(Data){


    return this.http.post(this.rootURL+'enfants/',Data)

  }
}
