import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MyPattern} from '../../../../../../../shared/tools/myPattern';
import {Area} from '../../../model/facility';
import {FacilityService} from '../../../service/facility.service';
// @ts-ignore
import Notiflix from 'notiflix';

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.scss']
})
export class AreaComponent implements OnInit {
  form: FormGroup;
  myPattern = MyPattern;
  areaDto = new Area();
  touched = false;

  @Input() facilityId: string;
  @Input() editedAreaDto = new Area();
  @Output() nextStep = new EventEmitter<any>();
  @Output() completeStep = new EventEmitter<any>();
  constructor(private formBuilder: FormBuilder,
              private facilityService: FacilityService) {
    this.form = this.formBuilder.group({
      arenaArea: ['', [Validators.required, Validators.minLength(1), Validators.pattern(this.myPattern.number)]],
      ayanArea: ['', [Validators.required, Validators.minLength(1), Validators.pattern(this.myPattern.number)]],
      useFullArea: ['', [Validators.required, Validators.minLength(1), Validators.pattern(this.myPattern.number)]],
      externalWallsTotalArea: ['', [Validators.required, Validators.minLength(1), Validators.pattern(this.myPattern.number)]],
      externalGlassTotalArea: ['', [Validators.required, Validators.minLength(1), Validators.pattern(this.myPattern.number)]],
    });
  }

  ngOnInit(): void {
    console.log('this.regionId', this.facilityId);
    if (this.facilityId) {
      console.log('this.editedAreaDto', this.editedAreaDto);
      if (this.editedAreaDto.arenaArea) {
        this.areaDto = this.editedAreaDto;
      }
    }
  }

  goBack(): void {
    this.nextStep.emit(1);
  }

  createArea(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      Notiflix.Notify.Failure('ورودی رو بررسی کنید!');
      return;
    }

    this.facilityService.createArea({id: this.facilityId}, this.areaDto)
      .subscribe( (res: any) => {
        if (res) {
          if (res.flag && res.data) {
            this.nextStep.emit(3);
            this.completeStep.emit(2);
          }
        }
      });
  }
}
