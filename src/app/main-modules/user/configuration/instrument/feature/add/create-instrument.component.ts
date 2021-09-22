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
import {UseTypeBuildingEnum, UtilityTypeEnum} from '../../../building/model/useTypeEnum';
import {ActivatedRoute} from '@angular/router';
import {Router} from '@angular/router';
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
  [x: string]: any;
  pageSize = 20;
  pageIndex = 0;
  length = -1;

  instrumentId = '';
  touched = false;
  edited = false;
  form: FormGroup;
  utilityTypeEnum = UtilityTypeEnum;
  useTypeEnum = UseTypeInstrumentEnum; //کاربری تجهیز
  nameEnum; //نام تجهیز
  energyCarierEnum=EnergyCarierEnum;//حاملهای انرژی
  myPattern = MyPattern;
  moment = Moment;

  instrumentDto = new InstrumentDto();
  buildingAllocation = new InstrumentBuildingAllocation();
  filterBuilding = '';
  buildingList = [];
  editedAllocation = false;

  constructor(private formBuilder: FormBuilder,
              public router: Router,
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
      instrumentUsage:  ['', [Validators.required ]], //کاربری تجهیز
      name: ['', [Validators.required ]], // نام تجهیز
      instrumentCarrier: ['برق'],// حامل انرژی 
      instrumentNum:   ['', [Validators.minLength(1), Validators.pattern(this.myPattern.number)]], //تعداد
      consumptionPower:  ['', [Validators.minLength(1), Validators.pattern(this.myPattern.number)]],//توان مصرفی 
      dailyOperatHours:  ['', [Validators.minLength(1), Validators.pattern(this.myPattern.number)]], // ساعت کارکرد روز 
      AnnualWorkDayNum: ['', [Validators.minLength(1), Validators.pattern(this.myPattern.number)]], //  تعداد روز کارکرد در سال 
      fromDate:  [''], //  تاریخ شروع کار تجهیز
      toDate:  [''], //  تاریخ خاتمه کار تجهیز
      coincidenceCoefficient:  ['',[Validators.min(0),Validators.max(1)]], //    ضریب همزمانی 
    }, {
      //validators: this.checkCoinCoefValidators('coincidenceCoefficient')
    });

    this.instrumentDto.instrumentCarrier=EnergyCarierEnum[EnergyCarierEnum.ELECTRICITY.toString()] ;

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

  createEdit(): void {
    this.touched = true;

    this.instrumentDto.buildingId=this.buildingAllocation.buildingId;
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      Notiflix.Notify.Failure('ورودی رو بررسی کنید!');
      return;
    }

    if (!this.edited) {
      this.instrumentService.createInstrument(this.instrumentDto)
        .subscribe((res: any) => {
          if (res) {
            Notiflix.Notify.Success('ایجاد تجهیز با موفقیت انجام شد.');
            this.instrumentId = res.data;
            setTimeout(() => {
              $('#pills-building-tab').click();
            }, 200);
            this.router.navigate(['/index/user/configuration/instrumentList']);

          }
        });
    } else {
      this.instrumentService.updateInstrument({id: this.instrumentId}, this.instrumentDto)
        .subscribe((res: any) => {
          if (res) {
            Notiflix.Notify.Success('ویرایش تجهیز با موفقیت انجام شد.');
            this.router.navigate(['/index/user/configuration/instrumentList']);
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
          this.buildingAllocation.name=res.data.buildingName;
          this.buildingAllocation.buildingId=res.data.buildingId;
          
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
    this.buildingService.getListBuildingForSelection({
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
  // مقایسه ضریب همزمانی
  checkCoinCoefValidators(item1: any): (group: FormGroup) => any {
    return (group: FormGroup) => {

      if (  group.controls[item1].value< 1 ) {
        Notiflix.Notify.Failure('ضریب همزمانی باید کمتر از 1 باشد');      
      }
    };
  }

  selectBuildingAllocation(item): void {
    this.buildingAllocation.name = item.name;
    this.buildingAllocation.buildingId = item.id;
  }
}
