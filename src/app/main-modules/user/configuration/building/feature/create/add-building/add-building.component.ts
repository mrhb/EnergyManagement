import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MyPattern} from '../../../../../../../shared/tools/myPattern';
import {Building} from '../../../model/building';
import {UseTypeEnum} from '../../../model/useTypeEnum';
// @ts-ignore
import Notiflix from 'notiflix';
import {BuildingService} from '../../../service/building.service';
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
  useTypeEnum = UseTypeEnum;

  @Input() regionId: string;
  @Output() nextStep = new EventEmitter<any>();
  @Output() buildingId = new EventEmitter<any>();
  constructor(private formBuilder: FormBuilder,
              private buildingService: BuildingService) {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.pattern(this.myPattern.nameAndFamily)]],
      useType: ['', [Validators.required]],
      constructionYear: ['', [Validators.required, Validators.minLength(4), Validators.pattern(this.myPattern.number)]],
      floorNum: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(3), Validators.pattern(this.myPattern.number)]],
      exploitationPersonnelNum: ['', [Validators.required, Validators.minLength(1), Validators.pattern(this.myPattern.number)]],
      postalCode: ['', [Validators.required, Validators.minLength(10), Validators.pattern(this.myPattern.postalCode)]],
      address: ['', [Validators.required, Validators.maxLength(400), Validators.pattern(this.myPattern.faAndEnNumberAndTextParagraph)]],
      ownership: ['', [Validators.required, Validators.pattern(this.myPattern.faAndEnNumberAndText)]],
      coolingHeatingSystemType: ['', [Validators.required, Validators.pattern(this.myPattern.faAndEnNumberAndText)]],
    });
  }

  ngOnInit(): void {
    console.log('this.regionId', this.regionId);
    if (this.regionId) {
      this.buildingDto.regionId = this.regionId;
    }
  }

  updateBuilding(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      Notiflix.Notify.Failure('ورودی رو بررسی کنید!');
      return;
    }
    console.log('this.buildingDto', this.buildingDto);
    this.buildingService.createBuilding(this.buildingDto)
      .subscribe( (res: any) => {
        if (res) {
          if (res.data) {
            this.buildingId.emit(res.data);
            this.nextStep.emit(2);
          }
        }
        console.log('buildingService res', res);
      });
  }

  goBack(): void {
    this.nextStep.emit(0);
  }
}
