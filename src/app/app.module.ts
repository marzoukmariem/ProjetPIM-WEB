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
import { HistoriqueMagazinComponent } from './All-Views/historique-magazin/historique-magazin.component';
import {AlimentationComponent} from "./views/acceuil-parent/alimentation/alimentation.component";
import {ReactiveFormsModule} from '@angular/forms'
import {MatButtonModule} from '@angular/material/button'
import {MatCardModule} from '@angular/material/card'
import {MatDatepickerModule} from '@angular/material/datepicker'
import {MatIconModule} from '@angular/material/icon'
import {MatInputModule} from '@angular/material/input'
import {MatMomentDateModule} from '@angular/material-moment-adapter'
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {MatTabsModule} from '@angular/material/tabs'
import {CommonModule} from '@angular/common';
import { NgbdDatepickerPopupComponent } from './components/ngbd-datepicker-popup/ngbd-datepicker-popup.component'
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MatTooltipModule} from '@angular/material/tooltip';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { ComponentsModule } from './components/components.module';


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
    HistoriqueMagazinComponent,
    AlimentationComponent,
    NgbdDatepickerPopupComponent,
    AdminLayoutComponent,
    
  ],
  imports: [
    NgbModule,
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    DashboardModule,
    LoginRoutingModule,
    HttpClientModule,
    FormsModule,
    LayoutModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatIconModule,
    MatMomentDateModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatTooltipModule,
    ComponentsModule,
    RouterModule.forRoot([
      { path: 'KidsPay/Aceuilparent/AlimentationCompte', component: AlimentationComponent },
      { path: 'KidsPay/Aceuilparent/Historique', component: HistoriqueComponent },
      { path: 'KidsPay/AceuilAdmin/commercants', component: CommercantsComponent },
      { path: 'KidsPay/Aceuilcommercant/Historique', component: HistoriqueMagazinComponent },
      
      { path: 'KidsPay/Aceuilparent', component: AcceuilParentComponent },
      { path: 'KidsPay/AceuilAdmin/parents', component: ParentsComponent },
      { path: 'KidsPay/AceuilAdmin/parents/update', component: ParenteditComponent },
      { path: 'KidsPay/AceuilAdmin/parents/add', component: ParentaddComponent },
      { path: 'KidsPay/AceuilAdmin/parents/enfants', component: EnfantComponent },
      { path: 'KidsPay/AceuilAdmin', component: DashboardComponent },
      
    ])

  ],
  providers: [ParentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
