import { Component, OnInit } from '@angular/core';
import {EnfantService} from "../../Services/enfant.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-historique',
  templateUrl: './historique.component.html',
  styleUrls: ['./historique.component.css']
})
export class HistoriqueComponent implements OnInit {
  enfantnumber:number
  constructor(private service: EnfantService,private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe(params => {
      console.log(params); // {order: "popular"}

      this.enfantnumber = params.idp;
      console.log('id:'+this.enfantnumber); // popular
    });
  }

  ngOnInit() {
    this.service.gethistoriquebyenfant(this.enfantnumber);
  }

}
