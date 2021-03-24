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
import { VoltagComponent } from './suscriptions/power/features/voltag/voltag.component';
import { DemandComponent } from './suscriptions/power/features/demand/demand.component';
import { DemandSumComponent } from './suscriptions/power/features/demandSum/demandSum.component';
import { TariffComponent } from './suscriptions/power/features/tariff/tariff.component';
import { ReactiveComponent } from './suscriptions/power/features/reactive/reactive.component';
import { DamandPenaltyComponent } from './suscriptions/power/features/damandPenalty/damandPenalty.component';
import { CapacityComponent } from './suscriptions/gas/features/capacity/capacity.component';
import { GasDemandComponent } from './suscriptions/gas/features/gasDemand/gasDemand.component';
import { GasTypeComponent } from './suscriptions/gas/features/gasType/gasType.component';
import { ValveSizeComponent } from './suscriptions/gas/features/valveSize/valveSize.component';
import { EnergyConsumptionComponent } from './bills/energy/features/energyConsumption/energyConsumption.component';
import { EnergyAmountComponent } from './bills/energy/features/energyAmount/energyAmount.component';
import { GasConsumptionComponent } from './bills/gas/features/gasConsumption/gasConsumption.component';
import { GasAmountComponent } from './bills/gas/features/gasAmount/gasAmount.component';
import { PowerConsumptionComponent } from './bills/power/features/powerConsumption/powerConsumption.component';
import { PowerAmountComponent } from './bills/power/features/powerAmount/powerAmount.component';
import { WaterConsumptionComponent } from './bills/water/features/waterConsumption/waterConsumption.component';
import { WaterAmountComponent } from './bills/water/features/waterAmount/waterAmount.component';
import { GasAmounValidComponent } from './validation/gas/features/gasAmounValid/gasAmounValid.component';
import { GasConsValidComponent } from './validation/gas/features/gasConsValid/gasConsValid.component';
import { PowerAmounValidComponent } from './validation/power/features/powerAmounValid/powerAmounValid.component';
import { PowerConsValidComponent } from './validation/power/features/powerConsValid/powerConsValid.component';
import { InstrumConsumptionComponent } from './instruments/features/instrumConsumption/instrumConsumption.component';

@NgModule({
  declarations: [ SideBarComponent,BaseLineComponent, EnergyLabelComponent, 
    MainPanelComponent, ChartPanelComponent, VoltagComponent, DemandComponent, DemandSumComponent, 
    TariffComponent,ReactiveComponent,DamandPenaltyComponent,CapacityComponent,GasDemandComponent,
    GasTypeComponent,ValveSizeComponent,EnergyConsumptionComponent,EnergyAmountComponent,GasConsumptionComponent,
    GasAmountComponent,PowerConsumptionComponent, PowerAmountComponent,WaterConsumptionComponent,
    WaterAmountComponent,GasConsValidComponent, GasAmounValidComponent,PowerConsValidComponent, 
    PowerAmounValidComponent, InstrumConsumptionComponent],
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
