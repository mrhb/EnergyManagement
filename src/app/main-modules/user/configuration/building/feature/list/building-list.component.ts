/**
 * create By reza mollaei
 * Email: reza_yki@yahoo.com
 * telegram: reza_yki
 */

import {AfterViewInit, Component, OnInit} from '@angular/core';
import {BuildingList, EnergyLabel, Region} from '../../model/building';
import {BuildingService} from '../../service/building.service';
import {ActivatedRoute, Router} from '@angular/router';
import {UseTypeEnum} from '../../model/useTypeEnum';
// @ts-ignore
import Notiflix from 'notiflix';
import {EnergyLabelType} from '../../model/EnergyLabelType';
import {Moment} from '../../../../../../shared/tools/moment';
import {ChartFilter} from '../../model/chart';
import {chartTypeEnum, EffectiveParameterEnum, PeriodEnum} from '../../model/chartEnum';

declare var $: any;

@Component({
  selector: 'app-building-list',
  templateUrl: './building-list.component.html',
  styleUrls: ['./building-list.component.scss']
})
export class BuildingListComponent implements OnInit, AfterViewInit {
  pageSize = 10;
  pageIndex = 0;
  length = -1;

  useTypeEnum = UseTypeEnum;
  region = new Region();
  buildingList: BuildingList[] = [];

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


  energyLabel = new EnergyLabel();
  energyLabelEnum = EnergyLabelType;

  constructor(private buildingService: BuildingService,
              public router: Router,
              private activatedRoute: ActivatedRoute) {
    console.log('chartFilter', this.chartFilter.period);
    this.activatedRoute.queryParams.subscribe(params => {
      if (params.pageIndex) {
        this.pageIndex = params.pageIndex;
        this.pageSize = params.pageSize;
      }
      this.getBuildingList();
    });

  }

  ngOnInit(): void {
    // this.getBuildingList();
    $('.e-not-close a').on('click', (event) => {
      $(this).parent().toggleClass('open');
    });

    $('body').on('click', (e) => {
      if (!$('.e-not-close').is(e.target)
        && $('.e-not-close').has(e.target).length === 0
        && $('.show').has(e.target).length === 0
      ) {
        $('.e-not-close').addClass('show');
      } else {
        $('.e-not-close').removeClass('show');
      }
    });

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

  getEnergyLabel(index): void {
    const list: EnergyLabel[] = [];
    const a: EnergyLabel = {
      consumptionIndex: '1277',
      label: 'A',
      labelType: EnergyLabelType.NON_RESIDENTIAL,
      ratio: '10.98'
    };

    const b: EnergyLabel = {
      consumptionIndex: '1858',
      label: 'B',
      labelType: EnergyLabelType.OFFICIAL,
      ratio: '75.66'
    };

    const c: EnergyLabel = {
      consumptionIndex: '1002',
      label: 'C',
      labelType: EnergyLabelType.RESIDENTIAL,
      ratio: '44.77'
    };

    const d: EnergyLabel = {
      consumptionIndex: '9502',
      label: 'D',
      labelType: EnergyLabelType.NON_RESIDENTIAL,
      ratio: '15.98'
    };

    const e: EnergyLabel = {
      consumptionIndex: '1102',
      label: 'E',
      labelType: EnergyLabelType.OFFICIAL,
      ratio: '16.48'
    };

    const f: EnergyLabel = {
      consumptionIndex: '16112',
      label: 'F',
      labelType: EnergyLabelType.RESIDENTIAL,
      ratio: '76.48'
    };

    const g: EnergyLabel = {
      consumptionIndex: '2266',
      label: 'G',
      labelType: EnergyLabelType.OFFICIAL,
      ratio: '79.12'
    };

    list.push(a);
    list.push(b);
    list.push(c);
    list.push(d);
    list.push(e);
    list.push(f);
    list.push(g);

    this.energyLabel = list[index];
  }

  getRegion($event: any): void {
    this.region = $event;
    console.log('this.region', this.region);
    this.getBuildingList();
  }

  getBuildingList(): void {
    this.buildingService.getBuildingList({
      page: this.pageIndex,
      size: this.pageSize,
    }, {regionId: this.region.regionId}).subscribe((res: any) => {
      if (res) {
        this.buildingList = res.content;
        this.length = res.totalElements;
      }
    });
  }

  deleteBuilding(i: number, bId): void {
    Notiflix.Confirm.Show(
      'حذف فضا',
      'آیا اطمینان دارید که ساختمان حذف گردد؟',
      'بله',
      'خیر',
      () => {
        this.buildingService.deleteBuilding({id: bId})
          .subscribe((res: any) => {
            if (res) {
              Notiflix.Notify.Success('حذف فضا با موفقیت انجام گردید');
              this.buildingList.splice(i, 1);
            }
          });
      });
  }

  navigate(): void {
    this.router.navigate([window.location.hash.split('#/')[1].split('?')[0]], {
      queryParams: {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
      },
    });

  }

  changePage(event: any): void {
    console.log('event.length', event.length);
    this.length = event.length;
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.navigate();
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
      console.log('chartData[i]', chartData[i]);
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
