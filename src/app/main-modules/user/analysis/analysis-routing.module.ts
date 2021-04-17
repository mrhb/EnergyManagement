import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SideBarComponent } from './side-bar/side-bar.component';
import { BaseLineComponent } from './base-line/base-line.component';
import { EnergyLabelComponent } from './energy-label/energy-label.component';
import { MainPanelComponent } from './main-panel/main-panel.component';

import { InstrumConsumptionComponent } from './instruments/features/instrumConsumption/instrumConsumption.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PowerSubscriptionAnalysisComponent } from './suscriptions/features/power-subscription-analysis/power-subscription-analysis.component';
import { GasSubscriptionAnalysisComponent } from './suscriptions/features/gas-subscription-analysis/gas-subscription-analysis.component';
import { CostConsumptionAnalysisComponent } from './bills/features/cost-consumption-analysis/cost-consumption-analysis.component';
import { ValidationAnalysisComponent } from './bills/features/validation-analysis/validation-analysis.component';

const routes: Routes = [

  {
    path: '',
    component: MainPanelComponent,

    children: [
      { path: 'power-subscription-analysis',  component: PowerSubscriptionAnalysisComponent,      },
      { path: 'gas-subscription-analysis',    component: GasSubscriptionAnalysisComponent,    }, 
      { path: 'cost-consumption-analysis',    component: CostConsumptionAnalysisComponent,    }, 
      { path: 'validation-analysis',          component: ValidationAnalysisComponent,    }, 
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
