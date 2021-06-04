import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MyPattern } from 'src/app/shared/tools/myPattern';
import { UseTypeBuildingEnum } from '../../configuration/building/model/useTypeEnum';
import { ClimateTypeEnum } from '../../configuration/climate/model/climateEnum';
import { StateService } from '../state.service';
import { EnergyLabel, EnergyLableDto } from './model/energyLabel';
import { EnergyLabelTypeEnum } from './model/EnergyLabelType';
import { EnergyLabelService } from './service/energy-label.service';
import { LabelService } from './service/label.service';

@Component({
  selector: 'app-energy-label',
  templateUrl: './energy-label.component.html',
  styleUrls: ['./energy-label.component.scss']
})
export class EnergyLabelComponent implements OnInit {
  pageSize = 20;
  pageIndex = 0;
  length = -1;
  totalPages = 1;
  
  myPattern = MyPattern;
  form: FormGroup;
  touched = false;
  energyLableDto =new  EnergyLableDto();
  buildingList = [];
  useTypeBuildingEnum = UseTypeBuildingEnum;
  energyLabelTypeEnum = EnergyLabelTypeEnum;
  climateTypeEnum=ClimateTypeEnum;
  regionId ="111111111111111111111111";


  energyLabel:EnergyLabel = {
    consumptionIndex: '1277',
    label: 'A',
    labelType: EnergyLabelTypeEnum.RESIDENTIALLARG,
    ratio: '10.98'
  };
  
constructor(private formBuilder: FormBuilder,
  private buildingService: EnergyLabelService,
  private labelService: LabelService,
  private stateService:StateService,
  public router: Router,

  ) { 
  this.form = this.formBuilder.group({
    year: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(3), Validators.pattern(this.myPattern.number)]],
    energyLabelType: [''],
  }, {
  });
  // تعریف متغیرها
}

  ngOnInit(): void {
    this.energyLableDto.year = 1399;
    this.energyLableDto.energyLabelType=EnergyLabelTypeEnum[EnergyLabelTypeEnum.OFFICIAL.toString()] ;
    this.stateService.regionId.subscribe(reg=>{
      this.regionId=reg;
      this.getBuildingList();
    });
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

  getBuildingLabel(buildingId): void {
    this.energyLableDto.buildingId=buildingId;//"607d3c195eb88805b4c98934";
    this.labelService.getLabel('',this.energyLableDto).subscribe((res: any) => {
      if (res) {

        this.energyLabel.ratio = res.data.ratio;
        this.energyLabel.consumptionIndex = res.data.ConsumptionIndex;
        // this.energyLabel.labelType=EnergyLabelType.RESIDENTIAL;
        this.energyLabel.label= res.data.label;
      }
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

}
