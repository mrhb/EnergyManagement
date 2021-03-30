import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SideBarComponent } from './side-bar/side-bar.component';
import { BaseLineComponent } from './base-line/base-line.component';
import { EnergyLabelComponent } from './energy-label/energy-label.component';
import { MainPanelComponent } from './main-panel/main-panel.component';
import { EnergyConsumptionComponent } from './bills/energy/features/energyConsumption/energyConsumption.component';
import { EnergyAmountComponent } from './bills/energy/features/energyAmount/energyAmount.component';
import { GasAmountComponent } from './bills/gas/features/gasAmount/gasAmount.component';
import { GasConsumptionComponent } from './bills/gas/features/gasConsumption/gasConsumption.component';
import { PowerAmountComponent } from './bills/power/features/powerAmount/powerAmount.component';
import { PowerConsumptionComponent } from './bills/power/features/powerConsumption/powerConsumption.component';
import { WaterAmountComponent } from './bills/water/features/waterAmount/waterAmount.component';
import { WaterConsumptionComponent } from './bills/water/features/waterConsumption/waterConsumption.component';
import { GasAmounValidComponent } from './validation/gas/features/gasAmounValid/gasAmounValid.component';
import { GasConsValidComponent } from './validation/gas/features/gasConsValid/gasConsValid.component';
import { PowerAmounValidComponent } from './validation/power/features/powerAmounValid/powerAmounValid.component';
import { PowerConsValidComponent } from './validation/power/features/powerConsValid/powerConsValid.component';
import { InstrumConsumptionComponent } from './instruments/features/instrumConsumption/instrumConsumption.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PowerSubscriptionAnalysisComponent } from './suscriptions/features/power-subscription-analysis/power-subscription-analysis.component';
import { GasSubscriptionAnalysisComponent } from './suscriptions/features/gas-subscription-analysis/gas-subscription-analysis.component';
import { CostConsumptionAnalysisComponent } from './bills/features/cost-consumption-analysis/cost-consumption-analysis.component';

const routes: Routes = [

  {
    path: '',
    component: MainPanelComponent,

    children: [
      { path: 'power-subscription-analysis',  component: PowerSubscriptionAnalysisComponent,      },
      { path: 'gas-subscription-analysis',    component: GasSubscriptionAnalysisComponent,    }, 
      { path: 'cost-consumption-analysis',    component: CostConsumptionAnalysisComponent,    }, 
      { path: 'energyConsumption',            component: EnergyConsumptionComponent,}, 
      { path: 'energyAmount',                 component: EnergyAmountComponent,}, 
      { path: 'gasConsumption',               component: GasConsumptionComponent,}, 
      { path: 'gasAmount',                    component: GasAmountComponent,}, 
      { path: 'powerConsumption',             component: PowerConsumptionComponent,}, 
      { path: 'powerAmount',                  component: PowerAmountComponent,}, 
      { path: 'waterConsumption',             component: WaterConsumptionComponent,}, 
      { path: 'waterAmount',                  component: WaterAmountComponent,}, 
      { path: 'gasConsValid',                 component: GasConsValidComponent,}, 
      { path: 'gasAmounValid',                component: GasAmounValidComponent,}, 
      { path: 'powerConsValid',               component: PowerConsValidComponent,}, 
      { path: 'powerAmounValid',              component: PowerAmounValidComponent,}, 
      { path: 'instrumConsumption',           component: InstrumConsumptionComponent,}, 
      { path: 'dashboard',                    component: DashboardComponent,}, 
      {       
        path: 'main',       
        component: SideBarComponent,
      },
      {
        path: 'baseLine',
        component: BaseLineComponent,
      },
      {
        path: 'energyLabel',
        component: EnergyLabelComponent,
      }, 
    ]
  }
  
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnalysisRoutingModule { }
