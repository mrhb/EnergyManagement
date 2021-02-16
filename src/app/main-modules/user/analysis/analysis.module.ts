import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideBarComponent } from './side-bar/side-bar.component';
import { AnalysisRoutingModule } from './analysis-routing.module';
import { SubscriptionComponent } from './subscription/subscription.component';



@NgModule({
  declarations: [ SideBarComponent, SubscriptionComponent],
  imports: [
    CommonModule,
    AnalysisRoutingModule,
  ]
})
export class AnalysisModule { }
