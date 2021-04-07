import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClimateDto } from '../../model/climate';
import { WeatherDto, WeatherListDto } from '../../model/weather';
import { ClimateTypeEnum, ProvinceEnum } from '../../model/climateEnum';
import { ClimateService } from '../../service/climate.service';
import Notiflix from 'notiflix';
import { RegionService } from '../../../region/service/region.service';
declare var $: any;

import * as XLSX from 'xlsx';
import { ThemeService } from 'ng2-charts';
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
moment = Moment;



// powerBillList: PowerBillList[] = [];
//

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
  year: number=0;//  سال
  region="";
  regionId: string;

  @ViewChild('fileInput') fileInputVariable: ElementRef;

  constructor(
    private formBuilder: FormBuilder,
              private router: Router,
              private climateService: ClimateService,
              private activatedRoute: ActivatedRoute,
              private stateService:RegionService,
  ) { 
    stateService.region.subscribe(reg=>{
      this.region=reg;
  });
}


  ngOnInit(): void {
    this.stateService.regionId.subscribe(reg=>{
      this.regionId=reg;
    });
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
    this.activatedRoute.queryParams.subscribe(params => {
      console.log('params', params);
      if (params.id) {
        this.edited = true;
        this.regionId = params.id;
        this.getOneClimate(params.id);
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

      this.data.forEach(item => {
       let Weather=new WeatherDto();

       if(item.length<8){
        Notiflix.Notify.Error('خطا در خواندن داده های فایل .');
       }

       Weather.forDate = this.moment.convertJaliliToIsoDate( item[0]).split("T")[0];
      //  Weather.forDate = item[0];
       Weather.tempMax=item[1];
       Weather.tempMin=item[2];
       Weather.tempAvg=item[3];
       Weather.humidityMin=item[3];
       Weather.humidityMax=item[4];
       Weather.humidityAvg=item[5];
       Weather.sunRad=item[6];
       Weather.wind=item[7];
   
       this.xlsxWeatherList.push(Weather);
    });

    };
    reader.readAsBinaryString(target.files[0]);
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
    throw new Error('Method not implemented.');
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
      // if (!this.edited) {
      //   this.climateService.updateClimate({id:this.regionId},this.climateDto)
      //     .subscribe((res: any) => {
      //       if (res) {
      //         Notiflix.Notify.Success('ایجاد اقلیم با موفقیت انجام شد.');
      //         this.regionId = res.data;
      //         // setTimeout(() => {
      //         //   $('#pills-building-tab').click();
      //         // }, 200);
      //         // this.router.navigate(['/index/user/configuration/climateList']).then();
      //         // this.router.navigateByUrl('/index/user/configuration/climateList').then();
      //       }
      //     });

      // } else {
        this.climateService.updateClimate({id: this.regionId}, this.climateDto)
          .subscribe((res: any) => {
            if (res) {
              Notiflix.Notify.Success('ویرایش اقلیم با موفقیت انجام شد.');
              // this.router.navigateByUrl('/index/user/configuration/climateList').then();
            }
          });
      }
    
}

    function regionId(regionId: any) {
      throw new Error('Function not implemented.');
    }
  
  // createCity(): void {}

