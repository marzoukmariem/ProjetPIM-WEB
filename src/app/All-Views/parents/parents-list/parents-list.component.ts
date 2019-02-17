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

   Edit(id:number){
    this.router.navigate(['KidsPay/AceuilAdmin/parents/update'], { queryParams: { idp: id } });
  }

  onaddparent(id: number){
    this.router.navigate(['KidsPay/AceuilAdmin/parents/add']);

  }


  ondelete(id: number)
  {
    if (confirm('Are you sure to delete this ?')) {
      this.service.deleteparent(id).then(res => {
        this.service.refreshlist();
        alert('Deleted Successfuly');

      });
    }
  }

}
