import { Injectable } from '@angular/core';
import { Store } from '../Models/store.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Historique } from '../Models/historique.model';
import { Enfant } from '../Models/enfant.model';
import { Product } from '../Models/product.model.';
@Injectable({
  providedIn: 'root'
})
export class StoreService {
  formData1: Product;
  formData: Store
  readonly rootURL = "http://localhost:8000/kidspay/"
  list: Store[] = [];
  list2: Product[] = [];

  listeEnfant2: Enfant[] = [];
  store: Store
  product: Product
  store2: Store
  listhist2: Historique[] = [];
  listhist3: Historique[] = [];
  historique: Historique;
  historique3: Historique;
  enfant: Enfant;
  balance: any;
  nbmagazins: number
  nbtransaction: number
  listeEnfant: Enfant[] = [];
  listeStore2: Store[] = [];
  enfant2: Enfant;
  listeLastTransactionsRecentes: Historique[] = []
  enfant3: Enfant;
  k:number=0;

  


  constructor(private http: HttpClient) {
    // @ts-ignore
    this.formData1 = {
      id: null,
      nom: '',
      genre:'',
      code:'',
      Store:null
    };
   }

  saveOrUpdateStore() {
    var body = {
      ...this.formData
    }
    return this.http.post(environment.apiURL + '/stores/', body)
  }

  getStoresList() {
    return this.http.get(environment.apiURL + '/stores/').toPromise();
  }

  getCommercantList() {
    return this.http.get(environment.apiURL + '/users/').toPromise();
  }

  getStoreByID(id: number): any {
    return this.http.get(environment.apiURL + '/stores/' + id).toPromise();
  }

  deleteStore(id: number) {
    return this.http.delete(environment.apiURL + '/stores/' + id).toPromise();
  }

  getallStoresbyid(id: number) {
    this.http.get(this.rootURL + 'getStoreByIdCommercant/?idCommercant=' + id).subscribe(resp => {
      //console.log(resp, "nb elment");
      //console.log(resp['length'], "nb elment");

      this.list = []
      for (var i = 0; i < Number(resp['length']); i++) {

        // @ts-ignore
        this.store = {
          StoreID: null,
          nom: "",
          adresse: "",
          Commercant: null,
        }
        this.store.StoreID = resp[i]["pk"];
        this.store.nom = resp[i]["fields"]["nom"];
        this.store.adresse = resp[i]["fields"]["adresse"];
        this.store.Commercant = resp[i]["fields"]["Commercant"];
        this.list.push(this.store);
      }
      //console.log(this.list, "list");
    })

  }


  getProductsByStore(id: number): any {
    this.http.get(this.rootURL + 'getproductsbystore/?idstore=' + id).subscribe(resp => {
      console.log(resp, "nb elment");
      //console.log(resp['length'], "nb elment");

      this.list2 = []
      for (var i = 0; i < Number(resp['length']); i++) {

        // @ts-ignore
        this.product = {
          id: null,
          nom: "",
          photo: "",
          Store: null,
          code:""
        }
        this.product.id = resp[i]["pk"];
        this.product.nom = resp[i]["fields"]["nom"];
        this.product.photo = resp[i]["fields"]["photo"];
        this.product.Store = resp[i]["fields"]["Store"];
        this.product.code = resp[i]["fields"]["code"];
        this.product.genre = resp[i]["fields"]["genre"];
        this.list2.push(this.product);
      }
      //console.log(this.list, "list");
    })
  }

  getNumberOfTransactions(id: number) {
    this.nbtransaction = 0;
    this.http.get(this.rootURL + 'getStoreByIdCommercant/?idCommercant=' + id).subscribe(resp => {
      for (var i = 0; i < Number(resp['length']); i++) {
// @ts-ignore
        this.store = {
          StoreID: null,
          nom: "",
          adresse: "",
          Commercant: null,
        }

        this.store.StoreID = resp[i]["pk"];

        this.http.get(this.rootURL + 'getcommandebystore/?idstore=' + this.store.StoreID).subscribe(resp => {

          for (var i = 0; i < Number(resp['length']); i++) {

            this.nbtransaction++
          }
        })

      }

    })

  }

  getNumberOfStores(id: number) {
    this.http.get(this.rootURL + 'getStoreByIdCommercant/?idCommercant=' + id).subscribe(resp => {
      this.nbmagazins = 0;
      this.nbmagazins = resp['length'];
    })

  }

  getSolde(id: number) {
    this.http.get(this.rootURL + 'userInfo/?iduser=' + id).subscribe(resp => {

      //console.log(resp['length'], "nb users:");
      this.balance = 0;
      for (var i = 0; i < Number(resp['length']); i++) {

        // @ts-ignore
        this.balance = 0;
        this.balance = resp[i]["fields"]["balance"];

      }

    })
    //console.log(this.balance, "balance:");
  }

  getHistoriqueByStore(id: number) {
    this.listeEnfant = []

    this.http.get(this.rootURL + 'getcommandebystore/?idstore=' + id).subscribe(resp2 => {

      this.http.get(this.rootURL + 'enfants/').subscribe(resp => {

        for (var i = 0; i < Number(resp['length']); i++) {
          // @ts-ignore
          this.enfant = {
            id: null,
            nom: '',
            prenom: ''
          }

          this.enfant.id = resp[i]["id"];
          this.enfant.nom = resp[i]["nom"];
          this.enfant.prenom = resp[i]["prenom"];

          this.listeEnfant.push(this.enfant);
        }


        

        this.listhist2 = []
        for (var i = 0; i < Number(resp2['length']); i++) {
          // @ts-ignore
          this.historique = {
            enfant: null,
            store: null,
            nommagasin: "",
            dateachat: null,
            prixcommande: null,
            adresse: "",
          }

          console.log(this.listeEnfant, "wtf");
          for (var j = 0; j < this.listeEnfant.length; j++) {

            if (resp2[i]["fields"]["Enfant"] == this.listeEnfant[j].id) {

              // @ts-ignore
              this.enfant2 = {
                id: null,
                nom: '',
                prenom: ''
              }

              this.enfant2.nom = this.listeEnfant[j].nom
              this.enfant2.prenom = this.listeEnfant[j].prenom
              this.historique.enfant = this.listeEnfant[j]
            }
          }


          this.historique.dateachat = (resp2[i]["fields"]["dateCommande"]).substring(0, 10);
          this.historique.prixcommande = resp2[i]["fields"]["prixTotal"];

          this.listhist2.push(this.historique);
        }

      })

    })

  }


  getLastTransactions(id: number) {
    this.k=0
    this.listeEnfant2 = []
    this.listeStore2 = []
    this.listhist3 = []
    this.http.get(this.rootURL + 'commandes/').subscribe(resp2 => {

      this.http.get(this.rootURL + 'enfants/').subscribe(resp => {

        this.http.get(this.rootURL + 'stores/').subscribe(resp3 => {

          for (var i = 0; i < Number(resp['length']); i++) {
            // @ts-ignore
            this.enfant = {
              id: null,
              nom: '',
              prenom: ''
            }

            this.enfant.id = resp[i]["id"];
            this.enfant.nom = resp[i]["nom"];
            this.enfant.prenom = resp[i]["prenom"];

            this.listeEnfant2.push(this.enfant);

          }
          console.log(this.listeEnfant2, "listeEnfant2");



          for (var i = 0; i < Number(resp3['length']); i++) {
            // @ts-ignore
            this.store2 = {
              StoreID: null,
              nom: ''
            }

            this.store2.StoreID = resp3[i]["id"];
            this.store2.nom = resp3[i]["nom"];
            this.store2.Commercant = resp3[i]["Commercant"];
            this.listeStore2.push(this.store2);

          }
          //console.log(this.listeStore2, "listeStore2");



          for (var i = 0; i < Number(resp2['length']); i++) {
            // @ts-ignore
            this.historique3 = {
              enfant: null,
              store: null,
              prixcommande: 0,
              dateachat:null
              
            }

            this.historique3.dateachat = (resp2[i]["dateCommande"]).substring(0, 10);
            this.historique3.prixcommande = (resp2[i]["prixTotal"]);
            for (var j = 0; j < this.listeEnfant2.length; j++) {

              if (resp2[i]["Enfant"] == this.listeEnfant2[j].id) {

                this.historique3.enfant = this.listeEnfant2[j]
              }
            }
              for (var j = 0; j < this.listeStore2.length; j++) {

                if (resp2[i]["Store"] == this.listeStore2[j].StoreID) {

                  this.historique3.store = this.listeStore2[j]
                }


              }

              if(this.historique3.store!=null && this.historique3.store.Commercant==id&&this.k<3){
                this.listhist3.push(this.historique3);
                this.k++
                console.log(this.k,'k')
              }
              

            
            console.log(this.listhist3, "listhist3");

          }

        })
      })
    })

  }


  ajoutProduit(Data) {
    return this.http.post(environment.apiURL + '/produits/'  , Data);
  }


}
