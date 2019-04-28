import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommercantsComponent } from './All-Views/commercants/commercants.component';
import { CommercantComponent } from './All-Views/commercants/commercant/commercant.component';
import { StoresComponent } from './All-Views/stores/stores.component';
import { StoreComponent } from './All-Views/stores/store/store.component';
import { StoreEditComponent } from './All-Views/stores/store/storeEdit.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AdminLayoutComponent2 } from './layouts/admin-layout2/admin-layout.component2';
import { CommercantEditComponent } from './All-Views/commercants/commercant/commercantEdit.component';
import { CodesComponent } from './All-Views/Codes/codes/codes.component';


const routes: Routes = [
  {path: '', redirectTo: 'KidsPay/login', pathMatch: 'full'},
  {path: 'KidsPay/AceuilAdmin/commercants', component: CommercantsComponent},
  {path: 'KidsPay/AceuilAdmin/commercant', children: [
      {path: '', component: CommercantComponent},
      {path: 'edit/:id', component: CommercantEditComponent}
    ]},
  {path: 'KidsPay/AceuilAdmin/stores', component: StoresComponent},
  {path: 'KidsPay/AceuilAdmin/store', children: [
      {path: '', component: StoreComponent},
      {path: 'edit/:id', component: StoreEditComponent}
    ]},
  {
    path: 'KidsPay/AceuilComerçant',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
      }]},
      {
        path: 'KidsPay/Aceuilcommercant/Historique',
        component: AdminLayoutComponent,
        children: [
          {
            path: '',
            loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
          }]},
      {path: 'KidsPay/AceuilAdmin/codes', component: CodesComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
