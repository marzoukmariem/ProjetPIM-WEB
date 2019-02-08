import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './views/login/login/login.component';
import {DashboardModule} from "./views/dashboard/dashboard.module";
import {LoginRoutingModule} from "./views/login--rounting/login--rounting.module";
import { ParentComponent } from './Models/parent/parent.component';
import { UtilisateurComponent } from './Models/utilisateur/utilisateur.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ParentComponent,
    UtilisateurComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DashboardModule,
    LoginRoutingModule,
    ParentComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
