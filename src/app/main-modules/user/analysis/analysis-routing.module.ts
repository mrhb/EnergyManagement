import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SubscriptionComponent } from './subscription/subscription.component';
import { SideBarComponent } from './side-bar/side-bar.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'main',
  },
  {
    path: 'main',
    component: SideBarComponent,
  },
  
  {
    path: 'subscription',
    component: SubscriptionComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnalysisRoutingModule { }
