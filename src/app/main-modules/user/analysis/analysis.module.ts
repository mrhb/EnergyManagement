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
import { StateService } from './state.service';
import { VoltagComponent } from './suscriptions/power/features/voltag/voltag.component';
import { DemandComponent } from './suscriptions/power/features/demand/demand.component';
import { DemandSumComponent } from './suscriptions/power/features/demandSum/demandSum.component';
import { TariffComponent } from './suscriptions/power/features/tariff/tariff.component';
import { ReactiveComponent } from './suscriptions/power/features/reactive/reactive.component';
import { DamandPenaltyComponent } from './suscriptions/power/features/damandPenalty/damandPenalty.component';
import { CapacityComponent } from './suscriptions/gas/features/capacity/capacity.component';


@NgModule({
  declarations: [ SideBarComponent, SubscriptionComponent, BaseLineComponent, EnergyLabelComponent, 
    MainPanelComponent, ChartPanelComponent, VoltagComponent, DemandComponent, DemandSumComponent, 
    TariffComponent,ReactiveComponent,DamandPenaltyComponent,CapacityComponent],
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
