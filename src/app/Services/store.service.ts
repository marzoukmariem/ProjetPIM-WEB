import { Injectable } from '@angular/core';
import { Store } from '../Models/store.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class StoreService {
  formData:Store
  
  constructor(private http:HttpClient) { }

  saveOrUpdateStore(){
    var body={
      ...this.formData
    }
    return this.http.post(environment.apiURL+'/stores/',body)
 }

 getStoresList(){
  return this.http.get(environment.apiURL+'/stores/').toPromise();
}

getCommercantList(){
  return this.http.get(environment.apiURL+'/users/').toPromise();
}

getStoreByID(id:number) :any {
  return this.http.get(environment.apiURL+'/stores/'+id).toPromise();
}

deleteStore(id:number){
  return this.http.delete(environment.apiURL+'/stores/'+id).toPromise();
 }
}
