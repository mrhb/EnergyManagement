import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideBarComponent } from './side-bar/side-bar.component';
import { AnalysisRoutingModule } from './analysis-routing.module';
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

import { InstrumConsumptionComponent } from './instruments/features/instrumConsumption/instrumConsumption.component';
import { PipeModule } from 'src/app/shared/tools/pipe-module';
import { PowerSubscriptionAnalysisComponent } from './suscriptions/features/power-subscription-analysis/power-subscription-analysis.component';
import { GasSubscriptionAnalysisComponent } from './suscriptions/features/gas-subscription-analysis/gas-subscription-analysis.component';
import { CostConsumptionAnalysisComponent } from './bills/features/cost-consumption-analysis/cost-consumption-analysis.component';
import { ValidationAnalysisComponent } from './bills/features/validation-analysis/validation-analysis.component';
import { PaginatorModule } from 'src/app/shared/paginator/paginator.module';

@NgModule({
  declarations: [ SideBarComponent,BaseLineComponent, EnergyLabelComponent, 
    MainPanelComponent, ChartPanelComponent, InstrumConsumptionComponent, 
    PowerSubscriptionAnalysisComponent, GasSubscriptionAnalysisComponent, 
    CostConsumptionAnalysisComponent, ValidationAnalysisComponent],
  imports: [
    CommonModule,
    PipeModule,
    AnalysisRoutingModule,
    RegionModule,
    ChartsModule,
    ChartModule,
    ReactiveFormsModule,
    AlertErrorModule,
    FormsModule,
    PaginatorModule,

  ],
  providers: [StateService]
})
export class AnalysisModule { }
