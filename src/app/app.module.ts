import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './views/login/login/login.component';
import {DashboardModule} from "./views/dashboard/dashboard.module";
import {LoginRoutingModule} from "./views/login--rounting/login--rounting.module";
import {ParentComponent} from "./Models/parent/parent.component";
import {ParentRoutingModule} from "./Models/parent/parent-routing.module";






@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ParentComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DashboardModule,
    LoginRoutingModule,
    ParentRoutingModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
