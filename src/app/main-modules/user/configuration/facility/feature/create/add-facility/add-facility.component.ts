import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MyPattern} from '../../../../../../../shared/tools/myPattern';
import {Facility} from '../../../model/facility';
import {UseTypeEnum} from '../../../model/useTypeEnum';
// @ts-ignore
import Notiflix from 'notiflix';
import {FacilityService} from '../../../service/facility.service';
import {Tools} from '../../../../../../../shared/tools/tools';
import {Moment} from '../../../../../../../shared/tools/moment';
import {CoolingHeatingSystemType, Ownership} from '../../../model/facilityEnum';

@Component({
  selector: 'app-add-facility',
  templateUrl: './add-facility.component.html',
  styleUrls: ['./add-facility.component.scss']
})
export class AddFacilityComponent implements OnInit {
  form: FormGroup;
  myPattern = MyPattern;
  facilityDto = new Facility();
  touched = false;
  useTypeEnum = UseTypeEnum;
  ownershipEnum = Ownership;
  CoolingHeatingSystemTypeEnum = CoolingHeatingSystemType;
  moment = Moment;

  @Input() bId: string;
  @Input() regionId: string;
  @Input() editedFacilityDto = new Facility();
  @Output() nextStep = new EventEmitter<any>();
  @Output() completeStep = new EventEmitter<any>();
  @Output() facilityId = new EventEmitter<any>();

  constructor(private formBuilder: FormBuilder,
              private facilityService: FacilityService) {
    this.facilityDto.constructionYear = this.moment.convertIsoToJDateFa(new Date().toISOString()).split('/')[0];
    console.log('this.facilityDto.constructionYear', this.facilityDto.constructionYear.split('/'));
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.pattern(this.myPattern.faAndEnNumberAndText)]],
      useType: ['', [Validators.required]],
      constructionYear: ['', [Validators.required, Validators.minLength(4), Validators.pattern(this.myPattern.number)]],
      floorNum: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(3), Validators.pattern(this.myPattern.number)]],
      exploitationPersonnelNum: ['', [Validators.required, Validators.minLength(1), Validators.pattern(this.myPattern.number)]],
      postalCode: ['', [Validators.required, Validators.minLength(10), Validators.pattern(this.myPattern.postalCode)]],
      address: ['', [Validators.maxLength(400), Validators.pattern(this.myPattern.faAndEnNumberAndTextParagraph)]],
      ownership: ['', [Validators.required, Validators.pattern(this.myPattern.faAndEnNumberAndText)]],
      coolingHeatingSystemType: ['', [Validators.required, Validators.pattern(this.myPattern.faAndEnNumberAndText)]],
    });
  }

  ngOnInit(): void {
    console.log('if (this.editedFacilityDto)', this.editedFacilityDto);
    console.log('this.regionId', this.regionId);
    console.log('this.bId   +', this.bId);
    if (this.regionId) {
      this.facilityDto.regionId = this.regionId;

      if (this.editedFacilityDto.regionId) {
        this.facilityDto = this.editedFacilityDto;
      }
    }
  }

  updateFacility(): void {
    this.touched = true;
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      Notiflix.Notify.Failure('ورودی رو بررسی کنید!');
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
}
