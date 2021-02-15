import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideBarComponent } from './side-bar/side-bar.component';
import { AnalysisRoutingModule } from './analysis-routing.module';



@NgModule({
  declarations: [ SideBarComponent],
  imports: [
    CommonModule,
    AnalysisRoutingModule,
  ]
})
export class AnalysisModule { }
