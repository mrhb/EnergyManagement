import { Component, OnInit } from '@angular/core';
import { Moment } from 'src/app/shared/tools/moment';

@Component({
  selector: 'app-base-line',
  templateUrl: './base-line.component.html',
  styleUrls: ['./base-line.component.scss']
})
export class BaseLineComponent implements OnInit {
  options;
  options2: any;
  moment = Moment;



  constructor() {
    const chartData = [
      {
        eGaz: 80,
        eAct: 40,
        date: '2020-05-12T12:19:00+00:00'
      },
      {
        // value: 50,
        eGaz: 60,
        eAct: 90,
        date: '2020-05-14T12:19:00+00:00'
      },
      {
        eGaz: 12,
        eAct: 37,
        date: '2020-05-16T12:19:00+00:00'
      },
      {
        eGaz: 55,
        eAct: 15,
        date: '2020-05-18T12:19:00+00:00'
      },
      {
        eGaz: 60,
        eAct: 90,
        date: '2020-05-20T12:19:00+00:00'
      },
      {
        eGaz: 99,
        eAct: 90,
        date: '2020-05-22T12:19:00+00:00'
      },
      {
        eGaz: 60,
        eAct: 55,
        date: '2020-05-24T12:19:00+00:00'
      },
      {
        eGaz: 12,
        eAct: 90,
        date: '2020-05-26T12:19:00+00:00'
      },
      {
        eGaz: 55,
        eAct: 90,
        date: '2020-05-28T12:19:00+00:00'
      },
      {
        eGaz: 66,
        eAct: 99,
        date: '2020-05-30T12:19:00+00:00'
      },
      {
        eGaz: 40,
        eAct: 85,
        date: '2020-06-01T12:19:00+00:00'
      },
      {
        eGaz: 60,
        eAct: 90,
        date: '2020-06-03T12:19:00+00:00'
      },
      {
        eGaz: 10,
        eAct: 30,
        date: '2020-06-05T12:19:00+00:00'
      },
      {
        eGaz: 30,
        eAct: 80,
        date: '2020-06-07T12:19:00+00:00'
      },
      {
        eGaz: 50,
        eAct: 30,
        date: '2020-06-08T12:19:00+00:00'
      },
      {
        eGaz: 60,
        eAct: 20,
        date: '2020-06-11T12:19:00+00:00'
      },
      {
        eGaz: 60,
        eAct: 80,
        date: '2020-06-14T12:19:00+00:00'
      },
      {
        eGaz: 87,
        eAct: 35,
        date: '2020-06-15T12:19:00+00:00'
      },
    ];
    const xAxisData = [];
    const eGaz = [];
    const eAct = [];

    const length = chartData.length;
    for (let i = 0; i < length; i++) {
      // xAxisData.push(this.moment.getJaliliDateFromIso(chartData[i].date));
      xAxisData.push(this.moment.getJaliliDateFromIso(chartData[i].date));
      console.log('chartData[i]', chartData[i]);
      eGaz.push(chartData[i].eGaz);
      eAct.push(chartData[i].eAct);
    }


    this.options = {
      legend: {
        data: ['گاز', 'eAct'],
        align: 'left',
      },
      tooltip: {},
      xAxis: {
        data: xAxisData,
        silent: false,
        splitLine: {
          show: true,
        },
      },
      yAxis: {},
      series: [
        {
          name: 'گاز',
          type: 'bar',
          data: eGaz,
          animationDelay: (idx) => idx * 10,
        },
        {
          name: 'eAct',
          type: 'bar',
          data: eAct,
          animationDelay: (idx) => idx * 10 + 100,
        },
      ],
      animationEasing: 'elasticOut',
      animationDelayUpdate: (idx) => idx * 5,
    };
  
    this.options2 = {
      legend: {
        data: ['گاز', 'eAct'],
        align: 'left',
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        },
      },
      xAxis: {
        data: xAxisData,
        silent: false,
        splitLine: {
          show: true,
        },
      },
      yAxis: {},
      series: [
        {
          name: 'گاز',
          type: 'line',
          data: eGaz,
          animationDelay: (idx) => idx * 10,
        },
        {
          name: 'eAct',
          type: 'line',
          data: eAct,
          animationDelay: (idx) => idx * 10 + 100,
        },
      ],
      animationEasing: 'elasticOut',
      animationDelayUpdate: (idx) => idx * 5,
    };
   }

  ngOnInit(): void {
  }

}
