import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './views/login/login/login.component';
import { DashboardModule } from './views/dashboard/dashboard.module';
import { LoginRoutingModule } from './views/login--rounting/login--rounting.module';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { DashboardComponent } from './views/dashboard/dashboard/dashboard.component';
import { ParentsListComponent } from './All-Views/parents/parents-list/parents-list.component';
import { ParentsComponent } from './All-Views/parents/parents.component';
import { ParentComponent } from './All-Views/parents/parent/parent.component';
import { ParentService } from './Services/parent.service';
import { FormsModule } from '@angular/forms';
import { EnfantComponent } from './All-Views/enfant/enfant.component';
import { UserComponent } from './All-Views/user/user.component';
import { AcceuilParentComponent } from './views/acceuil-parent/acceuil-parent.component';
import { CommAcceuilComponent } from './views/comm-acceuil/comm-acceuil.component';
import { CommercantsComponent } from './All-Views/commercants/commercants.component';
import { CommercantComponent } from './All-Views/commercants/commercant/commercant.component';
import { LayoutModule } from './views/layout/layout.module';
import { StoreComponent } from './All-Views/stores/store/store.component';
import { StoreEditComponent } from './All-Views/stores/store/storeEdit.component';
import { StoresComponent } from './All-Views/stores/stores.component';
import { HistoriqueComponent } from './All-Views/historique/historique.component';
import { ParenteditComponent } from './All-Views/parents/parentedit/parentedit.component';
import { ParentaddComponent } from './All-Views/parents/parentadd/parentadd.component';
import { AccueilCommercantComponent } from './views/accueil-commercant/accueil-commercant.component';
import { HistoriqueMagazinComponent } from './All-Views/historique-magazin/historique-magazin.component';
import {AlimentationComponent} from './views/acceuil-parent/alimentation/alimentation.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTabsModule} from '@angular/material/tabs';
import {CommonModule, HashLocationStrategy, LocationStrategy} from '@angular/common';
import { NgbdDatepickerPopupComponent } from './components/ngbd-datepicker-popup/ngbd-datepicker-popup.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AcceuilHomeComponent } from './views/acceuil-home/acceuil-home.component';
import { ProfileUpdateComponent } from './views/profile-update/profile-update.component';
import { AngularFireModule } from '@angular/fire';
import {AngularFireStorage, AngularFireStorageModule} from '@angular/fire/storage';
import { environment } from '../environments/environment';
import {AngularFirestore, AngularFirestoreModule, FirestoreSettingsToken} from '@angular/fire/firestore';
import {FlexLayoutModule} from '@angular/flex-layout';
import {AngularFireDatabaseModule} from '@angular/fire/database-deprecated';
import { EnfantUpdateComponent } from './views/enfant-update/enfant-update.component';
import {EnfantService} from './Services/enfant.service';
import {MatTooltipModule} from '@angular/material';
import {ChartistModule} from 'ng-chartist';
import { StatComponent } from './views/stat/stat.component';
import {AdminLayoutComponent} from './layouts/admin-layout/admin-layout.component';
import {AdminLayoutComponent2} from './layouts/admin-layout2/admin-layout.component2';

import {FooterComponent} from './components/footer/footer.component';
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {ComponentsModule} from './components/components.module';
import { CommercantEditComponent } from './All-Views/commercants/commercant/commercantEdit.component';
import { CodesComponent } from './All-Views/Codes/codes/codes.component';
import { DetailCommandeComponent } from './All-Views/detail-commande/detail-commande.component';
import { TestreponsiveComponent } from './All-Views/testreponsive/testreponsive.component';
import { ErreurpageComponent } from './All-Views/erreurpage/erreurpage.component';
import { AlimentationuserComponent } from './All-Views/alimentationuser/alimentationuser.component';
import {NgxPaginationModule} from 'ngx-pagination'


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
    CommercantEditComponent,
    StoreComponent,
    StoreEditComponent,
    StoresComponent,
    HistoriqueComponent,
    ParenteditComponent,
    ParentaddComponent,
    AccueilCommercantComponent,
    HistoriqueMagazinComponent,
    AlimentationComponent,
    NgbdDatepickerPopupComponent,
    AcceuilHomeComponent,
    ProfileUpdateComponent,
    EnfantUpdateComponent,
    StatComponent,
    AdminLayoutComponent,
    AdminLayoutComponent2,
    FooterComponent,
    SidebarComponent,
    NavbarComponent,
    CodesComponent,
    DetailCommandeComponent,
    TestreponsiveComponent,
    ErreurpageComponent,
    AlimentationuserComponent,

  ],
  imports: [
    NgxPaginationModule,
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
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule.enablePersistence(),
    AngularFirestoreModule,
    FlexLayoutModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    MatTooltipModule,
    ChartistModule,
    NgbModule,





    
    RouterModule.forRoot([
      { path: 'KidsPay/Aceuilparent/Historique/Commandedetail', component: DetailCommandeComponent },
      { path: 'KidsPay/Aceuilparent/stat', component: StatComponent },
      { path: 'KidsPay/Aceuilparent/updateenfant', component: EnfantUpdateComponent },
      { path: 'KidsPay/Aceuilparent/updateprofile', component: ProfileUpdateComponent },
      { path: 'KidsPay/Acceuil', component: AcceuilHomeComponent },
      { path: 'KidsPay/Aceuilparent/AlimentationCompte', component: AlimentationComponent },
      { path: 'KidsPay/Aceuilparent/Historique', component: HistoriqueComponent },
      { path: 'KidsPay/AceuilAdmin/commercants', component: CommercantsComponent },
      { path: 'KidsPay/Aceuilparent', component: AcceuilParentComponent },
      { path: 'KidsPay/AceuilAdmin/parents', component: ParentsComponent },
      { path: 'KidsPay/AceuilAdmin/parents/update', component: ParenteditComponent },
      { path: 'KidsPay/AceuilAdmin/parents/add', component: ParentaddComponent },
      { path: 'KidsPay/AceuilAdmin/parents/enfants', component: EnfantComponent },
      { path: 'KidsPay/AceuilAdmin', component: DashboardComponent },
      { path: 'KidsPay/test', component: TestreponsiveComponent },
      { path: 'KidsPay/Erreur', component: ErreurpageComponent },
      { path: 'KidsPay/Aceuilparent/AlimenterParent', component: AlimentationuserComponent },
    ])

  ],
  providers: [ParentService,  AngularFireStorage],
  bootstrap: [AppComponent]
})
export class AppModule { }
