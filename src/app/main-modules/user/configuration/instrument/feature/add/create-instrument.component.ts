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
import { UseTypeInstrumentEnum,UnitInstrumentEnum, EnergyCarierEnum } from '../../model/instrumentEnum';
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
  useTypeInstrumentEnum = UseTypeInstrumentEnum;
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
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern(this.myPattern.nameAndFamily)]],
      instrumentCarrier: [''],// حامل انرژی 
      instrumentNum:  [''], //تعداد
      instrumentUsage:  [''], //کاربری تجهیر
      consumptionPower:  [''], //توان مصرفی 
      dailyOperatHours:  [''], // ساعت کارکرد روز 
      AnnualWorkDayNum:  [''], //  تعداد روز کارکرد در سال 
      fromDate:  [''], //  تاریخ شروع کار تجهیز
      toDate:  [''], //  تاریخ خاتمه کار تجهیز
      coincidenceCoefficient:  [''], //    ضریب همزمانی 
    });

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
            Notiflix.Notify.Success('ایجاد اشتراک آب با موفقیت انجام شد.');
            this.instrumentId = res.data;
            setTimeout(() => {
              $('#pills-building-tab').click();
            }, 200);
            // this.router.navigate(['/index/user/configuration/instrumentList']).then();
            // this.router.navigateByUrl('/index/user/configuration/instrumentList').then();
          }
        });
    } else {
      this.instrumentService.updateInstrument({id: this.instrumentId}, this.instrumentDto)
        .subscribe((res: any) => {
          if (res) {
            Notiflix.Notify.Success('ویرایش اشتراک آب با موفقیت انجام شد.');
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
          $('#fromDate').val(this.moment.getJaliliDateFromIso(this.instrumentDto.fromDate));
          $('#toDate').val(this.moment.getJaliliDateFromIso(this.instrumentDto.toDate));

        }
      });
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
              Notiflix.Notify.Success('قبض با موفقیت انجام گردید');
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