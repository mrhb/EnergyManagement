import { ChartOptions } from "chart.js";

export enum PeriodEnum {
  MONTHLY = <any> 'ماهانه',
  DAILY = <any> 'روزانه',
}

export enum EffectiveParameterEnum {
  HDD = <any> 'HDD',
  CDD = <any> 'CDD',
}

export enum chartTypeEnum {
  LINEAR = <any> 'خطی',
  BAR = <any> 'میله ای',
}

export enum CategoryEnum {
  LINE,//خطی
  BAR,// میله ای ساده
  COMBAR,//  میله ای تجمعی
  PIE,// 
}

export const OPTIONS: ChartOptions = {
  responsive: true, 
  title: {
  display: false,
  text: 'Unit 1'
  },
  elements:{
    point:{
      radius:0
    }
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
                    round: 'minute',
                    tooltipFormat: 'll HH:mm'
                  },
                scaleLabel: {
                      display: true,
                      labelString: 'Time'
                  },
                  ticks: {
                        maxRotation: 45
                    }
                }],
                yAxes: [{
                  scaleLabel: {
                        display: true,
                        //labelString: 'Power(Kw)'
                        
                    },
                    ticks: {
                        // suggestedMin: 0,    // minimum will be 0, unless there is a lower value.
                        // OR //
                        beginAtZero: true   // minimum value will be 0.
                    }
                }
            ]
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
