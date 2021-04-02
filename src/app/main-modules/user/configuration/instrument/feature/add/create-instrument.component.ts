/**
 * create By reza mollaei
 * Email: reza_yki@yahoo.com
 * telegram: reza_yki
 */

import { AfterViewInit, Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {InstrumentBuildingAllocation, InstrumentDto} from '../../model/instrument';
// @ts-ignore
import Notiflix from 'notiflix';
import {InstrumentService} from '../../service/instrument.service';
import {BuildingService} from '../../../building/service/building.service';
import {UseTypeBuildingEnum} from '../../../building/model/useTypeEnum';
import {ActivatedRoute} from '@angular/router';
import { MyPattern } from 'src/app/shared/tools/myPattern';
import { EnergyBuildingAllocation } from '../../../subscription/model/energy';
import { BuildingAllocation } from '../../../subscription/model/power';
import { 
  UseTypeInstrumentEnum,  UnitInstrumentEnum,
  CenteralairConditionEnum, LocalairConditionEnum, OficeEnum,
  LightingEnum, ServerEnum, KitchrnEnum, OthersEnum , 
  EnergyCarierEnum } from '../../model/instrumentEnum';
import { Moment } from 'src/app/shared/tools/moment';
declare var $: any;
@Component({
  selector: 'app-create-instrument',
  templateUrl: './create-instrument.component.html',
  styleUrls: ['./create-instrument.component.scss']
})
export class CreateInstrumentComponent implements OnInit,AfterViewInit {
  pageSize = 20;
  pageIndex = 0;
  length = -1;

  instrumentId = '';
  touched = false;
  edited = false;
  form: FormGroup;
  buildingEnum = UseTypeBuildingEnum;
  useTypeEnum = UseTypeInstrumentEnum; //کاربری تجهیر
  nameEnum; //نام تجهیر
  energyCarierEnum=EnergyCarierEnum;//حاملهای انرژی
  myPattern = MyPattern;
  moment = Moment;

  instrumentDto = new InstrumentDto();
  buildingAllocation = new InstrumentBuildingAllocation();
  filterBuilding = '';
  buildingList = [];
  editedAllocation = false;

  constructor(private formBuilder: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private buildingService: BuildingService,
              private instrumentService: InstrumentService) {
    this.activatedRoute.queryParams.subscribe(params => {
      console.log('params', params);
      if (params.id) {
        this.edited = true;
        this.instrumentId = params.id;
        this.getOneInstrument(params.id);
      }
    });
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      instrumentUsage:  ['', [Validators.required ]], //کاربری تجهیر
      name: ['', [Validators.required ]], // نام تجهیز
      instrumentCarrier: [''],// حامل انرژی 
      instrumentNum:  [''], //تعداد
      consumptionPower:  [''], //توان مصرفی 
      dailyOperatHours:  [''], // ساعت کارکرد روز 
      AnnualWorkDayNum:  [''], //  تعداد روز کارکرد در سال 
      fromDate:  [''], //  تاریخ شروع کار تجهیز
      toDate:  [''], //  تاریخ خاتمه کار تجهیز
      coincidenceCoefficient:  [''], //    ضریب همزمانی 
    });
  }
  ngAfterViewInit(): void {
    this.jQueryDate();
  }
  
  jQueryDate(): void {
    setTimeout(e1 => {
      $('#fromDate').MdPersianDateTimePicker({
        Placement: 'bottom', // default is 'bottom'
        Trigger: 'focus', // default is 'focus',
        targetTextSelector: '#fromDate',
        disableAfterToday: false,
        disableBeforeToday: false,
      }).on('change', (e) => {
        this.instrumentDto.fromDate = this.moment.convertJaliliToIsoDate($(e.currentTarget).val());
        if (this.instrumentDto.fromDate > this.instrumentDto.toDate) {
          setTimeout(() => {
            Notiflix.Notify.Failure('تاریخ شروع باید قبل از تاریخ پایان انتخاب شود');
            this.instrumentDto.toDate = null;
            $('#toDate').val(this.moment.getJaliliDateFromIso(this.instrumentDto.toDate));
          }, 200);
        }
      });
      $('#toDate').MdPersianDateTimePicker({
        Placement: 'bottom', // default is 'bottom'
        Trigger: 'focus', // default is 'focus',
        targetTextSelector: '#toDate',
        disableAfterToday: false,
        disableBeforeToday: false,
      }).on('change', (e) => {
        this.instrumentDto.toDate = this.moment.convertJaliliToIsoDate($(e.currentTarget).val());
        console.log('this.instrumentDto.toDate', this.instrumentDto.toDate);
        if (this.instrumentDto.fromDate > this.instrumentDto.toDate) {
          setTimeout(() => {
            Notiflix.Notify.Failure('تاریخ وارده باید قبل از تاریخ شروع انتخاب شود');
            this.instrumentDto.toDate = null;
            $('#toDate').val(this.moment.getJaliliDateFromIso(this.instrumentDto.fromDate));
          }, 200);
        }
      });
    }, 100);
  }

  createInstrument(): void {
    this.touched = true;
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      Notiflix.Notify.Failure('ورودی رو بررسی کنید!');
      return;
    }

    if (!this.edited) {
      this.instrumentService.createInstrument(this.instrumentDto)
        .subscribe((res: any) => {
          if (res) {
            Notiflix.Notify.Success('ایجاد تاسیس با موفقیت انجام شد.');
            this.instrumentId = res.data;
            setTimeout(() => {
              $('#pills-building-tab').click();
            }, 200);
            // this.router.navigateByUrl('/index/user/configuration/instrumentList').then();
          }
        });
    } else {
      this.instrumentService.updateInstrument({id: this.instrumentId}, this.instrumentDto)
        .subscribe((res: any) => {
          if (res) {
            Notiflix.Notify.Success('ویرایش تاسیس با موفقیت انجام شد.');
            // this.router.navigateByUrl('/index/user/configuration/instrumentList').then();
          }
        });
    }
  }

  getOneInstrument(gId): void {
    this.instrumentService.getOneInstrument({id: gId})
      .subscribe((res: any) => {
        if (res) {
          this.instrumentDto = res.data;
          this.setEnumUseType();
          $('#fromDate').val(this.moment.getJaliliDateFromIso(this.instrumentDto.fromDate));
          $('#toDate').val(this.moment.getJaliliDateFromIso(this.instrumentDto.toDate));

        }
      });
  }
  setEnumUseType(isChange?: boolean): void {
    switch (this.instrumentDto.instrumentUsage) {
      case UseTypeInstrumentEnum[UseTypeInstrumentEnum. CENTERALAIRCONDITION.toString()]:
        this.nameEnum = CenteralairConditionEnum;
        break;
      case UseTypeInstrumentEnum[UseTypeInstrumentEnum.LOCALAIRCONDITION.toString()]:
        this.nameEnum = LocalairConditionEnum;
        break;
      case UseTypeInstrumentEnum[UseTypeInstrumentEnum.OFICE.toString()]:
        this.nameEnum = OficeEnum;
        break; 
      case UseTypeInstrumentEnum[UseTypeInstrumentEnum.LIGHTING.toString()]:
        this.nameEnum = LightingEnum;
        break; 
      case UseTypeInstrumentEnum[UseTypeInstrumentEnum.SERVER.toString()]:
        this.nameEnum = ServerEnum;
        break;         
      case UseTypeInstrumentEnum[UseTypeInstrumentEnum.KITCHEN.toString()]:
        this.nameEnum = KitchrnEnum;
        break;    
      case UseTypeInstrumentEnum[UseTypeInstrumentEnum.OTHERS.toString()]:
        this.nameEnum = OthersEnum;
        break;             
    }
    if (this.nameEnum && isChange) {
      Object.keys(this.nameEnum).map((key, index) => {
        if ((index % 2) === 0) {
          this.instrumentDto.name = this.nameEnum[this.nameEnum[key.toString()]];
          return;
        }
      });
    }
  }
  getListBuilding(): void {
    this.buildingService.getListBuilding({
      page: this.pageIndex,
      size: this.pageSize,
      term: this.filterBuilding,
    }).subscribe((res: any) => {
      if (res) {
        if (res.flag) {
          this.buildingList = res.content;
        }
      }
    });
  }

  addBuildingAllocation(): void {
    if (!this.editedAllocation) {
      this.instrumentService.addBuildingAllocation({id: this.instrumentId}, this.buildingAllocation)
        .subscribe((res: any) => {
          if (res) {
            this.buildingAllocation = new EnergyBuildingAllocation();
            Notiflix.Notify.Success('ثبت ساختمان با موفقیت انجام شد.');
            this.instrumentDto.buildingList.push(res.data);
          }
        });
    } else {
      this.instrumentService.updateBuildingAllocation({id: this.instrumentId}, this.buildingAllocation)
        .subscribe((res: any) => {
          if (res) {
            this.editedAllocation = false;
            const index = this.instrumentDto.buildingList.findIndex(e => e.id === this.buildingAllocation.id);
            if (index !== -1 ) {
              Notiflix.Notify.Success('ویرایش ساختمان با موفقیت انجام شد.');
              this.instrumentDto.buildingList[index] = this.buildingAllocation;
              this.buildingAllocation = new EnergyBuildingAllocation();
            }
          }
        });
    }
  }

  deleteBuilding(item: BuildingAllocation, i): void {
    Notiflix.Confirm.Show(
      'قبض',
      'آیا اطمینان دارید که این اشتراک حذف گردد؟',
      'بله',
      'خیر',
      () => {
        this.instrumentService.deleteInstrumentBuildingAllocation({id: this.instrumentId, allocationId: item.id})
          .subscribe((res: any) => {
            if (res) {
              Notiflix.Notify.Success('حذف تجهیز با موفقیت انجام گردید');
              this.instrumentDto.buildingList.splice(i, 1);
            }
          });
      });
  }

  selectBuildingAllocation(item): void {
    this.buildingAllocation.name = item.name;
    this.buildingAllocation.buildingId = item.id;
  }

  editAllocationPercentage(item: InstrumentBuildingAllocation): void {
    this.editedAllocation = true;
    this.buildingAllocation = JSON.parse(JSON.stringify(item));
  }
}
