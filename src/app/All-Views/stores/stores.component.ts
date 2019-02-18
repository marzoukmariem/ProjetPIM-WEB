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

  
}
