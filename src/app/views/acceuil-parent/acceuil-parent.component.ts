import { Component, OnInit } from '@angular/core';
import {EnfantService} from "../../Services/enfant.service";
import {ActivatedRoute} from "@angular/router";
import {ParentService} from "../../Services/parent.service";

@Component({
  selector: 'app-acceuil-parent',
  templateUrl: './acceuil-parent.component.html',
  styleUrls: ['./acceuil-parent.component.css']
})
export class AcceuilParentComponent implements OnInit {
  parentnumber:number
  constructor(private service: EnfantService,private route: ActivatedRoute) {

    this.route.queryParams.subscribe(params => {
      console.log(params); // {order: "popular"}

      this.parentnumber = params.idp;
      console.log('id:'+this.parentnumber); // popular
    });
  }

  ngOnInit() {
    this.service.getallenfantbyid(this.parentnumber);
  }


  histo(id:number){


  }



}
