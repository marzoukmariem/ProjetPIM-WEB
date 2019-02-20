import { Injectable } from '@angular/core';
import { Store } from '../Models/store.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Historique } from '../Models/historique.model';
@Injectable({
  providedIn: 'root'
})
export class StoreService {
  formData:Store
  readonly rootURL ="http://localhost:8000/kidspay/"
  list:Store[]=[];
  store:Store
  listhist2: Historique[]=[];
  historique:Historique;


  
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

 getallStoresbyid(id:number){
  this.http.get(this.rootURL+'getStoreByIdCommercant/?idCommercant='+id).subscribe(resp => {
    console.log(resp, "nb elment");
    console.log(resp['length'], "nb elment");

    this.list=[]
    for (var i=0; i<Number(resp['length']); i++) {

      // @ts-ignore
      this.store={
        StoreID:null,
        nom :"",
        adresse :"",
        Commercant:null,
      }
      this.store.StoreID=resp[i]["pk"];
      this.store.nom=resp[i]["fields"]["nom"];
      this.store.adresse=resp[i]["fields"]["adresse"];
      this.store.Commercant=resp[i]["fields"]["Commercant"];
      this.list.push(this.store);
    }
    console.log(this.list, "list");
  })

}

getHistoriqueByStore(id:number){

  this.http.get(this.rootURL+'getcommandebystore/?idstore='+id).subscribe(resp => {


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
    


      this.historique.dateachat=(resp[i]["fields"]["dateCommande"]).substring(0, 10);
      this.historique.prixcommande=resp[i]["fields"]["prixTotal"];


      this.listhist2.push(this.historique);
    }




    console.log(this.listhist2, "listcomplete");

  })





}


}
