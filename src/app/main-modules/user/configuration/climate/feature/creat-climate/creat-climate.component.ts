import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClimateDto } from '../../model/climate';
import { WeatherList } from '../../model/weather';
import { ClimateTypeEnum, ProvinceEnum } from '../../model/climateEnum';
import { ClimateService } from '../../service/climate.service';
import Notiflix from 'notiflix';
import { RegionService } from '../../../region/service/region.service';

@Component({
  selector: 'app-creat-climate',
  templateUrl: './creat-climate.component.html',
  styleUrls: ['./creat-climate.component.scss']
})
export class CreateClimateComponent implements OnInit {
  pageSize = 20;
  pageIndex = 0;
  length = -1;

  touched = false;
  edited = false;
  form: FormGroup;
  climateDto = new ClimateDto();
  provinceEnum = ProvinceEnum;
  climateTypeEnum = ClimateTypeEnum;
  weatherList: WeatherList;
  year: number=0;//  سال
  region="";
  regionId: string;

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

