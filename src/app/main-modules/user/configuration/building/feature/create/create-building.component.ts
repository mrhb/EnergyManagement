import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MyPattern} from '../../../../../../shared/tools/myPattern';
import {Area, Building, CompleteStep, MapInformation, Space, WallInformation} from '../../model/building';
import {BuildingService} from '../../service/building.service';
import {UseTypeBuildingEnum, UtilityTypeEnum} from '../../model/useTypeEnum';
import {HeatingSystemType,CoolingSystemType, Ownership} from '../../model/buildingEnum';

import { RegionService } from '../../../region/service/region.service';
import { ActivatedRoute, Router } from '@angular/router';
import {Tools} from '../../../../../../shared/tools/tools';
import {Moment} from '../../../../../../shared/tools/moment';
import {GATEWAY_URL} from '../../../../../../_base/service/model/rest-constants';
import {MapEnum} from '../../model/map';

import Notiflix from 'notiflix';
declare var $: any;


@Component({
  selector: 'app-create-building',
  templateUrl: './create-building.component.html',
  styleUrls: ['./create-building.component.scss']
})
export class CreateBuildingComponent implements OnInit {
   myPattern = MyPattern;
  
   form: FormGroup;
  buildingDto = new Building();

  spaceForm: FormGroup;
  spaceDto = new Space();
  spaceList: Space[] = [];
  spaceEdited = false;

  mapForm: FormGroup;
  mapDto = new MapInformation();
  mapList: MapInformation[] = [];
  mapEnum = MapEnum;
  pathUrl = '';
  mapEdited = false;

  wallForm: FormGroup;
  wallInformation = new WallInformation();

  touched = false;
  useTypeEnum = UseTypeBuildingEnum;
  ownershipEnum = Ownership;
  coolingSystemTypeEnum = CoolingSystemType;
  heatingSystemTypeEnum = HeatingSystemType;
  moment = Moment;
  
  currentStep = 0;
  endActiveStep = 0;
  region ="";
  buildingId: string;
  completeStep = new CompleteStep();
  
  // areaDto = new Area();
  stateServiceRegion_subscribe: any;
  stateServiceRegionId_subscribe: any;
  regionId: string;


//   this.form = this.formBuilder.group({
//     firstName: ['', [Validators.required, Validators.minLength(3), Validators.pattern(this.myPattern.nameAndFamily)]],
//   });
//   this.completeStep.zero = true;
// }

constructor(private formBuilder: FormBuilder,
  private buildingService: BuildingService,
  private stateService:RegionService,
  public router: Router,
  private activatedRoute: ActivatedRoute) {
    this.buildingDto.constructionYear = this.moment.convertIsoToJDateFa(new Date().toISOString()).split('/')[0];
    // متغیرهای ساختمان
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.pattern(this.myPattern.faAndEnNumberAndText)]],
      useType: ['', [Validators.required]],
      constructionYear: ['', [Validators.required, Validators.minLength(4), Validators.pattern(this.myPattern.number)]],
      floorNum: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(3), Validators.pattern(this.myPattern.number)]],
      exploitationPersonnelNum: ['', [Validators.required, Validators.minLength(1), Validators.pattern(this.myPattern.number)]],
      postalCode: ['', [ Validators.minLength(10), Validators.pattern(this.myPattern.postalCode)]],
      address: ['', [Validators.maxLength(400), Validators.pattern(this.myPattern.faAndEnNumberAndTextParagraph)]],
      ownership: ['', [Validators.required, Validators.pattern(this.myPattern.faAndEnNumberAndText)]],
      coolingSystemType: ['', [Validators.required, Validators.pattern(this.myPattern.faAndEnNumberAndText)]],
      heatingSystemType: ['', [Validators.required, Validators.pattern(this.myPattern.faAndEnNumberAndText)]],
      powerSharingNum: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(3), Validators.pattern(this.myPattern.number)]],
      gasSharingNum: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(3), Validators.pattern(this.myPattern.number)]],
      waterSharingNum: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(3), Validators.pattern(this.myPattern.number)]],
      nonEnergyCarrierSharingNum: ['', [Validators.minLength(1), Validators.maxLength(3), Validators.pattern(this.myPattern.number)]],
      arenaArea: ['', [Validators.required, Validators.minLength(1), Validators.pattern(this.myPattern.number)]],
      ayanArea: ['', [Validators.required, Validators.minLength(1), Validators.pattern(this.myPattern.number)]],
      useFullArea: ['', [Validators.required, Validators.minLength(1), Validators.pattern(this.myPattern.number)]],
      externalWallsTotalArea: ['', [Validators.minLength(1), Validators.pattern(this.myPattern.number)]],
      externalGlassTotalArea: ['', [Validators.minLength(1), Validators.pattern(this.myPattern.number)]],
          }, {
            validators: this.checkAreaValidators('ayanArea', 'useFullArea')
          });
    // متغیرهای فضا
    this.spaceForm = this.formBuilder.group({
      name: ['', [ Validators.minLength(1), Validators.pattern(this.myPattern.faAndEnNumberAndText)]],
      number: ['', [ Validators.minLength(1), Validators.pattern(this.myPattern.number)]],
      floorNum: ['', [ Validators.minLength(1), Validators.pattern(this.myPattern.number)]],
      useType: ['', [ Validators.minLength(1), Validators.pattern(this.myPattern.faAndEnNumberAndText)]],
      area: ['', [ Validators.minLength(1), Validators.pattern(this.myPattern.number)]],
    });
    // متغیرهای نقشه
    this.mapForm = this.formBuilder.group({
      title: ['', [ Validators.minLength(1), Validators.pattern(this.myPattern.faAndEnNumberAndText)]],
      category: ['', [ Validators.minLength(1), Validators.pattern(this.myPattern.faAndEnNumberAndText)]],
      number: ['', [ Validators.minLength(1), Validators.pattern(this.myPattern.faAndEnNumberAndText)]],
    });
    this.pathUrl = GATEWAY_URL + '/api/file/get?link=';
    // متغیرهای جداره ها
    this.wallForm = this.formBuilder.group({
      exWallAdjOutSpaceArea: ['', [ Validators.minLength(1), Validators.pattern(this.myPattern.number)]],
      exFloorAdjOutSpaceArea: ['', [ Validators.minLength(1), Validators.pattern(this.myPattern.number)]],
      exWallAdjNotControlledSpaceArea: ['', [ Validators.minLength(1), Validators.pattern(this.myPattern.number)]],
      exFloorAdjNotControlledSpaceArea: ['', [ Validators.minLength(1), Validators.pattern(this.myPattern.number)]],
      exRoofAdjOutSpaceArea: ['', [Validators.minLength(1), Validators.pattern(this.myPattern.number)]],
      outWindowAdjOutSpaceArea: ['', [ Validators.minLength(1), Validators.pattern(this.myPattern.number)]],
      exRoofAdjNotControlledSpaceArea: ['', [ Validators.minLength(1), Validators.pattern(this.myPattern.number)]],
      windowAdjNotControlledSpaceArea: ['', [ Validators.minLength(1), Validators.pattern(this.myPattern.number)]],
    });
  }

  
 
  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      console.log('params', params);
      if (params.id) {
        this.buildingId = params.id;
        console.log('this.buildingId', this.buildingId);
        this.getOne(params.id);
      }
      this.stateService.regionId.subscribe(reg=>{
        this.buildingDto.regionId=reg;
      });
      this.stateService.region.subscribe(reg=>{
        this.region=reg;
      });
    });

    this.stateServiceRegion_subscribe=this.stateService.region.subscribe(reg=>{
      this.region=reg;
  });
    this.stateServiceRegionId_subscribe= this.stateService.regionId.subscribe(reg=>{
      this.regionId=reg;
    });
  }

  getOne(buildingId): void {
    console.log(buildingId);
    this.buildingService.getOneBuilding({id: buildingId})
      .subscribe((res: any) => {
        if (res) {
          console.log('getOneBuilding res', res);
          this.regionId = res.data.regionId;

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
          this.buildingDto.coolingSystemType = res.data.coolingSystemType;
          this.buildingDto.heatingSystemType = res.data.heatingSystemType;
          this.buildingDto.powerSharingNum = res.data.powerSharingNum;
          this.buildingDto.gasSharingNum = res.data.gasSharingNum;
          this.buildingDto.waterSharingNum = res.data.waterSharingNum;
          this.buildingDto.nonEnergyCarrierSharingNum = res.data.nonEnergyCarrierSharingNum;
       
          // area
          this.buildingDto.arenaArea = res.data.arenaArea;          
          this.buildingDto.ayanArea = res.data.ayanArea;          
          this.buildingDto.useFullArea = res.data.useFullArea;          
          this.buildingDto.externalWallsTotalArea = res.data.externalWallsTotalArea;          
          this.buildingDto.externalGlassTotalArea = res.data.externalGlassTotalArea;          
                                      
          if (this.buildingDto.name) {
            this.completeStep.one = true;
            this.endActiveStep = 2;
          }
          
          // space
          this.spaceList = res.data.spaceList;
          // if (this.spaceList.length > 0) {
            // this.completeStep.three = true;
          // }
          // area
          // this.areaDto.arenaArea = res.data.arenaArea;          
          // this.areaDto.ayanArea = res.data.ayanArea;
          // this.areaDto.useFullArea = res.data.useFullArea;
          // this.areaDto.externalWallsTotalArea = res.data.externalWallsTotalArea;
          // this.areaDto.externalGlassTotalArea = res.data.externalGlassTotalArea;
          // if (this.buildingDto.arenaArea) {
          //   this.completeStep.two = true;
          // }


          // map
          this.mapList = res.data.mapInformationList;
          if (this.mapList.length > 0) {
            this.completeStep.four = true;
          }

          // wall information
          this.wallInformation = res.data.wallInformation;
          if (!this.wallInformation) {
            this.wallInformation=new WallInformation();
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

  // getComplete(complete): void {
  //   if (this.endActiveStep < complete) {
  //     this.endActiveStep = complete;
  //   }
  //   switch (complete) {
  //     case 0: {
  //       this.completeStep.zero = true;
  //       break;
  //     }
  //     case 1: {
  //       if (this.endActiveStep < 2) {
  //         this.endActiveStep = 2;
  //       }
  //       this.completeStep.one = true;
  //       break;
  //     }
  //     case 2: {
  //       this.completeStep.two = true;
  //       break;
  //     }
  //     case 3: {
  //       this.completeStep.three = true;
  //       break;
  //     }
  //     case 4: {
  //       this.completeStep.four = true;
  //       break;
  //     }
  //     case 5: {
  //       this.completeStep.five = true;
  //       break;
  //     }
  //   }
  // }

  // getCurrentStep(Step): void {
  //   if (this.regionId === undefined && Step > 0 || this.buildingId === undefined && Step > 1) {
  //     return;
  //   }
  //   this.currentStep = Step;
  // }

  // بررسی کد پستی تکراری
  checkPostalCodeIsExist(): void {
    if (!Tools.isNullOrUndefined(this.buildingDto.postalCode) && this.buildingDto.postalCode.length === 10) {
      this.buildingService.checkPostalCodeService(this.buildingDto.postalCode)
        .subscribe((res: any) => {
          if (res) {
            if (res.data && res.flag) {
              Notiflix.Notify.Failure('کد پستی وارد شده تکراری می باشد.');
              this.buildingDto.postalCode = '';
            }
          }
        });
    }
  }


  getBuildingId($event: any): void {
    this.buildingId = $event;
  }
  // مقایسه مساحت عرصه و اعیان
  checkAreaValidators(item1: any, item2: any): (group: FormGroup) => any {
    return (group: FormGroup) => {

      if (  group.controls[item1].value<  group.controls[item2].value) {
        Notiflix.Notify.Failure('مساحت اعیان باید از مساحت مفید بیشتر باشد');  
      }
    };
  }
  
  // مقایسه مساحت مفید و اعیان
  checkAreaValidators1(item1: any, item2: any): (group: FormGroup) => any {
    return (group: FormGroup) => {

      if (  group.controls[item1].value<  group.controls[item2].value) {
        Notiflix.Notify.Failure('مساحت عرصه باید از مساحت اعیان بیشتر باشد');      
      }
    };
  }
  // بررسی اطلاعات ساختمان
  updateBuilding(): void {
    this.buildingDto.utilityType=UtilityTypeEnum[UtilityTypeEnum.BUILDING.toString()];
    this.touched = true;
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      Notiflix.Notify.Failure('ورودی رو بررسی کنید!');
      return;
    }
    console.log('this.buildingDto', this.buildingDto);
    console.log('this.buildingId', this.buildingId);
    console.log('!this.buildingId', this.buildingId);

    if (Tools.isNullOrUndefined(this.buildingId)) {
      this.buildingService.createBuilding(this.buildingDto)
        .subscribe((res: any) => {
          if (res) {
            if (res.data) {
              // this.buildingId.emit(res.data);
              // this.nextStep.emit(2);
              // this.completeStep.emit(1);
              Notiflix.Notify.Success('تعریف ساختمان با موفقیت انجام شد.');
              this.router.navigate(['/index/user/configuration/buildingList']);
            }
          }
          console.log('buildingService res', res);
        });
    } else {
      this.buildingService.updateBuilding({id: this.buildingId}, this.buildingDto)
        .subscribe((res: any) => {
          if (res) {
            if (res.data) {
              // this.buildingId.emit(res.data);
              // this.nextStep.emit(2);
              Notiflix.Notify.Success('ویرایش ساختمان با موفقیت انجام شد.');
              this.router.navigate(['/index/user/configuration/buildingList']);
            }
          }
          console.log('buildingService res', res);
        });
    }
  }


// بررسی اطلاعات فضاها
createSpace(): void {
  if (this.spaceForm.invalid) {
    this.spaceForm.markAllAsTouched();
    Notiflix.Notify.Failure('ورودی رو بررسی کنید!');
    return;
  }

  if (!this.spaceEdited) {
    this.buildingService.createSpace({id: this.buildingId}, this.spaceDto)
      .subscribe((res: any) => {
        if (res) {
          if (res.flag && res.data) {
            this.spaceDto.id = res.data;
            this.spaceList.push(JSON.parse(JSON.stringify(this.spaceDto)));
            this.spaceDto = new Space();
            this.spaceForm.reset();
          }
        }
      });
  } else {
    this.spaceEdited = false;
    this.buildingService.updateSpace({id: this.buildingId}, this.spaceDto)
      .subscribe((res: any) => {
        if (res) {
          if (res.flag && res.data) {
            const index = this.spaceList.findIndex(e => e.id === this.spaceDto.id);
            if (index !== -1) {
              this.spaceList[index] = this.spaceDto;
            }
            this.spaceDto = new Space();
            this.spaceForm.reset();
          }
        }
      });
  }

}

// ویرایش فضا
editSpace(item: Space): void {
  this.spaceEdited = true;
  this.spaceDto = JSON.parse(JSON.stringify(item));
}

// حذف فضا
deleteSpace(i: number, sId): void {
  Notiflix.Confirm.Show(
    'حذف فضا',
    'آیا اطمینان دارید که فضا حذف گردد؟',
    'بله',
    'خیر',
    () => {
      this.buildingService.deleteSpace({id: this.buildingId, spaceId: sId})
        .subscribe((res: any) => {
          if (res) {
            Notiflix.Notify.Success('حذف فضا با موفقیت انجام گردید');
            this.spaceList.splice(i, 1);

            if (this.spaceList.length < 1) {
              this.spaceDto = new Space();
              this.spaceForm.reset();
            }
          }
        });
    });
}
// لغو فضا
spaceCancel(): void {
  this.spaceEdited = false;
  this.spaceDto = new Space();
  this.spaceForm.reset();
}
// ایجاد نقشه
createMap(): void {
  if (this.mapForm.invalid) {
    this.mapForm.markAllAsTouched();
    Notiflix.Notify.Failure('ورودی رو بررسی کنید!');
    return;
  }

  if (!this.mapDto.fileLink) {
    Notiflix.Notify.Failure('ارسال نقشه الزامی است!');
    return;
  }

  if (!this.mapEdited) {
    this.buildingService.createMap({id: this.buildingId}, this.mapDto)
      .subscribe((res: any) => {
        if (res) {
          if (res.flag && res.data) {
            this.mapDto.id = res.data;
            this.mapList.push(JSON.parse(JSON.stringify(this.mapDto)));
            this.mapDto = new MapInformation();
            this.mapForm.reset();
          }
        }
      });
  } else {
    this.mapEdited = false;
    this.buildingService.updateMap({id: this.buildingId}, this.mapDto)
      .subscribe((res: any) => {
        if (res) {
          if (res.flag && res.data) {
            const index = this.mapList.findIndex(e => e.id === this.mapDto.id);
            if (index !== -1) {
              this.mapList[index] = this.mapDto;
            }
            this.mapDto = new MapInformation();
            this.mapForm.reset();
          }
        }
      });
  }

}
// ویرایش نقشه
editMap(item: MapInformation): void {
  this.mapEdited = true;
  this.mapDto = JSON.parse(JSON.stringify(item));
}
// حذف اطلاعات نقشه
deleteMap(i: number, sId): void {
  Notiflix.Confirm.Show(
    'حذف فضا',
    'آیا اطمینان دارید که نقشه حذف گردد؟',
    'بله',
    'خیر',
    () => {
      this.buildingService.deleteMap({id: this.buildingId, mapId: sId})
        .subscribe((res: any) => {
          if (res) {
            Notiflix.Notify.Success('حذف نقشه با موفقیت انجام گردید');
            this.mapList.splice(i, 1);

            if (this.mapList.length < 1) {
              this.mapDto = new MapInformation();
              this.mapForm.reset();
            }
          }
        });
    });
}
// حذف نقشه
mapCancel(): void {
  this.mapEdited = false;
  this.mapDto = new MapInformation();
  this.mapForm.reset();
}
// بارگذاری نقشه
mapUploading($event): void {
  if ($event) {
    this.mapDto.fileLink = $event;
  }
}

// ایجاد جداره ها
createWallInformation(): void {
  if (this.wallForm.invalid) {
    this.wallForm.markAllAsTouched();
    Notiflix.Notify.Failure('ورودی رو بررسی کنید!');
    return;
  }

  this.buildingService.updateWallInformation({id: this.buildingId}, this.wallInformation)
    .subscribe( (res: any) => {  
      if (res) {
      if (res.data) {
          Notiflix.Notify.Success('اطلاعات جداره ها با موفقیت انجام شد.');
          
            this.router.navigate(['/index/user/configuration/buildingList']);
          }  
        }
      });
    // } else {
    //   this.buildingService.updateWallInformation({id: this.buildingId}, this.wallInformation)
    //   .subscribe((res: any) => {
    //     if (res) {
    // if (res.data) {
    //   Notiflix.Notify.Success('ویرایش ساختمان با موفقیت انجام شد.');
    //   this.router.navigate(['/index/user/configuration/buildingList']);
    // }
  }
   
}


   
  
    