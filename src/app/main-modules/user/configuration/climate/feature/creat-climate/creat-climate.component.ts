import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClimateDto } from '../../model/climate';
import { WeatherList } from '../../model/weather';
import { ClimateTypeEnum, ProvinceEnum } from '../../model/climateEnum';

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
  climateId = '';
  form: FormGroup;
  climateDto = new ClimateDto();
  // weatherList = new WeatherList();
  year: number=0;//  سال

  weatherList: WeatherList[]=[
    {
      id: "1", 
      month: "1", 
      highDegMean: "1", 
      lowDegMean: "1", 
      DegMean: "10",
      highHumidMean: "1", 
      lowHumidMean: "1", 
      HumidMean: "1", 
      windMean: "1", 
      sunRadMean: "1", 
    }];

    provinceEnum = ProvinceEnum;
    climateTypeEnum = ClimateTypeEnum;
    

  filterBuilding = '';
  buildingList = [];
  editedAllocation = false;
  
  constructor(
    private formBuilder: FormBuilder,
              private router: Router,
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      climateType: ['', [Validators.required]], // نوع اقلیم 
      province: ['', [Validators.required]], // استان  
      city: ['', [Validators.required]], // شهر
      village: [''], //روستا
      longitude: [''],// طول جغرافیایی
      latitude: [''],// عرض جغرافیایی 
      height: [''],// ارتفاع از سطح دریا
      dominantThermalReq: [''],// نیاز غالب حرارتی
      energyDegree: [''], // درجه انرژی

    });
  }

  setEnumUseType(isChange?: boolean): void {

  }
  createClimate(): void {}
  createCity(): void {}
}
