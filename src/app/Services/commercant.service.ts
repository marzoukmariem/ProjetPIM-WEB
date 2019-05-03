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

  addcarte(body){
    
    return this.http.post('http://79.137.75.40:8000/kidspay/cartes/',body)
 }

  UpdateCommercant(){
    var body={
      ...this.formData
    }
    return this.http.put(environment.apiURL+'/users/'+this.formData.id+'/',body)
 }

 UpdateCommercantProfile(){
  var body={
    ...this.formData
  }
  return this.http.put(environment.apiURL+'/users/'+this.formData.id+'/',body)
}

  getCommercantList(){
    return this.http.get(environment.apiURL+'/commercants/').toPromise();
 }

 getCommercantById(id:number) :any{
  return this.http.get(environment.apiURL+'/users/'+id+'/').toPromise();
}

 deleteCommercant(id:number){
  return this.http.delete(environment.apiURL+'/users/'+id+'/').toPromise();
 }

 getCommencantListSearch(searchInput: (searchInput: any) => any): any {
  console.log(environment.apiURL +'/getCommercantsListSearch/?searchInput='+searchInput)
  return this.http.get(environment.apiURL + '/getCommercantsListSearch/?searchInput='+searchInput).toPromise();
}
 


}
