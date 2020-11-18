import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { BillComponent } from './management/bill/bill.component';
import { ManagementComponent } from './management/management.component';


const routes: Routes = [
  { path: 'main', component: MainComponent },
  { path: 'management', component: ManagementComponent,
  children: [
    {
      path:  'bill',
      component:  BillComponent
      }]
     },
  { path: '', redirectTo: 'main', pathMatch: 'full' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
