import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Moment } from 'src/app/shared/tools/moment';
import { ChartFilter, SeriesInfo } from '../model/chart';
import { chartTypeEnum, EffectiveParameterEnum, PeriodEnum } from '../model/chartEnum';
import Notiflix from 'notiflix';
import { MyPattern } from 'src/app/shared/tools/myPattern';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BaseLineDto } from './model/baseLine';
import { BaseLineParamEnum, EnergyTypeEnum } from './model/baseLineEnum';
import { BaseLineService } from './service/baseLine.service';
import { EnergyLabelService } from '../energy-label/service/energy-label.service';
import { StateService } from '../state.service';
import { Router } from '@angular/router';


declare var $: any;

@Component({
  selector: 'app-base-line',
  templateUrl: './base-line.component.html',
  styleUrls: ['./base-line.component.scss']
})
export class BaseLineComponent implements OnInit, AfterViewInit {
 
  regionId ="111111111111111111111111";

  series: SeriesInfo= {
    series:[
      { data: [85, 12, 78, 75], name: 'power' },
      { data: [67, 23, 96, 13], name: 'powerBaseline' }
    ],
    labels:["5/1", "4/1","3/1","2/1"]
  }
  
  pageSize = 5;
  pageIndex = 0;
  length = -1;
  totalPages = 1;


  moment = Moment;
  options;
  isLoadingChart = false;
  optionsOneGraph;
  optionsOneGraph2;

  myPattern = MyPattern;
  form: FormGroup;
  touched = false;
  
  optionsThreeGraph;
  optionsThreeGraph2;

  buildingList = [];
  baseLineDto = new BaseLineDto();
  chartFilter = new ChartFilter();
  periodEnum = PeriodEnum;
  effectiveParameterEnum = EffectiveParameterEnum;
  effectiveParameterList = [];
  chartTypeEnum = chartTypeEnum;
  energyTypeEnum= EnergyTypeEnum;
  baseLineParamEnum=BaseLineParamEnum;
  options2: any;


  constructor(private formBuilder: FormBuilder,
    private buildingService: EnergyLabelService,
    private baseLineService: BaseLineService,
    private stateService:StateService,
    public router: Router) {}

  ngOnInit(): void {

    this.form = this.formBuilder.group({
      energyType: [],
      // baseLineParam: [],
      period:[],//روزانه /ماهانه
      fromDate:[], // تاریخ شروع 
      toDate:[], // تاریخ اتمام
    });
    this.stateService.regionId.subscribe(reg=>{
      this.regionId=reg;
      this.getBuildingList();
    });
    //initializeform
    this.baseLineDto.period=PeriodEnum[PeriodEnum.MONTHLY.toString()] ;
    this.baseLineDto.energyType=EnergyTypeEnum[EnergyTypeEnum.POWER.toString()] ;
    

    var date = new Date();
    date.setDate( date.getDate() - 0 );
    this.baseLineDto.toDate=date.toISOString();
    date.setDate( date.getDate() - 365 );
    this.baseLineDto.fromDate=date.toISOString();



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
      // this.setOption();

  }
  

  getBuildingList(): void {
    this.buildingService.getBuildingList({
      page: this.pageIndex,
      size: this.pageSize,
    }, {regionId: this.regionId}).subscribe((res: any) => {
      if (res) {
        this.buildingList = res.content;
        this.length = res.totalElements;
        this.pageIndex = res.page;
        this.totalPages = res. totalPages;
      }
    });
  }
  getBuildingBaseLine(buildingId): void {
    this.baseLineDto.buildingId=buildingId;//"607d3c195eb88805b4c98934";
    this.baseLineService.getBaseLine('',this.baseLineDto).subscribe((res: any) => {
      if (res) {
        this.series=res.data;
        Notiflix.Notify.Success('اطلاعات قبوض دریافت شد.');

        // this.energyLabel.ratio = res.data.ratio;
        // this.energyLabel.consumptionIndex = res.data.ConsumptionIndex;
        // // this.energyLabel.labelType=EnergyLabelType.NON_RESIDENTIAL;
        // this.energyLabel.label= res.data.label;
      }
    });
  }
  ngAfterViewInit(): void {
    this.jQueryDate();
         //initializeform
         $('#fromDate').val(this.moment.getJaliliDateFromIso(this.baseLineDto.fromDate));
         $('#toDate').val(this.moment.getJaliliDateFromIso(this.baseLineDto.toDate));
  }
  jQueryDate(): void {
    setTimeout(e1 => {
      $('#fromDate').MdPersianDateTimePicker({
        Placement: 'bottom', // default is 'bottom'
        Trigger: 'focus', // default is 'focus',
        targetTextSelector: '#fromDate',
        disableAfterToday: false,
        disableBeforeToday: false,
      }).on('change', (e) => {
        this.baseLineDto.fromDate = this.moment.convertJaliliToIsoDate($(e.currentTarget).val());
        if (this.baseLineDto.fromDate > this.baseLineDto.toDate) {
          setTimeout(() => {
            Notiflix.Notify.Failure('تاریخ شروع باید قبل از تاریخ پایان انتخاب شود');
            this.baseLineDto.toDate = null;
            $('#toDate').val(this.moment.getJaliliDateFromIso(this.baseLineDto.toDate));
          }, 200);
        }
      });
      $('#toDate').MdPersianDateTimePicker({
        Placement: 'bottom', // default is 'bottom'
        Trigger: 'focus', // default is 'focus',
        targetTextSelector: '#toDate',
        disableAfterToday: false,
        disableBeforeToday: false,
      }).on('change', (e) => {
        this.baseLineDto.toDate = this.moment.convertJaliliToIsoDate($(e.currentTarget).val());
        console.log('this.baseLineDto.toDate', this.baseLineDto.toDate);
        if (this.baseLineDto.fromDate > this.baseLineDto.toDate) {
          setTimeout(() => {
            Notiflix.Notify.Failure('تاریخ وارده باید قبل از تاریخ شروع انتخاب شود');
            this.baseLineDto.toDate = null;
            $('#toDate').val(this.moment.getJaliliDateFromIso(this.baseLineDto.fromDate));
          }, 200);
        }
      });
    }, 100);
  }
  
  // getEffectiveParameterNgModel(item: any): boolean {
  //   const index = this.chartFilter.effectiveParameterList.findIndex(e => e === item);
  //   return index !== -1;
  // }

  // onChangeEffectiveParameter(event, item: any): void {
  //   const index = this.chartFilter.effectiveParameterList.findIndex(e => e === item);
  //   if (event.target.checked === true)
  //    {
  //     if (index === -1) {
  //       this.chartFilter.effectiveParameterList.push(item);
  //     } else {
  //       this.chartFilter.effectiveParameterList[index] = JSON.parse(JSON.stringify(item));
  //     }
  //   }
  //   if (event.target.checked === false) 
  //   {
  //     if (index !== -1) {
  //       this.chartFilter.effectiveParameterList.splice(index, 1);
  //     }
  //   }
  // }

  // setOption(): void {
  //   this.isLoadingChart = true;
  //   const xAxisData = [];
  //   const eGaz = [];
  //   const eAct = [];

  //   const xAxisDataG2 = [];
  //   const HDD = [];
  //   const CDD = [];

  //   const xAxisDataG3 = [];
  //   const gaz = [];
  //   const power = [];
  //   const energy = [];

  //   const chartData = this.fakeDataGenerator(['eGaz', 'eAct', 'date'], 18);
  //   const length = chartData.length;
  //   for (let i = 0; i < length; i++) {
  //     // xAxisData.push(this.moment.getJaliliDateFromIso(chartData[i].date));
  //     xAxisData.push(this.moment.getJaliliDateFromIso(chartData[i].date));
  //     // console.log('chartData[i]', chartData[i]);
  //     eGaz.push(chartData[i].eGaz);
  //     eAct.push(chartData[i].eAct);
  //   }
  //   this.options = {
  //     legend: {
  //       data: ['گاز', 'eAct'],
  //       align: 'left',
  //     },
  //     tooltip: {
  //       backgroundColor: 'rgba(0, 0, 0, 0.7)',
  //       textStyle: {
  //         color: 'rgba(255, 255, 255, 1)',
  //       },
  //       borderColor: 'rgba(0, 0, 0, 0.1)',
  //     },
  //     xAxis: {
  //       data: xAxisData,
  //       silent: false,
  //       splitLine: {
  //         show: true,
  //       },
  //     },
  //     yAxis: {},
  //     series: [
  //       {
  //         name: 'گاز',
  //         type: 'bar',
  //         data: eGaz,
  //         smooth: true,
  //         showSymbol: false,
  //         animationDelay: (idx) => idx * 10,
  //       },
  //       {
  //         name: 'eAct',
  //         type: 'bar',
  //         data: eAct,
  //         smooth: true,
  //         showSymbol: false,
  //         animationDelay: (idx) => idx * 10 + 100,
  //       },
  //     ],
  //     animationEasing: 'elasticOut',
  //     animationDelayUpdate: (idx) => idx * 5,
  //   };
  //   this.options2 = {
  //     legend: {
  //       data: ['گاز', 'eAct'],
  //       align: 'left',
  //     },
  //     tooltip: {
  //       backgroundColor: 'rgba(0, 0, 0, 0.7)',
  //       textStyle: {
  //         color: 'rgba(255, 255, 255, 1)',
  //       },
  //       borderColor: 'rgba(0, 0, 0, 0.1)',
  //       trigger: 'axis',
  //       axisPointer: {
  //         type: 'cross',
  //         label: {
  //           backgroundColor: '#6a7985'
  //         }
  //       },
  //     },
  //     xAxis: {
  //       data: xAxisData,
  //     },
  //     yAxis: {},
  //     series: [
  //       {
  //         name: 'گاز',
  //         type: 'line',
  //         data: eGaz,
  //         smooth: true,
  //         areaStyle: {},
  //         showSymbol: false,
  //         animationDelay: (idx) => idx * 10,
  //       },
  //       {
  //         name: 'eAct',
  //         type: 'line',
  //         data: eAct,
  //         smooth: true,
  //         showSymbol: false,
  //         animationDelay: (idx) => idx * 10 + 100,
  //       },
  //     ],
  //     animationEasing: 'elasticOut',
  //     animationDelayUpdate: (idx) => idx * 5,
  //   };

  //   const chartDataGraph = this.fakeDataGenerator(['HDD', 'CDD', 'date'], 18);
  //   const lengthGraph = chartDataGraph.length;
  //   for (let i = 0; i < lengthGraph; i++) {
  //     xAxisDataG2.push(this.moment.getJaliliDateFromIso(chartDataGraph[i].date));
  //     CDD.push(chartDataGraph[i].CDD);
  //     HDD.push(chartDataGraph[i].HDD);
  //   }
  //   this.optionsOneGraph = {
  //     legend: {
  //       data: ['CDD', 'HDD'],
  //       align: 'left',
  //     },
  //     tooltip: {
  //       backgroundColor: 'rgba(0, 0, 0, 0.7)',
  //       textStyle: {
  //         color: 'rgba(255, 255, 255, 1)',
  //       },
  //       borderColor: 'rgba(0, 0, 0, 0.1)',
  //     },
  //     xAxis: {
  //       data: xAxisDataG2,
  //       silent: false,
  //       splitLine: {
  //         show: true,
  //       },
  //     },
  //     yAxis: {},
  //     series: [
  //       {
  //         name: 'CDD',
  //         type: 'bar',
  //         data: CDD,
  //         smooth: true,
  //         animationDelay: (idx) => idx * 10,
  //       },
  //       {
  //         name: 'HDD',
  //         type: 'bar',
  //         data: HDD,
  //         smooth: true,
  //         animationDelay: (idx) => idx * 10 + 100,
  //       },
  //     ],
  //     animationEasing: 'elasticOut',
  //     animationDelayUpdate: (idx) => idx * 5,
  //   };
  //   this.optionsOneGraph2 = {
  //     legend: {
  //       data: ['CDD', 'HDD'],
  //       align: 'left',
  //     },
  //     tooltip: {
  //       backgroundColor: 'rgba(0, 0, 0, 0.7)',
  //       textStyle: {
  //         color: 'rgba(255, 255, 255, 1)',
  //       },
  //       borderColor: 'rgba(0, 0, 0, 0.1)',
  //       trigger: 'axis',
  //       axisPointer: {
  //         type: 'cross',
  //         label: {
  //           backgroundColor: '#6a7985'
  //         }
  //       },
  //     },
  //     xAxis: {
  //       data: xAxisDataG2,
  //       type: 'category',
  //     },
  //     yAxis: {},
  //     series: [
  //       {
  //         name: 'CDD',
  //         type: 'line',
  //         data: CDD,
  //         smooth: true,
  //         areaStyle: {},
  //         showSymbol: false,
  //         animationDelay: (idx) => idx * 10,
  //       },
  //       {
  //         name: 'HDD',
  //         type: 'line',
  //         data: HDD,
  //         smooth: true,
  //         showSymbol: false,
  //         animationDelay: (idx) => idx * 10 + 100,
  //       },
  //     ],
  //     animationEasing: 'elasticOut',
  //     animationDelayUpdate: (idx) => idx * 5,
  //   };

  //   const chartDataGraph2 = this.fakeDataGenerator(['gaz', 'power', 'energy', 'date'], 18);
  //   const lengthGraph2 = chartDataGraph2.length;
  //   for (let i = 0; i < lengthGraph2; i++) {
  //     xAxisDataG3.push(this.moment.getJaliliDateFromIso(chartDataGraph2[i].date));
  //     power.push(chartDataGraph2[i].power);
  //     gaz.push(chartDataGraph2[i].gaz);
  //     energy.push(chartDataGraph2[i].energy);
  //   }
  //   this.optionsThreeGraph = {
  //     legend: {
  //       data: ['گاز', 'برق', 'انرژی'],
  //       align: 'left',
  //     },
  //     tooltip: {
  //       backgroundColor: 'rgba(0, 0, 0, 0.7)',
  //       textStyle: {
  //         color: 'rgba(255, 255, 255, 1)',
  //       },
  //       borderColor: 'rgba(0, 0, 0, 0.1)',
  //     },
  //     xAxis: {
  //       data: xAxisDataG3,
  //       silent: false,
  //       splitLine: {
  //         show: true,
  //       },
  //     },
  //     yAxis: {},
  //     series: [
  //       {
  //         name: 'گاز',
  //         type: 'bar',
  //         data: gaz,
  //         smooth: true,
  //         animationDelay: (idx) => idx * 10,
  //       },
  //       {
  //         name: 'برق',
  //         type: 'bar',
  //         data: power,
  //         smooth: true,
  //         animationDelay: (idx) => idx * 10,
  //       },
  //       {
  //         name: 'انرژی',
  //         type: 'bar',
  //         data: energy,
  //         smooth: true,
  //         animationDelay: (idx) => idx * 10 + 100,
  //       },
  //     ],
  //     animationEasing: 'elasticOut',
  //     animationDelayUpdate: (idx) => idx * 5,
  //   };
  //   this.optionsThreeGraph2 = {
  //     legend: {
  //       data: ['گاز', 'برق', 'انرژی'],
  //       align: 'left',
  //     },
  //     tooltip: {
  //       backgroundColor: 'rgba(0, 0, 0, 0.7)',
  //       textStyle: {
  //         color: 'rgba(255, 255, 255, 1)',
  //       },
  //       borderColor: 'rgba(0, 0, 0, 0.1)',
  //       trigger: 'axis',
  //       axisPointer: {
  //         type: 'cross',
  //         label: {
  //           backgroundColor: '#6a7985'
  //         }
  //       },
  //     },
  //     xAxis: {
  //       type: 'category',
  //       data: xAxisDataG3,
  //     },
  //     yAxis: {},
  //     series: [
  //       {
  //         name: 'گاز',
  //         type: 'line',
  //         data: gaz,
  //         smooth: true,
  //         areaStyle: {},
  //         showSymbol: false,
  //         animationDelay: (idx) => idx * 10,
  //       },
  //       {
  //         name: 'برق',
  //         type: 'line',
  //         data: power,
  //         smooth: true,
  //         showSymbol: false,
  //         animationDelay: (idx) => idx * 10 + 100,
  //       },
  //       {
  //         name: 'انرژی',
  //         type: 'line',
  //         data: energy,
  //         smooth: true,
  //         showSymbol: false,
  //         animationDelay: (idx) => idx * 10 + 100,
  //       },
  //     ],
  //     animationEasing: 'elasticOut',
  //     animationDelayUpdate: (idx) => idx * 5,
  //   };

  //   this.isLoadingChart = false;
  // }

  // fakeDataGenerator(list, Qty): any[] {
  //   const result = []; // تعریف آرایه برای نتیجه نهایی
  //   const oneDay = 24 * 60 * 60000; // برای ایجاد یک روز بر حسب میلی ثانیه
  //   let now = new Date(); // ایجاد تاریخ امروز
  //   const object = list.reduce((acc, curr) => (acc[curr] = '', acc), {}); // تبدیل لیست ورودی به یک آبجکت

  //   // حلقه ایجاد لیست ابجکت ها
  //   for (let i = 0; i <= Qty - 1; i++) {

  //     const tempList = object; // تعریف tempList از نوع object
  //     now = new Date(now.getTime() + oneDay); // یک روز به تاریخ روز قبل اضافه میکنه
  //     tempList.date = now.toISOString(); // تبدیل به تاریخ ایزو و درج در ابجکت

  //     // ایجاد و درج اطلاعات به ابجکت ها
  //     for (let j = 0; j < list.length - 1; j++) {
  //       tempList[list[j]] = Math.floor(Math.random() * 99) + 1; // ایجاد مقدار دیتا
  //     }
  //     result.push(JSON.parse(JSON.stringify(tempList))); // در به لیست اصلی
  //   }
  //   return result;
  // }
}
