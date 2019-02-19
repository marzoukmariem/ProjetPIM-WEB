import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/Services/store.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-accueil-commercant',
  templateUrl: './accueil-commercant.component.html',
  styleUrls: ['./accueil-commercant.component.css']
})
export class AccueilCommercantComponent implements OnInit {
 commercantnumber:number

  constructor(private service: StoreService,private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe(params => { 
      this.commercantnumber = params.idc;
      console.log('id:'+this.commercantnumber); // popular
    });

   }

  ngOnInit() {
    this.service.getallStoresbyid(this.commercantnumber);
  }


  histo(id:number){
    this.router.navigate(['KidsPay/Aceuilcommercant/Historique'], { queryParams: { idm: id } });
  }

}
