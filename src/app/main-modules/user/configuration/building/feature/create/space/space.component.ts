import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MyPattern} from '../../../../../../../shared/tools/myPattern';
import {MapInformation, Space} from '../../../model/building';
import {BuildingService} from '../../../service/building.service';
// @ts-ignore
import Notiflix from 'notiflix';

@Component({
  selector: 'app-space',
  templateUrl: './space.component.html',
  styleUrls: ['./space.component.scss']
})
export class SpaceComponent implements OnInit {
  form: FormGroup;
  myPattern = MyPattern;
  spaceDto = new Space();
  spaceList: Space[] = [];
  touched = false;
  edited = false;

  @Input() editedSpaceList: Space[];
  @Input() buildingId: string;
  // buildingId = '600c762f03b2ec10183fd2b6';
  @Output() nextStep = new EventEmitter<any>();
  @Output() completeStep = new EventEmitter<any>();

  constructor(private formBuilder: FormBuilder,
              private buildingService: BuildingService) {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(1), Validators.pattern(this.myPattern.faAndEnNumberAndText)]],
      number: ['', [Validators.required, Validators.minLength(1), Validators.pattern(this.myPattern.number)]],
      floorNum: ['', [Validators.required, Validators.minLength(1), Validators.pattern(this.myPattern.number)]],
      useType: ['', [Validators.required, Validators.minLength(1), Validators.pattern(this.myPattern.faAndEnNumberAndText)]],
      area: ['', [Validators.required, Validators.minLength(1), Validators.pattern(this.myPattern.number)]],
    });
  }

  ngOnInit(): void {
    console.log('this.regionId', this.buildingId);
    if (this.buildingId) {
      if (this.editedSpaceList.length > 0) {
        this.spaceList = this.editedSpaceList;
      }
    }
  }

  goBack(): void {
    this.nextStep.emit(2);
  }

  createSpace(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      Notiflix.Notify.Failure('ورودی رو بررسی کنید!');
      return;
    }

    if (!this.edited) {
      this.buildingService.createSpace({id: this.buildingId}, this.spaceDto)
        .subscribe((res: any) => {
          if (res) {
            if (res.flag && res.data) {
              this.spaceDto.id = res.data;
              this.spaceList.push(JSON.parse(JSON.stringify(this.spaceDto)));
              this.spaceDto = new Space();
              this.form.reset();
            }
          }
        });
    } else {
      this.edited = false;
      this.buildingService.updateSpace({id: this.buildingId}, this.spaceDto)
        .subscribe((res: any) => {
          if (res) {
            if (res.flag && res.data) {
              const index = this.spaceList.findIndex(e => e.id === this.spaceDto.id);
              if (index !== -1) {
                this.spaceList[index] = this.spaceDto;
              }
              this.spaceDto = new Space();
              this.form.reset();
            }
          }
        });
    }

  }

  editSpace(item: Space): void {
    this.edited = true;
    this.spaceDto = JSON.parse(JSON.stringify(item));
  }

  deleteSpace(i: number, sId): void {
    Notiflix.Confirm.Show(
      'حذف فضا',
      'آیا اطمینان دارید که فضا حذف گردد؟',
      'بله',
      'خیر',
      () => {
        this.buildingService.deleteSpace({id: this.buildingId, spaceId: sId})
          .subscribe((res: any) => {
            if (res) {
              Notiflix.Notify.Success('حذف فضا با موفقیت انجام گردید');
              this.spaceList.splice(i, 1);

              if (this.spaceList.length < 1) {
                this.spaceDto = new Space();
                this.form.reset();
              }
            }
          });
      });
  }

  cancelEdit(): void {
    this.edited = false;
    this.spaceDto = new Space();
    this.form.reset();
  }

  getNextStep(): void {
    this.nextStep.emit(4);
    this.completeStep.emit(3);
  }
}
