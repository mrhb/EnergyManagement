import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MyPattern} from '../../../../../../../shared/tools/myPattern';
import {MapInformation, Space} from '../../../model/building';
import {BuildingService} from '../../../service/building.service';
// @ts-ignore
import Notiflix from 'notiflix';
import {GATEWAY_URL} from '../../../../../../../_base/service/model/rest-constants';
import {MapEnum} from '../../../model/map';
import {Moment} from '../../../../../../../shared/tools/moment';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  form: FormGroup;
  myPattern = MyPattern;
  mapDto = new MapInformation();
  mapList: MapInformation[] = [];
  touched = false;
  edited = false;
  pathUrl = '';
  Moment = Moment;
  @Input() buildingId: string;
  mapEnum = MapEnum;
  @Output() nextStep = new EventEmitter<any>();

  constructor(private formBuilder: FormBuilder,
              private buildingService: BuildingService) {
    this.form = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(1), Validators.pattern(this.myPattern.faAndEnNumberAndText)]],
      category: ['', [Validators.required, Validators.minLength(1), Validators.pattern(this.myPattern.faAndEnNumberAndText)]],
      number: ['', [Validators.required, Validators.minLength(1), Validators.pattern(this.myPattern.number)]],
    });

    this.pathUrl = GATEWAY_URL + '/api/file/get?link=';
  }

  ngOnInit(): void {
    console.log('this.regionId', this.buildingId);
    if (this.buildingId) {

    }
  }

  goBack(): void {
    this.nextStep.emit(3);
  }

  createSpace(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      Notiflix.Notify.Failure('ورودی رو بررسی کنید!');
      return;
    }

    if (!this.mapDto.fileLink) {
      Notiflix.Notify.Failure('ارسال نقشه الزامی است!');
      return;
    }

    if (!this.edited) {
      this.buildingService.createMap({id: this.buildingId}, this.mapDto)
        .subscribe((res: any) => {
          if (res) {
            if (res.flag && res.data) {
              this.mapDto.id = res.data;
              this.mapList.push(JSON.parse(JSON.stringify(this.mapDto)));
              this.mapDto = new MapInformation();
              this.form.reset();
            }
          }
        });
    } else {
      this.edited = false;
      this.buildingService.updateMap({id: this.buildingId}, this.mapDto)
        .subscribe((res: any) => {
          if (res) {
            if (res.flag && res.data) {
              const index = this.mapList.findIndex(e => e.id === this.mapDto.id);
              if (index !== -1) {
                this.mapList[index] = this.mapDto;
              }
              this.mapDto = new MapInformation();
              this.form.reset();
            }
          }
        });
    }

  }

  editSpace(item: MapInformation): void {
    this.edited = true;
    this.mapDto = JSON.parse(JSON.stringify(item));
  }

  deleteSpace(i: number, sId): void {
    Notiflix.Confirm.Show(
      'حذف فضا',
      'آیا اطمینان دارید که نقشه حذف گردد؟',
      'بله',
      'خیر',
      () => {
        this.buildingService.deleteSpace({id: this.buildingId, spaceId: sId})
          .subscribe((res: any) => {
            if (res) {
              Notiflix.Notify.Success('حذف فضا با موفقیت انجام گردید');
              this.mapList.splice(i, 1);

              if (this.mapList.length < 1) {
                this.mapDto = new MapInformation();
                this.form.reset();
              }
            }
          });
      });
  }

  cancelEdit(): void {
    this.edited = false;
    this.mapDto = new MapInformation();
    this.form.reset();
  }

  getNextStep(): void {
    this.nextStep.emit(5);
  }

  uploading($event): void {
    if ($event) {

      this.mapDto.fileLink = $event;
    }
  }
}
