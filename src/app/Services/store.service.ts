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
  readonly rootURL = environment.apiURL+"/"
  readonly rootURL2 = environment.apiURL2+"/"
  list: Store[] = [];
  list2: Product[] = [];
  x:string;
  y:number;
  listeEnfant2: Enfant[] = [];
  store: Store
  product: Product
  product2: Product
  store2: Store
  listhist2: Historique[] = [];
  listhist4: Product[] = [];
  listhist3: Historique[] = [];
  historique: Historique;
  product3: Product;
  historique3: Historique;
  enfant: Enfant;
  balance: any;
  nomEtPrenom: any;
  nbmagazins: number
  nbtransaction: number
  listeEnfant: Enfant[] = [];
  listeProduit: Product[] = [];
  listeStore2: Store[] = [];
  enfant2: Enfant;
  product5: Product;
  listeLastTransactionsRecentes: Historique[] = []
  enfant3: Enfant;
  k:number=0;

  


  constructor(private http: HttpClient) {
    // @ts-ignore
    this.formData1 = {
      id: null,
      nom: '',
      categorie:'',
      code:'',
      Store:null
    };
   }


   UpdateStore(): any {
     console.log('updating')
    this.x=this.formData.Commercant.toString()
    this.x=this.x.substr(0, 1);
    console.log(this.x,'xxx')
    this.y=parseInt(this.x, 10);
    console.log(this.y,'yyy')
    this.formData.Commercant=this.y
    var body = {
      ...this.formData
    }
    console.log(this.formData)
    return this.http.put(environment.apiURL + '/stores/'+this.formData.id+'/', body)
  }

  saveOrUpdateStore() {
    
    this.x=this.formData.Commercant.toString()
    this.x=this.x.substr(0, 1);
    console.log(this.x,'xxx')
    this.y=parseInt(this.x, 10);
    console.log(this.y,'yyy')
    this.formData.Commercant=this.y
    var body = {
      ...this.formData
    }
    console.log(this.formData)
    return this.http.post(environment.apiURL + '/stores/', body)
  }

  getStoresList() {
    return this.http.get(environment.apiURL + '/stores/').toPromise();
  }

  getStoresListSearch(searchInput) {
    return this.http.get(environment.apiURL + '/getStoresListSearch/?searchInput='+searchInput).toPromise();
  }

  refresh() {
    
    return this.http.get('http://79.137.75.40:3001/newProduct?p=1').subscribe();
    console.log('refreeeeeeeeeeeeeeeeeeeesh')
  }

  getCommercantList() {
    return this.http.get(environment.apiURL + '/users/').toPromise();
  }

  getStoreByID(id: number): any {
    return this.http.get(environment.apiURL + '/stores/' + id+'/').toPromise();
  }

  deleteStore(id: number) {
    return this.http.delete(environment.apiURL + '/stores/' + id+'/').toPromise();
  }

  deleteProduct(id: number) {
    return this.http.delete(environment.apiURL + '/produits/' + id+'/').toPromise();
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
          code:"",
          prix:null,
        }
        this.product.id = resp[i]["pk"];
        this.product.nom = resp[i]["fields"]["nom"];
        this.product.photo = resp[i]["fields"]["photo"];
        this.product.Store = resp[i]["fields"]["Store"];
        this.product.code = resp[i]["fields"]["code"];
        this.product.categorie = resp[i]["fields"]["categorie"];
        this.product.prix = resp[i]["fields"]["prix"];
        this.list2.push(this.product);
      }
      //console.log(this.list, "list");
    })
  }

  getProductsByStoreSearch(id: number,searchInput:String): any {
    this.http.get(this.rootURL + 'getproductsbystoreSearch/?idstore=' + id+'&searchInput='+searchInput).subscribe(resp => {
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
          code:"",
          prix:null,
        }
        this.product.id = resp[i]["pk"];
        this.product.nom = resp[i]["fields"]["nom"];
        this.product.photo = resp[i]["fields"]["photo"];
        this.product.Store = resp[i]["fields"]["Store"];
        this.product.code = resp[i]["fields"]["code"];
        this.product.categorie = resp[i]["fields"]["categorie"];
        this.product.prix = resp[i]["fields"]["prix"];
        this.list2.push(this.product);
      }
      //console.log(this.list, "list");
    })
  }


  getNewProductsByStore(id: number): any {
    this.http.get(this.rootURL + 'getnewproductsbystore/?idstore=' + id).subscribe(resp => {
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
          code:"",
          prix:null,
        }
        this.product.id = resp[i]["pk"];
        this.product.nom = resp[i]["fields"]["nom"];
        this.product.photo = resp[i]["fields"]["photo"];
        this.product.Store = resp[i]["fields"]["Store"];
        this.product.code = resp[i]["fields"]["code"];
        this.product.categorie = resp[i]["fields"]["categorie"];
        this.product.prix = resp[i]["fields"]["prix"];
        this.list2.push(this.product);
      }
      //console.log(this.list, "list");
    })
  }

  getProduct(id:number) :any{
    return this.http.get(environment.apiURL+'/produits/'+id+'/').toPromise();
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
        this.nomEtPrenom = resp[i]["fields"]["nom"] + " " + resp[i]["fields"]["prenom"];


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
            id:null,
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
          this.historique.id = resp2[i]["pk"];

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



          for (var i = Number(resp2['length'])-1; i >-1 ; i--) {
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

              if(this.historique3.store!=null && this.historique3.store.Commercant==id&&this.k<10){
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

  updateProduit(Data) {
    return this.http.put(environment.apiURL + '/produits/'+Data.id+'/'  , Data);
  }


  getHistoriqueByCommande(id: number) {
    this.listeProduit = []

    this.http.get(this.rootURL + 'getligneCommandeByCommande/?idcommande=' + id).subscribe(resp2 => {

      this.http.get(this.rootURL + 'produits/').subscribe(resp => {

        for (var i = 0; i < Number(resp['length']); i++) {
          // @ts-ignore
          this.product2 = {
            id: null,
            nom: '',
            photo: ''
          }

          this.product2.id = resp[i]["id"];
          this.product2.nom = resp[i]["nom"];
          this.product2.photo = resp[i]["photo"];

          this.listeProduit.push(this.product2);
        }


        

        this.listhist4 = []
        for (var i = 0; i < Number(resp2['length']); i++) {
          // @ts-ignore
          this.product3 = {
           
            nom: "",
            
            photo: "",
          }

          //console.log(this.listeProduit, "wtf");
          for (var j = 0; j < this.listeProduit.length; j++) {
            console.log(resp2[i]["fields"]["Produit"])
            console.log(this.listeProduit[j].id)
            if (resp2[i]["fields"]["Produit"] == this.listeProduit[j].id) {
              console.log('here')
              // @ts-ignore
              this.product5 = {
                id: null,
                nom: '',
                photo: ''
              }

              this.product5.nom = this.listeProduit[j].nom
              this.product5.photo = this.listeProduit[j].photo
              this.product2 = this.product5
            }
          }


          

          this.listhist4.push(this.product2);
        }

      })

    })

  }


}
