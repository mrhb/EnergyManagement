import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideBarComponent } from './side-bar/side-bar.component';
import { AnalysisRoutingModule } from './analysis-routing.module';
import { SubscriptionComponent } from './subscription/subscription.component';
import { BaseLineComponent } from './base-line/base-line.component';
import { EnergyLabelComponent } from './energy-label/energy-label.component';



@NgModule({
  declarations: [ SideBarComponent, SubscriptionComponent, BaseLineComponent, EnergyLabelComponent],
  imports: [
    CommonModule,
    AnalysisRoutingModule,
  ]
})
export class AnalysisModule { }
