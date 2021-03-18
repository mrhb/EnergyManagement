import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { Backgrounds, Borders } from './ColorGenerator';

@Component({
  selector: 'analysis-chart-panel',
  templateUrl: './chart-panel.component.html',
  styleUrls: ['./chart-panel.component.scss']
})
export class ChartPanelComponent implements OnInit {

  lineChartData: ChartDataSets[] = [
    { data: [85, 72, 78, 75, 77, 75], label: 'Crude oil prices' },
    { data: [67, 23, 96, 13, 88, 43], label: 'jhghjg' },
  ];

  lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June'];

  lineChartOptions = {
    responsive: true,
  };
  public ChartOptions: ChartOptions = {
    responsive: true, 
    title: {
    display: false,
    text: 'Unit 1'
    },

    tooltips: {
        mode: 'index',
        intersect: false,
        callbacks: {
          label: function(tooltipItem, data) {
              return  Number(tooltipItem.yLabel).toFixed(2).replace(/./g, function(c, i, a) {
                  return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "," + c : c;
              });
          }
        }
    },
    scales: {
          xAxes: [{
                type: 'time',
                time: {
                      parser: 'MM/DD/YYYY HH:mm:ss',
                      // round: 'minute',
                      tooltipFormat: 'll HH:mm:ss'
                  },
                  scaleLabel: {
                        display: true,
                        labelString: ''
                    },
                    ticks: {
                          maxRotation: 0
                      }
                  }],
          yAxes: [{
                scaleLabel: {
                      display: true,
                      //labelString: 'Power(Kw)'
                  }
              }]
    },
    plugins: {
          zoom: {
            // Container for pan options
                pan: {
                  // Boolean to enable panning
                  enabled: true,

                  // Panning directions. Remove the appropriate direction to disable
                  // Eg. 'y' would only allow panning in the y direction
                  // A function that is called as the user is panning and returns the
                  // available directions can also be used:
                  //   mode: function({ chart }) {
                  //     return 'xy';
                  //   },
                  mode: 'x',

                  rangeMin: {
                    // Format of min pan range depends on scale type
                    x: null,
                    y: null
                  },
                  rangeMax: {
                    // Format of max pan range depends on scale type
                    x: null,
                    y: null
                  },

                  // On category scale, factor of pan velocity
                  speed: 20,

                  // Minimal pan distance required before actually applying pan
                  threshold: 10,

                  // Function called while the user is panning
                  onPan: function({chart}) { console.log(`I'm panning!!!`); },
                  // Function called once panning is completed
                  onPanComplete: function({chart}) { console.log(`I was panned!!!`); }
                },
                zoom: {
                      enabled: true,
                      // Enable drag-to-zoom behavior
                      drag: false,
                      mode: 'x',
                      speed: 0.1
                  }
              }
    }
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
  lineChartType = 'line';
  constructor() { }

  ngOnInit(): void {
  }

}
