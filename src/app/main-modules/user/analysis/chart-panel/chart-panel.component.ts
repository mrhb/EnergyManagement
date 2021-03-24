import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { SeriesInfo } from '../model/chart';
import { CategoryEnum } from '../model/chartEnum';
import { Backgrounds, Borders } from './ColorGenerator';

@Component({
  selector: 'analysis-chart-panel',
  templateUrl: './chart-panel.component.html',
  styleUrls: ['./chart-panel.component.scss']
})
export class ChartPanelComponent implements OnInit {
  @Input() category: CategoryEnum=CategoryEnum.LINE;
  @Input()
  set seriesInput(input: SeriesInfo) {
    this.lineChartData =input.series.map(i=>
      {
        return{data:i.data, label:i.name}
      });
    this.lineChartLabels=input.labels;

  }
  @Input() labels: string[]= ['January', 'February', 'March', 'April', 'May', 'June'];
  lineChartData: ChartDataSets[] =
   [
    { data: [85, 72, 78, 75, 77, 75], label: 'Crude oil prices' },
    { data: [67, 23, 96, 13, 88, 43], label: 'jhghjg' },
  ];

  lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June'];

  lineChartOptions:any = {
    responsive: true,
  };
 
  lineChartColors: Color[] = [
    {
       borderColor: Borders[1],
       backgroundColor:Backgrounds[1],
    },
    {
      borderColor: Borders[2],
      backgroundColor:Backgrounds[2],
   },
   {
    borderColor: Borders[3],
    backgroundColor:Backgrounds[3],
 },
  ];

  lineChartLegend = true;
  lineChartPlugins = [];


  lineChartType: ChartType = 'bar';
  pieChartType: ChartType = 'pie';

  constructor() { 
  }
  
  // ngOnChanges(changes: SimpleChanges) {
  //   this.lineChartData=(changes.series.currentValue as Series[]).map(i=>
  //     {
  //       return{data:i.data, label:i.name}
  //     });
  // }
  ngOnInit(): void {
    switch (this.category.toString())
    {
      case 'LINE' :
        this.lineChartType = 'line';
        break;
        
      case 'BAR':
        this.lineChartType = 'bar';
        break;

      case 'STACKED_BAR':
        this.lineChartType = 'bar';
        this.lineChartOptions = {
          responsive: true,
          scales: {
              xAxes: [{
                  stacked: true
              }],
              yAxes: [{
                  stacked: true
              }]
          }
        };
        break;
      case 'PIE':
        this.pieChartType = 'pie'
      break;
         

        case 'COMBAR':
        break;
    }
  }

}
