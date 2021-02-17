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

  }

  ngOnInit(): void {
    this.getBuildingList();
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
    console.log('this.effectiveParameterList', this.effectiveParameterList);
    // $('.dropdown-toggle').on('click', function (e) {
    //   $(this).next().toggle();
    // });
    // $('.dropdown-menu.keep-open').on('click', function (e) {
    //   e.stopPropagation();
    // });
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
          setTimeout( () => {
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
        if (this.chartFilter.fromDate > this.chartFilter.toDate) {
          setTimeout( () => {
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
    console.log(this.activatedRoute.snapshot.url[0].path);
    // @ts-ignore
    this.router.navigate([this.activatedRoute.parent.snapshot._routerState.url.split('?')[0]], {
      queryParams: {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
      },
    });
    this.getBuildingList();
  }

  changePage(event: any): void {
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
    setTimeout(() => {
      const xAxisData = [];
      const eGaz = [];
      const eAct = [];

      const xAxisDataG2 = [];
      const HDD = [];
      const CDD = [];


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
      const length = chartData.length;
      for (let i = 0; i < length; i++) {
        // xAxisData.push(this.moment.getJaliliDateFromIso(chartData[i].date));
        xAxisData.push(this.moment.getJaliliDateFromIso(chartData[i].date));
        console.log('chartData[i]', chartData[i]);
        eGaz.push(chartData[i].eGaz);
        eAct.push(chartData[i].eAct);
      }

      const chartDataGraph = [
        {
          HDD: 80,
          CDD: 40,
          date: '2020-05-12T12:19:00+00:00'
        },
        {
          // value: 50,
          HDD: 60,
          CDD: 90,
          date: '2020-05-14T12:19:00+00:00'
        },
        {
          HDD: 12,
          CDD: 37,
          date: '2020-05-16T12:19:00+00:00'
        },
        {
          HDD: 55,
          CDD: 15,
          date: '2020-05-18T12:19:00+00:00'
        },
        {
          HDD: 60,
          CDD: 90,
          date: '2020-05-20T12:19:00+00:00'
        },
        {
          HDD: 99,
          CDD: 90,
          date: '2020-05-22T12:19:00+00:00'
        },
        {
          HDD: 60,
          CDD: 55,
          date: '2020-05-24T12:19:00+00:00'
        },
        {
          HDD: 12,
          CDD: 90,
          date: '2020-05-26T12:19:00+00:00'
        },
        {
          HDD: 55,
          CDD: 90,
          date: '2020-05-28T12:19:00+00:00'
        },
        {
          HDD: 66,
          CDD: 99,
          date: '2020-05-30T12:19:00+00:00'
        },
        {
          HDD: 40,
          CDD: 85,
          date: '2020-06-01T12:19:00+00:00'
        },
        {
          HDD: 60,
          CDD: 90,
          date: '2020-06-03T12:19:00+00:00'
        },
        {
          HDD: 10,
          CDD: 30,
          date: '2020-06-05T12:19:00+00:00'
        },
        {
          HDD: 30,
          CDD: 80,
          date: '2020-06-07T12:19:00+00:00'
        },
        {
          HDD: 50,
          CDD: 30,
          date: '2020-06-08T12:19:00+00:00'
        },
        {
          HDD: 60,
          CDD: 20,
          date: '2020-06-11T12:19:00+00:00'
        },
        {
          HDD: 60,
          CDD: 80,
          date: '2020-06-14T12:19:00+00:00'
        },
        {
          HDD: 87,
          CDD: 35,
          date: '2020-06-15T12:19:00+00:00'
        },
      ];
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


      this.optionsOneGraph = {
        legend: {
          data: ['CDD', 'HDD'],
          align: 'left',
        },
        tooltip: {},
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
            animationDelay: (idx) => idx * 10,
          },
          {
            name: 'HDD',
            type: 'bar',
            data: HDD,
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
          silent: false,
          splitLine: {
            show: true,
          },
        },
        yAxis: {},
        series: [
          {
            name: 'CDD',
            type: 'line',
            data: CDD,
            animationDelay: (idx) => idx * 10,
          },
          {
            name: 'HDD',
            type: 'line',
            data: HDD,
            animationDelay: (idx) => idx * 10 + 100,
          },
        ],
        animationEasing: 'elasticOut',
        animationDelayUpdate: (idx) => idx * 5,
      };

      const lengthGraph = chartDataGraph.length;
      for (let i = 0; i < lengthGraph; i++) {
        xAxisDataG2.push(this.moment.getJaliliDateFromIso(chartDataGraph[i].date));
        console.log('chartDataGraph[i]', chartDataGraph[i]);
        CDD.push(chartDataGraph[i].CDD);
        HDD.push(chartDataGraph[i].HDD);
      }
      this.isLoadingChart = false;
    }, 1000);
  }
}
