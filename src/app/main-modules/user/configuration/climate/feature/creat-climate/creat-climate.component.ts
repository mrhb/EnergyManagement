import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClimateDto } from '../../model/climate';
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
