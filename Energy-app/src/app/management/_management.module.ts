import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InstrumentComponent } from './instrument/instrument.component';
import { BuildingComponent } from './building/building.component';
import { BillComponent } from './bill/bill.component';
import { ManagementRoutingModule } from './management-routing.module';
import { BrowserModule } from '@angular/platform-browser';



@NgModule({
  declarations: [
    BillComponent,
    BuildingComponent,
    InstrumentComponent
  ],
  imports: [
    BrowserModule,
    ManagementRoutingModule,
    CommonModule
  ]
})
export class ManagementModule { }
