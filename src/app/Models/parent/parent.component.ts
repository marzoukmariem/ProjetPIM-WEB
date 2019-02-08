import { Component, OnInit } from '@angular/core';
import  {parent} from  './parent'


@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent implements OnInit {
parent:parent ={
  id:1,
  nom :'String',
  prenom:'String',
  numTel :'String',
  role :'String',
  cin:'String',
  email:'String',
}

  ngOnInit(): void {
  }



}




