import { Component, OnInit } from '@angular/core';
import {parent} from './parent'

let component = Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
});

@component
export class ParentComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
