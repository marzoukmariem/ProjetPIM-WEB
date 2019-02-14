import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommercantsComponent } from './All-Views/commercants/commercants.component';
import { CommercantComponent } from './All-Views/commercants/commercant/commercant.component';
import { StoresComponent } from './All-Views/stores/stores.component';
import { StoreComponent } from './All-Views/stores/store/store.component';

const routes: Routes = [
  {path: '', redirectTo: 'KidsPay/login', pathMatch: 'full'},
  {path: 'KidsPay/AceuilAdmin/commercants', component: CommercantsComponent},
  {path: 'KidsPay/AceuilAdmin/commercant',children:[
    {path:'',component: CommercantComponent},
    {path:'edit/:id', component:CommercantComponent}
  ]},
  {path: 'KidsPay/AceuilAdmin/stores', component: StoresComponent},
  {path: 'KidsPay/AceuilAdmin/store',children:[
    {path:'',component: StoreComponent},
    {path:'edit/:id', component:StoreComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
