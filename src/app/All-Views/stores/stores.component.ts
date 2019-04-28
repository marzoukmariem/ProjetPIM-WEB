import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../Services/store.service';
import { Commercant } from '../../Models/commercant.model';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.css']
})
export class StoresComponent implements OnInit {
  storeList;
  ownersList;
  showSpinner : boolean=true;
searchInput: string;
  store: any;

  constructor(private service: StoreService,
    private router: Router) { }

  ngOnInit() {
    
    $('#spinner2').hide();
    $('#spinner').show();
    this.service.getStoresList().then(res => this.storeList = res)
    this.service.getCommercantList().then(res => {this.ownersList = res as Commercant[]
    $('#spinner').hide();

    })
  }


  openForEdit(storeID: number) {
    this.router.navigate(['/KidsPay/AceuilAdmin/store/edit/' + storeID])
  }

  refreshList() {
    this.service.getStoresList().then(res => this.storeList = res);
  }

  onOrderDelete(id: number) {
    if (confirm('Are you sure to delete this ?')) {
      this.service.deleteStore(id).then(res => {
        this.refreshList();
      });
    }
  }

  update(){
    console.log(this.searchInput);
    this.service.getStoresListSearch(this.searchInput).then(res => {
      
      this.storeList = []
      for (var i = 0; i < Number(res['length']); i++) {

        // @ts-ignore
        this.store = {
          id: null,
          nom: "",
          adresse: "",
          Commercant: null,
        }
        this.store.id = res[i]["pk"];
        this.store.nom = res[i]["fields"]["nom"];
        this.store.adresse = res[i]["fields"]["adresse"];
        this.store.Commercant = res[i]["fields"]["Commercant"];
        this.storeList.push(this.store);

     } })
  ;
  

  }
  
}
