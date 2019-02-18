import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './views/login/login/login.component';
import { DashboardModule } from "./views/dashboard/dashboard.module";
import { LoginRoutingModule } from "./views/login--rounting/login--rounting.module";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { DashboardComponent } from "./views/dashboard/dashboard/dashboard.component";
import { ParentsListComponent } from './All-Views/parents/parents-list/parents-list.component';
import { ParentsComponent } from "./All-Views/parents/parents.component";
import { ParentComponent } from "./All-Views/parents/parent/parent.component";
import { ParentService } from "./Services/parent.service";
import { FormsModule } from "@angular/forms";
import { EnfantComponent } from './All-Views/enfant/enfant.component';
import { UserComponent } from './All-Views/user/user.component';
import { AcceuilParentComponent } from './views/acceuil-parent/acceuil-parent.component';
import { CommAcceuilComponent } from './views/comm-acceuil/comm-acceuil.component';
import { CommercantsComponent } from './All-Views/commercants/commercants.component';
import { CommercantComponent } from './All-Views/commercants/commercant/commercant.component';
import { LayoutModule } from "./views/layout/layout.module";
import { StoreComponent } from './All-Views/stores/store/store.component';
import { StoresComponent } from './All-Views/stores/stores.component';
import { HistoriqueComponent } from './All-Views/historique/historique.component';
import { ParenteditComponent } from './All-Views/parents/parentedit/parentedit.component';
import { ParentaddComponent } from './All-Views/parents/parentadd/parentadd.component';
import { AccueilCommercantComponent } from './views/accueil-commercant/accueil-commercant.component';
import {AlimentationComponent} from "./views/acceuil-parent/alimentation/alimentation.component";







@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ParentComponent,
    ParentsComponent,
    ParentsListComponent,
    EnfantComponent,
    UserComponent,
    AcceuilParentComponent,
    CommAcceuilComponent,
    CommercantsComponent,
    CommercantComponent,
    StoreComponent,
    StoresComponent,
    HistoriqueComponent,
    ParenteditComponent,
    ParentaddComponent,
    AccueilCommercantComponent,
    AlimentationComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DashboardModule,
    LoginRoutingModule,
    HttpClientModule,
    FormsModule,
    LayoutModule,


    RouterModule.forRoot([
      { path: 'KidsPay/Aceuilparent/AlimentationCompte', component: AlimentationComponent },
      { path: 'KidsPay/Aceuilparent/Historique', component: HistoriqueComponent },
      { path: 'KidsPay/AceuilAdmin/commercants', component: CommercantsComponent },
      { path: 'KidsPay/AceuilComerçant', component: AccueilCommercantComponent },
      { path: 'KidsPay/Aceuilparent', component: AcceuilParentComponent },
      { path: 'KidsPay/AceuilAdmin/parents', component: ParentsComponent },
      { path: 'KidsPay/AceuilAdmin/parents/update', component: ParenteditComponent },
      { path: 'KidsPay/AceuilAdmin/parents/add', component: ParentaddComponent },
      { path: 'KidsPay/AceuilAdmin/parents/enfants', component: EnfantComponent },
      { path: 'KidsPay/AceuilAdmin', component: DashboardComponent }
    ])

  ],
  providers: [ParentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
