import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BillComponent } from './bill/bill.component';
import { BuildingComponent } from './building/building.component';
import { InstrumentComponent } from './instrument/instrument.component';
import { ManagementComponent } from './management.component';


const routes: Routes = [
  { path: 'management', component: ManagementComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class ManagementRoutingModule { }
