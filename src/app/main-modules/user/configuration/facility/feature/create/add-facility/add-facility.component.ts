import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MyPattern} from '../../../../../../../shared/tools/myPattern';
import {FacilityDto} from '../../../model/facility';
// @ts-ignore
import Notiflix from 'notiflix';
import {FacilityService} from '../../../service/facility.service';
import {Tools} from '../../../../../../../shared/tools/tools';
import {Moment} from '../../../../../../../shared/tools/moment';
import {FacilityUsage} from '../../../model/facilityEnum';

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
  facilityUsageEnum = FacilityUsage;
  moment = Moment;
  // facilityId = '';

  @Input() bId: string;
  @Input() facilitySharingId: string;
  @Input() editedFacilityDto = new FacilityDto();
  @Output() nextStep = new EventEmitter<any>();
  @Output() completeStep = new EventEmitter<any>();
  @Output() facilityId = new EventEmitter<any>();

  constructor(private formBuilder: FormBuilder,
              private facilityService: FacilityService) {
    // this.facilityDto.constructionYear = this.moment.convertIsoToJDateFa(new Date().toISOString()).split('/')[0];
    // console.log('this.facilityDto.constructionYear', this.facilityDto.constructionYear.split('/'));
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.pattern(this.myPattern.faAndEnNumberAndText)]], //نام تاسیس 
      facilityUsage: ['', [Validators.required, Validators.pattern(this.myPattern.faAndEnNumberAndText)]],// نوع کاربری 
      CapacitorBank: [''], // بانک خازنی 
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
    this.touched = true;
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      Notiflix.Notify.Failure('ورودی را بررسی کنید!');
      return;
    }
    console.log('this.facilityDto', this.facilityDto);
    console.log('this.bId', this.bId);
    console.log('!this.bId', this.bId);

    if (Tools.isNullOrUndefined(this.bId)) {
      this.facilityService.createFacility(this.facilityDto)
        .subscribe((res: any) => {
          if (res) {
            if (res.data) {
              this.facilityId.emit(res.data);
              this.nextStep.emit(2);
              this.completeStep.emit(1);
            }
          }
          console.log('facilityService res', res);
        });
    } else {
      this.facilityService.updateFacility({id: this.bId}, this.facilityDto)
        .subscribe((res: any) => {
          if (res) {
            if (res.data) {
              this.facilityId.emit(res.data);
              this.nextStep.emit(2);
            }
          }
          console.log('facilityService res', res);
        });
    }
  }

  goBack(): void {
    this.nextStep.emit(0);
  }
  
  getRegion($event): void {
    // if (this.endActiveStep < 1) {
    //   this.endActiveStep = 1;
    // }
    // this.region = $event;

    // // this.buildingDto.regionTitle = this.region.regionTitle.replace('&', '<span class="fa fa-angle-left mx-2"></span>');
    // this.buildingDto.regionTitle = this.region.regionTitle.split('&').join('<span class="fa fa-angle-left mx-2"></span>');
  }
}
