import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login.component';
import { MainComponent } from './main/main.component';
import { BillComponent } from './management/bill/bill.component';
import { BuildingComponent } from './management/building/building.component';
import { InstrumentComponent } from './management/instrument/instrument.component';
import { ManagementComponent } from './management/management.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'main', component: MainComponent },
  { path: 'management', component: ManagementComponent,
    children: [
      {path:  'bill',component:  BillComponent},
      {path:  'building',component:  BuildingComponent},
      {path:  'instrument',component:InstrumentComponent},
    ]
     },
  // { path: '', redirectTo: 'main', pathMatch: 'full' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
