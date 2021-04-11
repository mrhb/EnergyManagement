import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MyPattern} from '../../../../../../../shared/tools/myPattern';
import {MapInformation} from '../../../model/building';
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
  mapEnum = MapEnum;
  @Input() editedMapList: MapInformation[] = [];
  @Input() buildingId: string;
  @Output() nextStep = new EventEmitter<any>();
  @Output() completeStep = new EventEmitter<any>();

  constructor(private formBuilder: FormBuilder,
              private buildingService: BuildingService) {
    this.form = this.formBuilder.group({
      title: ['', [ Validators.minLength(1), Validators.pattern(this.myPattern.faAndEnNumberAndText)]],
      category: ['', [ Validators.minLength(1), Validators.pattern(this.myPattern.faAndEnNumberAndText)]],
      number: ['', [ Validators.minLength(1), Validators.pattern(this.myPattern.faAndEnNumberAndText)]],
    });

    this.pathUrl = GATEWAY_URL + '/api/file/get?link=';
  }

  ngOnInit(): void {
    console.log('this.regionId', this.buildingId);
    if (this.buildingId) {
      if (this.editedMapList.length > 0) {
       this.mapList = this.editedMapList;
       console.log('mapList', this.mapList);
      }
    }
  }

  goBack(): void {
    this.nextStep.emit(3);
  }

  createMap(): void {
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

  editMap(item: MapInformation): void {
    this.edited = true;
    this.mapDto = JSON.parse(JSON.stringify(item));
  }

  deleteMap(i: number, sId): void {
    Notiflix.Confirm.Show(
      'حذف فضا',
      'آیا اطمینان دارید که نقشه حذف گردد؟',
      'بله',
      'خیر',
      () => {
        this.buildingService.deleteMap({id: this.buildingId, mapId: sId})
          .subscribe((res: any) => {
            if (res) {
              Notiflix.Notify.Success('حذف نقشه با موفقیت انجام گردید');
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
    this.completeStep.emit(4);
  }

  uploading($event): void {
    if ($event) {

      this.mapDto.fileLink = $event;
    }
  }
}
