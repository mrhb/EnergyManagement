import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideBarComponent } from './side-bar/side-bar.component';
import { AnalysisRoutingModule } from './analysis-routing.module';
import { SubscriptionComponent } from './subscription/subscription.component';
import { BaseLineComponent } from './base-line/base-line.component';
import { EnergyLabelComponent } from './energy-label/energy-label.component';
import { MainPanelComponent } from './main-panel/main-panel.component';
import { RegionModule } from 'src/app/base-modules/region/region.module';
import { ChartModule } from 'src/app/shared/tools/chart/chart.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertErrorModule } from 'src/app/shared/tools/alert-error/alert-error.module';
import { ChartPanelComponent } from './chart-panel/chart-panel.component';
import { ChartsModule } from 'ng2-charts';
import { DemandComponent } from './suscriptions/power/features/demand/demand.component';
import { StateService } from './state.service';



@NgModule({
  declarations: [ SideBarComponent, SubscriptionComponent, BaseLineComponent, EnergyLabelComponent, MainPanelComponent, ChartPanelComponent, DemandComponent],
  imports: [
    CommonModule,
    AnalysisRoutingModule,
    RegionModule,
    ChartsModule,
    ChartModule,
    ReactiveFormsModule,
    AlertErrorModule,
    FormsModule,
  ],
  providers: [StateService]
})
export class AnalysisModule { }
