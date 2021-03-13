import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MyPattern} from '../../../../../../../shared/tools/myPattern';
import {Building} from '../../../model/building';
import {UseTypeBuildingEnum} from '../../../model/useTypeEnum';
import {CoolingHeatingSystemType, Ownership} from '../../../model/buildingEnum';
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
  coolingHeatingSystemTypeEnum = CoolingHeatingSystemType;
  moment = Moment;

  @Input() bId: string;
  @Input() regionId: string;
  @Input() editedBuildingDto = new Building();
  @Output() nextStep = new EventEmitter<any>();
  @Output() completeStep = new EventEmitter<any>();
  @Output() buildingId = new EventEmitter<any>();

  constructor(private formBuilder: FormBuilder,
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
      coolingHeatingSystemType: ['', [Validators.required, Validators.pattern(this.myPattern.faAndEnNumberAndText)]],
      powerSharNum: [''],
      gasSharNum: [''],
      waterSharNum: [''],
      energyCarierOthersNum: [''],
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
            }
          }
          console.log('buildingService res', res);
        });
    }
  }

  goBack(): void {
    this.nextStep.emit(0);
  }
}
