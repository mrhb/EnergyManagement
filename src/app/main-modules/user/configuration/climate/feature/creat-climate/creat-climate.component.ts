import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClimateDto } from '../../model/climate';
import { WeatherDto, WeatherListDto, WeatherReqDto } from '../../model/weather';
import { ClimateTypeEnum, ProvinceEnum } from '../../model/climateEnum';
import { ClimateService } from '../../service/climate.service';
import Notiflix from 'notiflix';
import { RegionService } from '../../../region/service/region.service';
declare var $: any;

import * as XLSX from 'xlsx';
import { Moment } from 'src/app/shared/tools/moment';
type AOA = any[][];

declare var $: any;

@Component({
  selector: 'app-creat-climate',
  templateUrl: './creat-climate.component.html',
  styleUrls: ['./creat-climate.component.scss']
})
export class CreateClimateComponent implements OnInit {
//daily Weather dialogue

data: AOA = [[1, 2], [3, 4]];
wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };
fileName: string = 'SheetJS.xlsx';
xlsxWeatherList: WeatherDto[] = [];
weatherAvg=new WeatherDto();
averageList: WeatherDto[] = [];
moment = Moment;


  pageSize = 20;
  pageIndex = 0;
  length = -1;

  touched = false;
  edited = false;
  form: FormGroup;
  climateDto = new ClimateDto();
  provinceEnum = ProvinceEnum;
  climateTypeEnum = ClimateTypeEnum;
  weatherList: WeatherListDto[]=[];

  region="";
  regionId: string;

  weatherReqDto= new WeatherReqDto();



  stateServiceRegion_subscribe:any;
  stateServiceRegionId_subscribe:any;

  @ViewChild('fileInput') fileInputVariable: ElementRef;
  weatherForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
              private router: Router,
              private climateService: ClimateService,
              private activatedRoute: ActivatedRoute,
              private stateService:RegionService,
  ) { 
   
}

ngAfterViewInit(): void {
  this.jQueryDate();
   //initializeform
   $('#fromDate').val(this.moment.getJaliliDateFromIso(this.weatherReqDto.fromDate));
   $('#toDate').val(this.moment.getJaliliDateFromIso(this.weatherReqDto.toDate));
   this.updateweatherList();
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
      this.weatherReqDto.fromDate = this.moment.convertJaliliToIsoDate($(e.currentTarget).val());
      if (this.weatherReqDto.fromDate > this.weatherReqDto.toDate) {
        setTimeout(() => {
          Notiflix.Notify.Failure('تاریخ شروع باید قبل از تاریخ پایان انتخاب شود');
          this.weatherReqDto.toDate = null;
          $('#toDate').val(this.moment.getJaliliDateFromIso(this.weatherReqDto.toDate));
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
      this.weatherReqDto.toDate = this.moment.convertJaliliToIsoDate($(e.currentTarget).val());
      console.log('this.weatherReqDto.toDate', this.weatherReqDto.toDate);
      if (this.weatherReqDto.fromDate > this.weatherReqDto.toDate) {
        setTimeout(() => {
          Notiflix.Notify.Failure('تاریخ وارده باید قبل از تاریخ شروع انتخاب شود');
          this.weatherReqDto.toDate = null;
          $('#toDate').val(this.moment.getJaliliDateFromIso(this.weatherReqDto.fromDate));
        }, 200);
      }
    });
  }, 100);
}
  ngOnInit(): void {

    this.stateServiceRegion_subscribe=this.stateService.region.subscribe(reg=>{
      this.region=reg;
  });
    this.stateServiceRegionId_subscribe= this.stateService.regionId.subscribe(reg=>{
      this.regionId=reg;
    });


    this.weatherForm = this.formBuilder.group({

      fromDate:[], // تاریخ شروع 
      toDate:[], // تاریخ اتمام 

    });
     

    var date = new Date();
    date.setDate( date.getDate() - 0 );
    this.weatherReqDto.toDate=date.toISOString();
    date.setDate( date.getDate() - 90 );
    this.weatherReqDto.fromDate=date.toISOString();

    this.form = this.formBuilder.group({
      province: [''], // استان  
      city: [''], // شهر
      village: [''], //روستا
      longitude: [''],// طول جغرافیایی
      latitude: [''],// عرض جغرافیایی 
      height: [''],// ارتفاع از سطح دریا
      climateType: [''], // نوع اقلیم 
      dominantThermalReq: [''],// نیاز غالب حرارتی
      energyDegree: [''], // درجه انرژی
    });


        // var date = new Date();
    // date.setDate( date.getDate() - 0 );
    // this.weatherReqDto.toDate=date.toISOString();
    // date.setDate( date.getDate() - 90 );
    // this.weatherReqDto.fromDate=date.toISOString();
    this.activatedRoute.queryParams.subscribe(params => {
      console.log('params', params);
      if (params.id) {
        this.edited = true;
        this.regionId = params.id;
        
        this.getOneClimate(params.id);

        this.stateServiceRegionId_subscribe.unsubscribe();
        this.stateServiceRegion_subscribe.unsubscribe();
      }
    });
  }
  resetInputFile() {
    this.fileInputVariable.nativeElement.value = "";
}

  
  onFileChange(evt: any) {
    this.xlsxWeatherList=[];
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      this.data = <AOA>(XLSX.utils.sheet_to_json(ws, { header: 1 }));
      console.log(this.data);
      // this.resetInputFile();

      this.data.shift();

      this.data.forEach(item => {
       let Weather=new WeatherDto();
       if(item.length<8){
        Notiflix.Notify.Error('خطا در خواندن داده های فایل .');
       }

       Weather.forDate = this.moment.convertJaliliToIsoDate( item[0]).split("T")[0];
      //  Weather.forDate = item[0];
       Weather.tempMin=item[1];
       Weather.tempMax=item[2];
       Weather.tempAvg=item[3];
       Weather.humidityMin=item[3];
       Weather.humidityMax=item[4];
       Weather.humidityAvg=item[5];
       Weather.sunRad=item[6];
       Weather.wind=item[7];
      
       this.xlsxWeatherList.push(Weather);
    });

    this.calAvg();

    };
    reader.readAsBinaryString(target.files[0]);
  }

  calAvg()
  {
    
    let average: WeatherDto={
      forDate:"",
      tempMax:0,
      tempMin:0,
      tempAvg:0,
      humidityMin:0,
      humidityMax:0,
      humidityAvg:0,
      sunRad:0,
      wind:0,
    };

    this.weatherAvg = this.xlsxWeatherList.reduce<WeatherDto>(function (sum, value){
      average.tempMax=average.tempMax+value.tempMax;
      average.tempMin=average.tempMin+value.tempMin;
      average.tempAvg=average.tempAvg+value.tempAvg;
      average.humidityMin=average.humidityMin+value.humidityMin;
      average.humidityMax=average.humidityMax+value.humidityMax;
      average.humidityAvg=average.humidityAvg+value.humidityAvg;
      average.sunRad=average.sunRad+value.sunRad;
      average.wind=average.wind+value.wind;

      return average ;

  }, new WeatherDto()) ;

  this.weatherAvg={
    forDate:"",
    tempMax:this.weatherAvg.tempMax/this.xlsxWeatherList.length,
    tempMin:this.weatherAvg.tempMin/this.xlsxWeatherList.length,
    tempAvg:this.weatherAvg.tempAvg/this.xlsxWeatherList.length,
    humidityMin:this.weatherAvg.humidityMin/this.xlsxWeatherList.length,
    humidityMax:this.weatherAvg.humidityMax/this.xlsxWeatherList.length,
    humidityAvg:this.weatherAvg.humidityAvg/this.xlsxWeatherList.length,
    sunRad:this.weatherAvg.sunRad/this.xlsxWeatherList.length,
    wind:this.weatherAvg.wind/this.xlsxWeatherList.length,
  };
  }

  saveXlsxData()
  {
    this.climateService.updateweather({id:this.regionId},this.xlsxWeatherList)
    .subscribe((res: any) => {
      if (res) {
        Notiflix.Notify.Success('ثبت داده های اکسل با موفقیت انجام شد.');
        // setTimeout(() => {
        //   $('#pills-building-tab').click();
        // }, 200);
        // this.router.navigate(['/index/user/configuration/powerList']);
      }
    });
  }


  getOneClimate(id: any) {
    this.climateService.getOneClimate({id: id})
    .subscribe((res: any) => {
      if (res) {
        this.climateDto = res.data;
        this.region=res.data.title;
      }
    });
  }
  
  setEnumUseType(isChange?: boolean): void {
  }

  createClimate(): void {
      this.touched = true;
      if (this.form.invalid) {
        this.form.markAllAsTouched();
        Notiflix.Notify.Failure('ورودی رو بررسی کنید!');
        return;
      }
        this.climateService.updateClimate({id: this.regionId}, this.climateDto)
          .subscribe((res: any) => {
            if (res) {
              Notiflix.Notify.Success('ویرایش اقلیم با موفقیت انجام شد.');
              // this.router.navigateByUrl('/index/user/configuration/climateList').then();
            }
          });
      }
  
  updateweatherList(){
    this.weatherReqDto.regionId=this.regionId;
    this.climateService.getWeatherList('',this.weatherReqDto)
    .subscribe((res: any) => {
      if (res) {
        this.xlsxWeatherList=res.data;
        this.calAvg();
        Notiflix.Notify.Success('اطلاعات آب و هوایی دریافت شد.');
      }
    });

  }
    
}

