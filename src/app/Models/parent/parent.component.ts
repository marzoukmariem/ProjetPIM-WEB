import { Component, OnInit } from '@angular/core';
import {parent} from './parent'
import {Router} from "@angular/router";

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})


export class ParentComponent implements OnInit {

  constructor( ){ }

  ngOnInit() {
    document.body.className='helloparent';
  }

}
