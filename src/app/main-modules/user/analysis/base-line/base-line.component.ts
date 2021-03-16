import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Moment } from 'src/app/shared/tools/moment';
import { ChartFilter } from '../model/chart';
import { chartTypeEnum, EffectiveParameterEnum, PeriodEnum } from '../model/chartEnum';
import Notiflix from 'notiflix';

declare var $: any;

@Component({
  selector: 'app-base-line',
  templateUrl: './base-line.component.html',
  styleUrls: ['./base-line.component.scss']
})
export class BaseLineComponent implements OnInit, AfterViewInit {
 
  moment = Moment;
  options;
  isLoadingChart = false;
  optionsOneGraph;
  optionsOneGraph2;

  optionsThreeGraph;
  optionsThreeGraph2;


  chartFilter = new ChartFilter();
  periodEnum = PeriodEnum;
  effectiveParameterEnum = EffectiveParameterEnum;
  effectiveParameterList = [];
  chartTypeEnum = chartTypeEnum;

  options2: any;


  constructor() {}

  ngOnInit(): void {

      // this.getBuildingList();
      // // $('.e-not-close a').on('click', (event) => {
      //   $(this).parent().toggleClass('open');
      // // });
  
      // $('body').on('click', (e) => {
      //   if (!$('.e-not-close').is(e.target)
      //     && $('.e-not-close').has(e.target).length === 0
      //     && $('.show').has(e.target).length === 0
      //   ) {
      //     $('.e-not-close').addClass('show');
      //   } else {
      //     $('.e-not-close').removeClass('show');
      //   }
      // });
  
      this.effectiveParameterList = Object.keys(this.effectiveParameterEnum);
  
      const currentYear = this.moment.getJDateFromIsoOnlyYear(new Date().toISOString());
      const Gregorian = this.moment.convertJaliliToGregorian(currentYear + '/1/1');
  
      this.chartFilter.fromDate = Moment.convertGregorianToIsoDate(Gregorian);
      this.chartFilter.toDate = new Date().toISOString();
      console.log('start ', this.chartFilter.fromDate);
      $('#startDate').val(this.moment.getJaliliDateFromIso(this.chartFilter.fromDate));
      $('#endDate').val(this.moment.getJaliliDateFromIso(this.chartFilter.toDate));
      this.setOption();

  }
  ngAfterViewInit(): void {
    this.jQueryDate();
  }

  jQueryDate(): void {
    setTimeout(e1 => {
      $('#startDate').MdPersianDateTimePicker({
        Placement: 'bottom', // default is 'bottom'
        Trigger: 'focus', // default is 'focus',
        targetTextSelector: '#startDate',
        disableAfterToday: false,
        disableBeforeToday: false,
      }).on('change', (e) => {
        this.chartFilter.fromDate = this.moment.convertJaliliToIsoDate($(e.currentTarget).val());
        if (this.chartFilter.fromDate > this.chartFilter.toDate) {
          setTimeout(() => {
            Notiflix.Notify.Failure('تاریخ شروع باید قبل از تاریخ پایان انتخاب شود');
            this.chartFilter.toDate = null;
            $('#endDate').val('');
          }, 200);
        }
      });
      $('#endDate').MdPersianDateTimePicker({
        Placement: 'bottom', // default is 'bottom'
        Trigger: 'focus', // default is 'focus',
        targetTextSelector: '#endDate',
        disableAfterToday: false,
        disableBeforeToday: false,
      }).on('change', (e) => {
        this.chartFilter.toDate = this.moment.convertJaliliToIsoDate($(e.currentTarget).val());
        console.log('this.chartFilter.toDate', this.chartFilter.toDate);
        if (this.chartFilter.fromDate > this.chartFilter.toDate) {
          setTimeout(() => {
            Notiflix.Notify.Failure('تاریخ وارده باید قبل از تاریخ شروع انتخاب شود');
            this.chartFilter.toDate = null;
            $('#endDate').val('');
          }, 200);
        }
      });
    }, 100);
  }

  
  getEffectiveParameterNgModel(item: any): boolean {
    const index = this.chartFilter.effectiveParameterList.findIndex(e => e === item);
    return index !== -1;
  }

  onChangeEffectiveParameter(event, item: any): void {
    const index = this.chartFilter.effectiveParameterList.findIndex(e => e === item);
    if (event.target.checked === true) {
      if (index === -1) {
        this.chartFilter.effectiveParameterList.push(item);
      } else {
        this.chartFilter.effectiveParameterList[index] = JSON.parse(JSON.stringify(item));
      }
    }
    if (event.target.checked === false) {
      if (index !== -1) {
        this.chartFilter.effectiveParameterList.splice(index, 1);
      }
    }
  }

  setOption(): void {
    this.isLoadingChart = true;
    const xAxisData = [];
    const eGaz = [];
    const eAct = [];

    const xAxisDataG2 = [];
    const HDD = [];
    const CDD = [];

    const xAxisDataG3 = [];
    const gaz = [];
    const power = [];
    const energy = [];

    const chartData = this.fakeDataGenerator(['eGaz', 'eAct', 'date'], 18);
    const length = chartData.length;
    for (let i = 0; i < length; i++) {
      // xAxisData.push(this.moment.getJaliliDateFromIso(chartData[i].date));
      xAxisData.push(this.moment.getJaliliDateFromIso(chartData[i].date));
      // console.log('chartData[i]', chartData[i]);
      eGaz.push(chartData[i].eGaz);
      eAct.push(chartData[i].eAct);
    }
    this.options = {
      legend: {
        data: ['گاز', 'eAct'],
        align: 'left',
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        textStyle: {
          color: 'rgba(255, 255, 255, 1)',
        },
        borderColor: 'rgba(0, 0, 0, 0.1)',
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
          type: 'bar',
          data: eGaz,
          smooth: true,
          showSymbol: false,
          animationDelay: (idx) => idx * 10,
        },
        {
          name: 'eAct',
          type: 'bar',
          data: eAct,
          smooth: true,
          showSymbol: false,
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
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        textStyle: {
          color: 'rgba(255, 255, 255, 1)',
        },
        borderColor: 'rgba(0, 0, 0, 0.1)',
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
      },
      yAxis: {},
      series: [
        {
          name: 'گاز',
          type: 'line',
          data: eGaz,
          smooth: true,
          areaStyle: {},
          showSymbol: false,
          animationDelay: (idx) => idx * 10,
        },
        {
          name: 'eAct',
          type: 'line',
          data: eAct,
          smooth: true,
          showSymbol: false,
          animationDelay: (idx) => idx * 10 + 100,
        },
      ],
      animationEasing: 'elasticOut',
      animationDelayUpdate: (idx) => idx * 5,
    };

    const chartDataGraph = this.fakeDataGenerator(['HDD', 'CDD', 'date'], 18);
    const lengthGraph = chartDataGraph.length;
    for (let i = 0; i < lengthGraph; i++) {
      xAxisDataG2.push(this.moment.getJaliliDateFromIso(chartDataGraph[i].date));
      CDD.push(chartDataGraph[i].CDD);
      HDD.push(chartDataGraph[i].HDD);
    }
    this.optionsOneGraph = {
      legend: {
        data: ['CDD', 'HDD'],
        align: 'left',
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        textStyle: {
          color: 'rgba(255, 255, 255, 1)',
        },
        borderColor: 'rgba(0, 0, 0, 0.1)',
      },
      xAxis: {
        data: xAxisDataG2,
        silent: false,
        splitLine: {
          show: true,
        },
      },
      yAxis: {},
      series: [
        {
          name: 'CDD',
          type: 'bar',
          data: CDD,
          smooth: true,
          animationDelay: (idx) => idx * 10,
        },
        {
          name: 'HDD',
          type: 'bar',
          data: HDD,
          smooth: true,
          animationDelay: (idx) => idx * 10 + 100,
        },
      ],
      animationEasing: 'elasticOut',
      animationDelayUpdate: (idx) => idx * 5,
    };
    this.optionsOneGraph2 = {
      legend: {
        data: ['CDD', 'HDD'],
        align: 'left',
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        textStyle: {
          color: 'rgba(255, 255, 255, 1)',
        },
        borderColor: 'rgba(0, 0, 0, 0.1)',
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        },
      },
      xAxis: {
        data: xAxisDataG2,
        type: 'category',
      },
      yAxis: {},
      series: [
        {
          name: 'CDD',
          type: 'line',
          data: CDD,
          smooth: true,
          areaStyle: {},
          showSymbol: false,
          animationDelay: (idx) => idx * 10,
        },
        {
          name: 'HDD',
          type: 'line',
          data: HDD,
          smooth: true,
          showSymbol: false,
          animationDelay: (idx) => idx * 10 + 100,
        },
      ],
      animationEasing: 'elasticOut',
      animationDelayUpdate: (idx) => idx * 5,
    };

    const chartDataGraph2 = this.fakeDataGenerator(['gaz', 'power', 'energy', 'date'], 18);
    const lengthGraph2 = chartDataGraph2.length;
    for (let i = 0; i < lengthGraph2; i++) {
      xAxisDataG3.push(this.moment.getJaliliDateFromIso(chartDataGraph2[i].date));
      power.push(chartDataGraph2[i].power);
      gaz.push(chartDataGraph2[i].gaz);
      energy.push(chartDataGraph2[i].energy);
    }
    this.optionsThreeGraph = {
      legend: {
        data: ['گاز', 'برق', 'انرژی'],
        align: 'left',
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        textStyle: {
          color: 'rgba(255, 255, 255, 1)',
        },
        borderColor: 'rgba(0, 0, 0, 0.1)',
      },
      xAxis: {
        data: xAxisDataG3,
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
          data: gaz,
          smooth: true,
          animationDelay: (idx) => idx * 10,
        },
        {
          name: 'برق',
          type: 'bar',
          data: power,
          smooth: true,
          animationDelay: (idx) => idx * 10,
        },
        {
          name: 'انرژی',
          type: 'bar',
          data: energy,
          smooth: true,
          animationDelay: (idx) => idx * 10 + 100,
        },
      ],
      animationEasing: 'elasticOut',
      animationDelayUpdate: (idx) => idx * 5,
    };
    this.optionsThreeGraph2 = {
      legend: {
        data: ['گاز', 'برق', 'انرژی'],
        align: 'left',
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        textStyle: {
          color: 'rgba(255, 255, 255, 1)',
        },
        borderColor: 'rgba(0, 0, 0, 0.1)',
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        },
      },
      xAxis: {
        type: 'category',
        data: xAxisDataG3,
      },
      yAxis: {},
      series: [
        {
          name: 'گاز',
          type: 'line',
          data: gaz,
          smooth: true,
          areaStyle: {},
          showSymbol: false,
          animationDelay: (idx) => idx * 10,
        },
        {
          name: 'برق',
          type: 'line',
          data: power,
          smooth: true,
          showSymbol: false,
          animationDelay: (idx) => idx * 10 + 100,
        },
        {
          name: 'انرژی',
          type: 'line',
          data: energy,
          smooth: true,
          showSymbol: false,
          animationDelay: (idx) => idx * 10 + 100,
        },
      ],
      animationEasing: 'elasticOut',
      animationDelayUpdate: (idx) => idx * 5,
    };

    this.isLoadingChart = false;
  }

  fakeDataGenerator(list, Qty): any[] {
    const result = []; // تعریف آرایه برای نتیجه نهایی
    const oneDay = 24 * 60 * 60000; // برای ایجاد یک روز بر حسب میلی ثانیه
    let now = new Date(); // ایجاد تاریخ امروز
    const object = list.reduce((acc, curr) => (acc[curr] = '', acc), {}); // تبدیل لیست ورودی به یک آبجکت

    // حلقه ایجاد لیست ابجکت ها
    for (let i = 0; i <= Qty - 1; i++) {

      const tempList = object; // تعریف tempList از نوع object
      now = new Date(now.getTime() + oneDay); // یک روز به تاریخ روز قبل اضافه میکنه
      tempList.date = now.toISOString(); // تبدیل به تاریخ ایزو و درج در ابجکت

      // ایجاد و درج اطلاعات به ابجکت ها
      for (let j = 0; j < list.length - 1; j++) {
        tempList[list[j]] = Math.floor(Math.random() * 99) + 1; // ایجاد مقدار دیتا
      }
      result.push(JSON.parse(JSON.stringify(tempList))); // در به لیست اصلی
    }
    return result;
  }
}
