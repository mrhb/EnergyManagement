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
  
  pageSize = 20;
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
      coolingBase:[], //دمای پایه سرمایش
      heatingBase:[],//دمای پایه گرمایش
    });
    this.stateService.regionId.subscribe(reg=>{
      this.regionId=reg;
      this.getBuildingList();
    });
    //initializeform
    this.baseLineDto.period=PeriodEnum[PeriodEnum.MONTHLY.toString()] ;
    this.baseLineDto.energyType=EnergyTypeEnum[EnergyTypeEnum.powerReceipt.toString()] ;
    

    var date = new Date();
    date.setDate( date.getDate() - 0 );
    this.baseLineDto.toDate=date.toISOString();
    date.setDate( date.getDate() - 365 );
    this.baseLineDto.fromDate=date.toISOString();
    this.baseLineDto.coolingBase=21;
    this.baseLineDto.heatingBase=18;




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
    this.baseLineService.getBaseLineSingleCarier('',this.baseLineDto).subscribe((res: any) => {
      if (res) {
        this.series=res.data;
        Notiflix.Notify.Success('اطلاعات قبوض دریافت شد.');

        // this.energyLabel.ratio = res.data.ratio;
        // this.energyLabel.consumptionIndex = res.data.ConsumptionIndex;
        // // this.energyLabel.labelType=EnergyLabelType.RESIDENTIAL;
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
  
}