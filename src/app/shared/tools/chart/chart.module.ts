import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ChartComponent} from './feature/chart.component';
import { BarChartComponent } from './feature/barChart/bar-chart.component';
import {NgxEchartsModule} from 'ngx-echarts';



@NgModule({
  declarations: [ChartComponent, BarChartComponent],
    imports: [
        CommonModule,
        NgxEchartsModule.forRoot({
          /**
           * This will import all modules from echarts.
           * If you only need custom modules,
           * please refer to [Custom Build] section.
           */
          echarts: () => import('echarts'), // or import('./path-to-my-custom-echarts')
        }),
    ],
  exports: [
    ChartComponent
  ]
})
export class ChartModule { }
