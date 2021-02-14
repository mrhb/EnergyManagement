import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ChartComponent} from './feature/chart.component';
import { BarChartComponent } from './feature/barChart/bar-chart.component';



@NgModule({
  declarations: [ChartComponent, BarChartComponent],
  imports: [
    CommonModule
  ],
  exports: [
    ChartComponent
  ]
})
export class ChartModule { }
