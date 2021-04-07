import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MyPattern} from '../../../../../../../shared/tools/myPattern';
import {Area} from '../../../model/building';
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
  @Input() editedAreaDto = new Area();
  @Output() nextStep = new EventEmitter<any>();
  @Output() completeStep = new EventEmitter<any>();
  constructor(private formBuilder: FormBuilder,
              private buildingService: BuildingService) {
    this.form = this.formBuilder.group({
      arenaArea: ['', [Validators.required, Validators.minLength(1), Validators.pattern(this.myPattern.number)]],
      ayanArea: ['', [Validators.required, Validators.minLength(1), Validators.pattern(this.myPattern.number)]],
      useFullArea: ['', [Validators.required, Validators.minLength(1), Validators.pattern(this.myPattern.number)]],
      externalWallsTotalArea: ['', [Validators.minLength(1), Validators.pattern(this.myPattern.number)]],
      externalGlassTotalArea: ['', [Validators.minLength(1), Validators.pattern(this.myPattern.number)]],
    }, {
      validators: this.checkAreaValidators('arenaArea', 'ayanArea')
    });

  }

  ngOnInit(): void {
    console.log('this.regionId', this.buildingId);
    if (this.buildingId) {
      console.log('this.editedAreaDto', this.editedAreaDto);
      if (this.editedAreaDto.arenaArea) {
        this.areaDto = this.editedAreaDto;
      }
    }
  }

  goBack(): void {
    this.nextStep.emit(1);
  }
  checkAreaValidators(item1: any, item2: any): (group: FormGroup) => any {
    return (group: FormGroup) => {

      if (  group.controls[item1].value<  group.controls[item2].value) {
        Notiflix.Notify.Failure('مساحت عرصه باید از مساحت اعیان بیشتر باشد');      
      }
    };
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
            this.completeStep.emit(2);
          }
        }
      });        
  }
}
