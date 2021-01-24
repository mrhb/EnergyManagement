import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
// @ts-ignore
import Notiflix from 'notiflix';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BuildingService} from '../../../service/building.service';
import {MyPattern} from '../../../../../../../shared/tools/myPattern';
import {WallInformation} from '../../../model/building';

@Component({
  selector: 'app-wall-information',
  templateUrl: './wall-information.component.html',
  styleUrls: ['./wall-information.component.scss']
})
export class WallInformationComponent implements OnInit {
  touched = false;
  form: FormGroup;
  myPattern = MyPattern;
  wallInformation = new WallInformation();
  // @Input() buildingId: string;
  buildingId = '600c762f03b2ec10183fd2b6';
  @Output() nextStep = new EventEmitter<any>();
  constructor(private formBuilder: FormBuilder,
              private buildingService: BuildingService) {
    this.form = this.formBuilder.group({
      exWallAdjOutSpaceArea: ['', [Validators.required, Validators.minLength(1), Validators.pattern(this.myPattern.number)]],
      exFloorAdjOutSpaceArea: ['', [Validators.required, Validators.minLength(1), Validators.pattern(this.myPattern.number)]],
      exWallAdjNotControlledSpaceArea: ['', [Validators.required, Validators.minLength(1), Validators.pattern(this.myPattern.number)]],
      exFloorAdjNotControlledSpaceArea: ['', [Validators.required, Validators.minLength(1), Validators.pattern(this.myPattern.number)]],
      exRoofAdjOutSpaceArea: ['', [Validators.required, Validators.minLength(1), Validators.pattern(this.myPattern.number)]],
      outWindowAdjOutSpaceArea: ['', [Validators.required, Validators.minLength(1), Validators.pattern(this.myPattern.number)]],
      exRoofAdjNotControlledSpaceArea: ['', [Validators.required, Validators.minLength(1), Validators.pattern(this.myPattern.number)]],
      windowAdjNotControlledSpaceArea: ['', [Validators.required, Validators.minLength(1), Validators.pattern(this.myPattern.number)]],
    });
  }

  ngOnInit(): void {
  }

  createWallInformation(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      Notiflix.Notify.Failure('ورودی رو بررسی کنید!');
      return;
    }

    this.buildingService.updateWallInformation({id: this.buildingId}, this.wallInformation)
      .subscribe( (res: any) => {
        if (res) {
          if (res.flag && res.data) {
            this.nextStep.emit(6);
          }
        }
      });
  }

  goBack(): void {
    this.nextStep.emit(4);
  }

}
