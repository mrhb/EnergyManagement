import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MyPattern} from '../../../../../../shared/tools/myPattern';
import {FacilityDto} from '../../model/facility';
// @ts-ignore
import Notiflix from 'notiflix';
import {FacilityService} from '../../service/facility.service';
import {Tools} from '../../../../../../shared/tools/tools';
import {Moment} from '../../../../../../shared/tools/moment';
import { FacilityUsageEnum } from '../../model/facilityEnum';
import { UtilityTypeEnum } from '../../../building/model/useTypeEnum';

@Component({
  selector: 'app-add-facility',
  templateUrl: './add-facility.component.html',
  styleUrls: ['./add-facility.component.scss']
})
export class AddFacilityComponent implements OnInit {
  form: FormGroup;
  myPattern = MyPattern;
  facilityDto = new FacilityDto();
  touched = false;
  useTypeEnum = FacilityUsageEnum;
  moment = Moment;
  facilityId = '';

   bId: string;
   facilitySharingId: string;
   editedFacilityDto = new FacilityDto();
  region: any;

  constructor(private formBuilder: FormBuilder,
              private facilityService: FacilityService) {
    // this.facilityDto.constructionYear = this.moment.convertIsoToJDateFa(new Date().toISOString()).split('/')[0];
    // console.log('this.facilityDto.constructionYear', this.facilityDto.constructionYear.split('/'));
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.pattern(this.myPattern.faAndEnNumberAndText)]], //نام تاسیس 
      useType: ['', [Validators.required, Validators.pattern(this.myPattern.faAndEnNumberAndText)]],// نوع کاربری 
      capacitorBank: [''], // بانک خازنی 
      explanation: [''],//توضیحات
      address: [''], //آدرس
    });
  }

  ngOnInit(): void {
    console.log('if (this.editedFacilityDto)', this.editedFacilityDto);
    console.log('this.facilitySharingId', this.facilitySharingId);
    console.log('this.bId   +', this.bId);
    if (this.facilitySharingId) {
      this.facilityDto.facilitySharingId = this.facilitySharingId;

      if (this.editedFacilityDto.facilitySharingId) {
        this.facilityDto = this.editedFacilityDto;
      }
    }
  }

  updateFacility(): void {
    this.facilityDto.utilityType=UtilityTypeEnum[UtilityTypeEnum.FACILITY.toString()];

    this.touched = true;
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      Notiflix.Notify.Failure('ورودی را بررسی کنید!');
      return;
    }
    console.log('this.facilityDto', this.facilityDto);

    if (Tools.isNullOrUndefined(this.bId)) {
      this.facilityService.createFacility(this.facilityDto)
        .subscribe((res: any) => {
          if (res) {
            if (res.data) {
              Notiflix.Notify.Success('افزودن تآسیس با موفقیت انجام شد.');
            }
          }
          console.log('facilityService res', res);
        });
      } else {
        this.facilityService.updateFacility({id: this.bId}, this.facilityDto)
        .subscribe((res: any) => {
          if (res) {
            if (res.data) {
              Notiflix.Notify.Success('ویرایش  تآسیس با موفقیت انجام شد.');
            }
          }
          console.log('facilityService res', res);
        });
    }
  }

  getRegion($event): void {
    // if (this.endActiveStep < 1) {
    //   this.endActiveStep = 1;
    // }
     this.region = $event;
     this.facilityDto.regionId = this.region.regionId;

  }
}
