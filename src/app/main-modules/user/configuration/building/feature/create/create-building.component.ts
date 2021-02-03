import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MyPattern} from '../../../../../../shared/tools/myPattern';
import {Area, Building, CompleteStep, MapInformation, Region, Space, WallInformation} from '../../model/building';
import {ActivatedRoute} from '@angular/router';
import {BuildingService} from '../../service/building.service';
import {UseTypeEnum} from '../../model/useTypeEnum';

@Component({
  selector: 'app-create-building',
  templateUrl: './create-building.component.html',
  styleUrls: ['./create-building.component.scss']
})
export class CreateBuildingComponent implements OnInit {
  form: FormGroup;
  myPattern = MyPattern;
  currentStep = 0;
  endActiveStep = 0;
  region = new Region();
  buildingId: string;
  completeStep = new CompleteStep();

  buildingDto = new Building();
  areaDto = new Area();
  spaceList: Space[] = [];
  mapList: MapInformation[] = [];
  wallInformation = new WallInformation();


  constructor(private formBuilder: FormBuilder,
              private buildingService: BuildingService,
              private activatedRoute: ActivatedRoute) {
    this.form = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(3), Validators.pattern(this.myPattern.nameAndFamily)]],
    });
    this.completeStep.zero = true;
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      console.log('params', params);
      if (params.id) {
        this.buildingId = params.id;
        console.log('this.buildingId', this.buildingId);
        this.getOne(params.id);
      }
    });
  }

  getOne(bId): void {
    console.log(bId);
    this.buildingService.getOneBuilding({id: bId})
      .subscribe((res: any) => {
        if (res) {
          console.log('getOneBuilding res', res);
          this.region.regionId = res.data.regionId;

          this.buildingDto.regionTitle = res.data.regionTitle;

          // building
          this.buildingDto.regionId = res.data.regionId;
          this.buildingDto.name = res.data.name;
          this.buildingDto.useType = res.data.useType;
          this.buildingDto.constructionYear = res.data.constructionYear;
          this.buildingDto.floorNum = res.data.floorNum;
          this.buildingDto.exploitationPersonnelNum = res.data.exploitationPersonnelNum;
          this.buildingDto.postalCode = res.data.postalCode;
          this.buildingDto.address = res.data.address;
          this.buildingDto.ownership = res.data.ownership;
          this.buildingDto.coolingHeatingSystemType = res.data.coolingHeatingSystemType;

          if (this.buildingDto.name) {
            this.completeStep.one = true;
            this.endActiveStep = 2;
          }

          // area
          this.areaDto.arenaArea = res.data.arenaArea;
          this.areaDto.ayanArea = res.data.ayanArea;
          this.areaDto.useFullArea = res.data.useFullArea;
          this.areaDto.externalWallsTotalArea = res.data.externalWallsTotalArea;
          this.areaDto.externalGlassTotalArea = res.data.externalGlassTotalArea;
          if (this.areaDto.arenaArea) {
            this.completeStep.two = true;
          }

          // space
          this.spaceList = res.data.spaceList;
          if (this.spaceList.length > 0) {
            this.completeStep.three = true;
          }

          // map
          this.mapList = res.data.mapInformationList;
          if (this.mapList.length > 0) {
            this.completeStep.four = true;
          }

          // wall information
          this.wallInformation = res.data.wallInformation;
          if (this.wallInformation) {
            this.completeStep.five = true;
          }

          // this.currentStep = 0;
          // this.endActiveStep = 0;

        }
      });
  }

  getStep(currentStep): void {
    this.currentStep = currentStep;
  }

  getComplete(complete): void {
    if (this.endActiveStep < complete) {
      this.endActiveStep = complete;
    }
    switch (complete) {
      case 0: {
        this.completeStep.zero = true;
        break;
      }
      case 1: {
        if (this.endActiveStep < 2) {
          this.endActiveStep = 2;
        }
        this.completeStep.one = true;
        break;
      }
      case 2: {
        this.completeStep.two = true;
        break;
      }
      case 3: {
        this.completeStep.three = true;
        break;
      }
      case 4: {
        this.completeStep.four = true;
        break;
      }
      case 5: {
        this.completeStep.five = true;
        break;
      }
    }
  }

  getCurrentStep(Step): void {
    if (this.region.regionId === undefined && Step > 0 || this.buildingId === undefined && Step > 1) {
      return;
    }
    this.currentStep = Step;
  }

  getRegion($event): void {
    if (this.endActiveStep < 1) {
      this.endActiveStep = 1;
    }
    this.region = $event;

    // this.buildingDto.regionTitle = this.region.regionTitle.replace('&', '<span class="fa fa-angle-left mx-2"></span>');
    this.buildingDto.regionTitle = this.region.regionTitle.split('&').join('<span class="fa fa-angle-left mx-2"></span>');
  }

  getBuildingId($event: any): void {
    this.buildingId = $event;
  }
}
