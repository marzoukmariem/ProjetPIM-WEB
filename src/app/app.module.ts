import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './views/login/login/login.component';
import {DashboardModule} from "./views/dashboard/dashboard.module";
import {LoginRoutingModule} from "./views/login--rounting/login--rounting.module";
import {ActivatedRoute, RouterModule} from "@angular/router";
import {DashboardComponent} from "./views/dashboard/dashboard/dashboard.component";
import { ParentsListComponent } from './All-Views/parents/parents-list/parents-list.component';
import {ParentsComponent} from "./All-Views/parents/parents.component";
import {ParentComponent} from "./All-Views/parents/parent/parent.component";
import {ParentService} from "./Services/parent.service";
import {FormsModule} from "@angular/forms";
import { EnfantComponent } from './All-Views/enfant/enfant.component';
import { UserComponent } from './All-Views/user/user.component';






@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ParentComponent,
    ParentsComponent,
    ParentsListComponent,
    EnfantComponent,
    UserComponent,

      ],
  imports: [
    BrowserModule,
    AppRoutingModule,
     DashboardModule,
    LoginRoutingModule,
    HttpClientModule,
    FormsModule,


       RouterModule.forRoot([
      {path: 'KidsPay/AceuilAdmin/parents', component: ParentsComponent},
         {path: 'KidsPay/AceuilAdmin/parents/enfants', component: EnfantComponent},
      {path: 'KidsPay/AceuilAdmin', component: DashboardComponent}
    ])

  ],
  providers: [ParentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
