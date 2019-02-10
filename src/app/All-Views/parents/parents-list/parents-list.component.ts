import { Component, OnInit } from '@angular/core';
import {ParentService} from "../../../Services/parent.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-parents-list',
  templateUrl: './parents-list.component.html',
  styleUrls: ['./parents-list.component.css']
})
export class ParentsListComponent implements OnInit {

  constructor(private service:ParentService, private router: Router) { }

  ngOnInit() {
    this.service.refreshlist();
  }


   onadd(idparent:number){
     this.router.navigate(['KidsPay/AceuilAdmin/parents/enfants'], { queryParams: { idp: idparent } });

   }


}
