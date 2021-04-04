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
import { RegionService } from '../../../region/service/region.service';
import { ActivatedRoute } from '@angular/router';

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
  edited: boolean=false;
  router: any;

  constructor(
    private stateService:RegionService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private facilityService: FacilityService
    ) {
    // this.facilityDto.constructionYear = this.moment.convertIsoToJDateFa(new Date().toISOString()).split('/')[0];
    // console.log('this.facilityDto.constructionYear', this.facilityDto.constructionYear.split('/'));
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.pattern(this.myPattern.faAndEnNumberAndText)]], //نام تاسیس 
      useType: ['', [Validators.required, Validators.pattern(this.myPattern.faAndEnNumberAndText)]],// نوع کاربری 
      capacitorBank: [''], // بانک خازنی 
      explanation: [''],//توضیحات
      address: [''], //آدرس
    });

    this.activatedRoute.queryParams.subscribe(params => {
      console.log('params', params);
      if (params.id) {
        this.edited = true;
        this.bId= params.id;
        this.getOne(params.id);
      }
    });
  }

  getOne(gId): void {
    this.facilityService.getOneFacility({id: gId})
      .subscribe((res: any) => {
        if (res) {
          this.facilityDto = res.data;
        }
      });
  }

  ngOnInit(): void {
    this.stateService.regionId.subscribe(reg=>{
      this.facilityDto.regionId=reg;
    });
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

    if (!this.edited) {
      this.facilityService.createFacility(this.facilityDto)
        .subscribe((res: any) => {
          if (res) {
            if (res.data) {
              this.bId=res.data;
              this.edited=true;
              Notiflix.Notify.Success('افزودن تآسیس با موفقیت انجام شد.');
              this.router.navigate(['/index/user/configuration/facilityList']).then();

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
}
