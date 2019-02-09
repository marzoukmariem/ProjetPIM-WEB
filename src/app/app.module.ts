import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './views/login/login/login.component';
import {DashboardModule} from "./views/dashboard/dashboard.module";
import {LoginRoutingModule} from "./views/login--rounting/login--rounting.module";
import {RouterModule} from "@angular/router";
import {DashboardComponent} from "./views/dashboard/dashboard/dashboard.component";
import { ParentsComponent } from './Models/parents/parents.component';
import { ParentListComponent } from './Models/parents/parent-list/parent-list.component';
import {ParentComponent} from "./Models/parents/parent/parent.component";
import { ParentsListComponent } from './All-Views/parents/parents-list/parents-list.component';






@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ParentComponent,
    ParentsComponent,
    ParentListComponent,
    ParentsListComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
     DashboardModule,
    LoginRoutingModule,
       RouterModule.forRoot([
      {path: 'parents', component: ParentComponent},
      {path: 'dashboard', component: DashboardComponent}
    ])

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
