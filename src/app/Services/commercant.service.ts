import { Injectable } from '@angular/core';
import { Commercant } from '../Models/commercant.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommercantService {
  formData:Commercant;

  
  constructor(private http:HttpClient) {}

   saveOrUpdateCommercant(){
     var body={
       ...this.formData
     }
     return this.http.post(environment.apiURL+'/users/',body)
  }

  getCommercantList(){
    return this.http.get(environment.apiURL+'/users/').toPromise();
 }

 getCommercantById(id:number) :any{
  return this.http.get(environment.apiURL+'/users/'+id).toPromise();
}

 deleteCommercant(id:number){
  return this.http.delete(environment.apiURL+'/users/'+id).toPromise();
 }



}
