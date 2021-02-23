import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClimateDto } from '../../model/climate';
import { WeatherList } from '../../model/weather';
import { UseTypePowerEnum,OstanEnum } from '../../model/climateEnum';

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

  useTypeEnum = UseTypePowerEnum;
  ostanEnum = OstanEnum;
  useCodeEnum;

  filterBuilding = '';
  buildingList = [];
  editedAllocation = false;
  
  constructor(
    private formBuilder: FormBuilder,
              private router: Router,
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      useType: ['', [Validators.required]],
      ostan: ['', [Validators.required]],
      shahr: ['', [Validators.required]],
      rusta: ['', [Validators.required]],
      longitude: ['', [Validators.required]],
      latitude: ['', [Validators.required]],
      ertefa: ['', [Validators.required]],
      ghaleb: ['', [Validators.required]],
      energyDegree: ['', [Validators.required]],

    });
  }

  setEnumUseType(isChange?: boolean): void {

  }
  createPower(): void {}
}
