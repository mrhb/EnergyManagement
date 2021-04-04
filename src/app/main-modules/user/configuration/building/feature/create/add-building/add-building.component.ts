import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MyPattern} from '../../../../../../../shared/tools/myPattern';
import {Building} from '../../../model/building';
import {UseTypeBuildingEnum, UtilityTypeEnum} from '../../../model/useTypeEnum';
import {HeatingSystemType,CoolingSystemType, Ownership} from '../../../model/buildingEnum';
import {Router} from '@angular/router';
// @ts-ignore
import Notiflix from 'notiflix';
import {BuildingService} from '../../../service/building.service';
import {Tools} from '../../../../../../../shared/tools/tools';
import {Moment} from '../../../../../../../shared/tools/moment';

@Component({
  selector: 'app-add-building',
  templateUrl: './add-building.component.html',
  styleUrls: ['./add-building.component.scss']
})
export class AddBuildingComponent implements OnInit {
  form: FormGroup;
  myPattern = MyPattern;
  buildingDto = new Building();
  touched = false;
  useTypeEnum = UseTypeBuildingEnum;
  ownershipEnum = Ownership;
  coolingSystemTypeEnum = CoolingSystemType;
  heatingSystemTypeEnum = HeatingSystemType;
  moment = Moment;

  @Input() bId: string;
  @Input() regionId: string;
  @Input() editedBuildingDto = new Building();
  @Output() nextStep = new EventEmitter<any>();
  @Output() completeStep = new EventEmitter<any>();
  @Output() buildingId = new EventEmitter<any>();

  constructor(private formBuilder: FormBuilder,
    public router: Router,
    private buildingService: BuildingService) {
    this.buildingDto.constructionYear = this.moment.convertIsoToJDateFa(new Date().toISOString()).split('/')[0];
    console.log('this.buildingDto.constructionYear', this.buildingDto.constructionYear.split('/'));
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.pattern(this.myPattern.faAndEnNumberAndText)]],
      useType: ['', [Validators.required]],
      constructionYear: ['', [Validators.required, Validators.minLength(4), Validators.pattern(this.myPattern.number)]],
      floorNum: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(3), Validators.pattern(this.myPattern.number)]],
      exploitationPersonnelNum: ['', [Validators.required, Validators.minLength(1), Validators.pattern(this.myPattern.number)]],
      postalCode: ['', [Validators.required, Validators.minLength(10), Validators.pattern(this.myPattern.postalCode)]],
      address: ['', [Validators.maxLength(400), Validators.pattern(this.myPattern.faAndEnNumberAndTextParagraph)]],
      ownership: ['', [Validators.required, Validators.pattern(this.myPattern.faAndEnNumberAndText)]],
      coolingSystemType: ['', [Validators.required, Validators.pattern(this.myPattern.faAndEnNumberAndText)]],
      heatingSystemType: ['', [Validators.required, Validators.pattern(this.myPattern.faAndEnNumberAndText)]],
      powerSharingNum: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(3), Validators.pattern(this.myPattern.number)]],
      gasSharingNum: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(3), Validators.pattern(this.myPattern.number)]],
      waterSharingNum: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(3), Validators.pattern(this.myPattern.number)]],
      nonEnergyCarrierSharingNum: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(3), Validators.pattern(this.myPattern.number)]],
      arenaArea: ['', [Validators.required, Validators.minLength(1), Validators.pattern(this.myPattern.number)]],
      ayanArea: ['', [Validators.required, Validators.minLength(1), Validators.pattern(this.myPattern.number)]],
      useFullArea: ['', [Validators.required, Validators.minLength(1), Validators.pattern(this.myPattern.number)]],
      externalWallsTotalArea: ['', [Validators.required, Validators.minLength(1), Validators.pattern(this.myPattern.number)]],
      externalGlassTotalArea: ['', [Validators.required, Validators.minLength(1), Validators.pattern(this.myPattern.number)]],
                }, {
      validators: this.checkAreaValidators('arenaArea', 'ayanArea')
    });
  }
 

  ngOnInit(): void {
    console.log('if (this.editedBuildingDto)', this.editedBuildingDto);
    console.log('this.regionId', this.regionId);
    console.log('this.bId   +', this.bId);
    if (this.regionId) {
      this.buildingDto.regionId = this.regionId;

      if (this.editedBuildingDto.regionId) {
        this.buildingDto = this.editedBuildingDto;
      }
    }
  }

  updateBuilding(): void {
    this.buildingDto.utilityType=UtilityTypeEnum[UtilityTypeEnum.BUILDING.toString()];
    this.touched = true;
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      Notiflix.Notify.Failure('ورودی رو بررسی کنید!');
      return;
    }
    console.log('this.buildingDto', this.buildingDto);
    console.log('this.bId', this.bId);
    console.log('!this.bId', this.bId);

    if (Tools.isNullOrUndefined(this.bId)) {
      this.buildingService.createBuilding(this.buildingDto)
        .subscribe((res: any) => {
          if (res) {
            if (res.data) {
              this.buildingId.emit(res.data);
              this.nextStep.emit(2);
              this.completeStep.emit(1);
              Notiflix.Notify.Success('تعریف ساختمان با موفقیت انجام شد.');
              this.router.navigate(['/index/user/configuration/buildingList']);
            }
          }
          console.log('buildingService res', res);
        });
    } else {
      this.buildingService.updateBuilding({id: this.bId}, this.buildingDto)
        .subscribe((res: any) => {
          if (res) {
            if (res.data) {
              this.buildingId.emit(res.data);
              this.nextStep.emit(2);
              Notiflix.Notify.Success('ویرایش ساختمان با موفقیت انجام شد.');
              this.router.navigate(['/index/user/configuration/buildingList']);
            }
          }
          console.log('buildingService res', res);
        });
    }
  }
  // navigate(): void {   
  //   this.router.navigate([window.location.hash.split('#/')[1].split('?')[0]], {
  //     queryParams: {
  //       // pageIndex: this.pageIndex,
  //       // pageSize: this.pageSize,
  //     },
  //   });

  // }

 goBack(): void {
    this.nextStep.emit(0);
  }
  checkAreaValidators(item1: any, item2: any): (group: FormGroup) => any {
    return (group: FormGroup) => {

      if (  group.controls[item1].value<  group.controls[item2].value) {
        Notiflix.Notify.Failure('مساحت عرصه باید از مساحت اعیان بیشتر باشد');      
      }
    };
  }
}
