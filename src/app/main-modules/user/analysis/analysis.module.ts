import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideBarComponent } from './side-bar/side-bar.component';
import { AnalysisRoutingModule } from './analysis-routing.module';
import { SubscriptionComponent } from './subscription/subscription.component';
import { BaseLineComponent } from './base-line/base-line.component';
import { EnergyLabelComponent } from './energy-label/energy-label.component';
import {NgxEchartsModule} from 'ngx-echarts';
import { MainPanelComponent } from './main-panel/main-panel.component';
import { RegionModule } from 'src/app/base-modules/region/region.module';



@NgModule({
  declarations: [ SideBarComponent, SubscriptionComponent, BaseLineComponent, EnergyLabelComponent, MainPanelComponent],
  imports: [
    CommonModule,
    AnalysisRoutingModule,
    RegionModule,
    NgxEchartsModule
  ]
})
export class AnalysisModule { }
