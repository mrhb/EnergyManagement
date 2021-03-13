import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SubscriptionComponent } from './subscription/subscription.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { BaseLineComponent } from './base-line/base-line.component';
import { EnergyLabelComponent } from './energy-label/energy-label.component';
import { MainPanelComponent } from './main-panel/main-panel.component';

const routes: Routes = [

  {
    path: '',
    component: MainPanelComponent,

    children: [
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
      {
        path: 'subscription',
        component: SubscriptionComponent,
      },   
    ]
  }
  
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnalysisRoutingModule { }
