import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MyPattern} from '../../../../../../../shared/tools/myPattern';
import {Area, Building} from '../../../model/building';
import {UseTypeEnum} from '../../../model/useTypeEnum';
import {BuildingService} from '../../../service/building.service';
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

  @Input() buildingId: string;
  @Output() nextStep = new EventEmitter<any>();
  constructor(private formBuilder: FormBuilder,
              private buildingService: BuildingService) {
    this.form = this.formBuilder.group({
      arenaArea: ['', [Validators.required, Validators.minLength(1), Validators.pattern(this.myPattern.number)]],
      ayanArea: ['', [Validators.required, Validators.minLength(1), Validators.pattern(this.myPattern.number)]],
      useFullArea: ['', [Validators.required, Validators.minLength(1), Validators.pattern(this.myPattern.number)]],
      externalWallsTotalArea: ['', [Validators.required, Validators.minLength(1), Validators.pattern(this.myPattern.number)]],
      externalGlassTotalArea: ['', [Validators.required, Validators.minLength(1), Validators.pattern(this.myPattern.number)]],
    });
  }

  ngOnInit(): void {
    console.log('this.regionId', this.buildingId);
    if (this.buildingId) {
      // this.areaDto.regionId = this.regionId;
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

    this.buildingService.createArea({id: this.buildingId}, this.areaDto)
      .subscribe( (res: any) => {
        if (res) {
          if (res.flag && res.data) {
            this.nextStep.emit(3);
          }
        }
      });
  }
}
