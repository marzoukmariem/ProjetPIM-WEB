import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/Services/store.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-historique-magazin',
  templateUrl: './historique-magazin.component.html',
  styleUrls: ['./historique-magazin.component.css']
})
export class HistoriqueMagazinComponent implements OnInit {
  storenumber:number
  constructor(private service: StoreService,private route: ActivatedRoute, private router: Router) { 
    this.route.queryParams.subscribe(params => {
      console.log(params); // {order: "popular"}

      this.storenumber = params.idm;
      console.log('id:'+this.storenumber); // popular
    });
  }

  ngOnInit() {
    this.service.getHistoriqueByStore(this.storenumber);
  }

}
