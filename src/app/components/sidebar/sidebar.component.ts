import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
  
    { path: '/KidsPay/AceuilComerçant/dashboard', title: 'Accueil',  icon: 'dashboard', class: '' },
    { path: '/KidsPay/AceuilComerçant/user-profile', title: 'Mon Profil',  icon:'person', class: '' },
    { path: '/KidsPay/login', title: 'Déconnecter',  icon:'content_paste', class: '' },
    
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
