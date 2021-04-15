/**
 * create By reza mollaei
 * Email: reza_yki@yahoo.com
 * telegram: reza_yki
 */

 import {Component, ComponentFactoryResolver, OnInit, ViewChild,ElementRef, ViewContainerRef } from '@angular/core';
 import {FormBuilder, FormGroup, Validators} from '@angular/forms';
//  import {BuildingAllocation, TariffBuildingAllocation, TariffDto} from '../../../../model/tariff';
 import {
   GeneralEnum, GroupEnum, HomeEnum,  Industry_productsEnum, OtherEnum,Water_productsEnum, 
   PowerUseTypeEnum, WaterUseTypeEnum, GasUseTypeEnum
 } from '../../model/tariffEnum';
 // @ts-ignore
  import Notiflix from 'notiflix';
  import {ActivatedRoute, Router} from '@angular/router';
  import { MyPattern } from 'src/app/shared/tools/myPattern';
  import { TariffService } from '../../service/tariff.service';
  import { TariffDto } from '../../model/tariff';
  import { Moment } from 'src/app/shared/tools/moment';
import { TariffPowerParam1Component } from '../tariff-power-param1/tariff-power-param1.component';
import { TariffPowerParam2Component } from '../tariff-power-param2/tariff-power-param2.component';
 
 declare var $: any;
@Component({
  selector: 'app-tariff-create',
  templateUrl: './tariff-create.component.html',
  styleUrls: ['./tariff-create.component.scss']

})
export class TariffCreateComponent implements OnInit {

  @ViewChild('tariffParamsContainer', { read: ViewContainerRef }) tariffParams: ViewContainerRef;


  [x: string]: any;
  
  pageSize = 20;
  pageIndex = 0;
  length = -1;
  touched = false;
  edited = false;
  tariffId = '';
  form: FormGroup;
  myPattern = MyPattern;
  tariffDto = new TariffDto();
  groupEnum = GroupEnum;
  useTypeEnum ;
  useCodeEnum ;
  moment = Moment;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private  tariffService: TariffService,
              private componentFactoryResolver: ComponentFactoryResolver
              ) {
    this.activatedRoute.queryParams.subscribe(params => {
      console.log('params', params);
      if (params.id) {
        this.edited = true;
        this.tariffId = params.id;
        this.getOneTariff(params.id);
      }
    });
  }

  ngAfterViewInit(): void {
    this.jQueryDate();
     //initializeform
     $('#fromDate').val(this.moment.getJaliliDateFromIso(this.tariffDto.fromDate));
     $('#toDate').val(this.moment.getJaliliDateFromIso(this.tariffDto.toDate));
     $('#approvalDate').val(this.moment.getJaliliDateFromIso(this.tariffDto.approvalDate));
    
  }
  
  jQueryDate(): void {
    setTimeout(e1 => {
      $('#approvalDate').MdPersianDateTimePicker({
        Placement: 'bottom', // default is 'bottom'
        Trigger: 'focus', // default is 'focus',
        targetTextSelector: '#approvalDate',
        disableAfterToday: false,
        disableBeforeToday: false,
      }).on('change', (e) => {
        this.tariffDto.approvalDate = this.moment.convertJaliliToIsoDate($(e.currentTarget).val());
        console.log('this.tariffDto.approvalDate', this.tariffDto.approvalDate);
        // if (this.tariffDto.fromDate > this.tariffDto.toDate) {
        //   setTimeout(() => {
        //     Notiflix.Notify.Failure('تاریخ وارده باید قبل از تاریخ شروع انتخاب شود');
        //     this.tariffDto.toDate = null;
        //     $('#toDate').val(this.moment.getJaliliDateFromIso(this.tariffDto.fromDate));
        //   }, 200);
        // }
      });

      $('#fromDate').MdPersianDateTimePicker({
        Placement: 'bottom', // default is 'bottom'
        Trigger: 'focus', // default is 'focus',
        targetTextSelector: '#fromDate',
        disableAfterToday: false,
        disableBeforeToday: false,
      }).on('change', (e) => {
        this.tariffDto.fromDate = this.moment.convertJaliliToIsoDate($(e.currentTarget).val());
        if (this.tariffDto.fromDate > this.tariffDto.toDate) {
          setTimeout(() => {
            Notiflix.Notify.Failure('تاریخ شروع باید قبل از تاریخ پایان انتخاب شود');
            this.tariffDto.toDate = null;
            $('#toDate').val(this.moment.getJaliliDateFromIso(this.tariffDto.toDate));
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
        this.tariffDto.toDate = this.moment.convertJaliliToIsoDate($(e.currentTarget).val());
        console.log('this.tariffDto.toDate', this.tariffDto.toDate);
        if (this.tariffDto.fromDate > this.tariffDto.toDate) {
          setTimeout(() => {
            Notiflix.Notify.Failure('تاریخ وارده باید قبل از تاریخ شروع انتخاب شود');
            this.tariffDto.toDate = null;
            $('#toDate').val(this.moment.getJaliliDateFromIso(this.tariffDto.fromDate));
          }, 200);
        }
      });

    }, 100);
  }

  ngOnInit(): void {
    var date = new Date();
    date.setDate( date.getDate() - 0 );
    this.tariffDto.approvalDate=date.toISOString();
    this.tariffDto.fromDate=date.toISOString();
    date.setDate( date.getDate() + 365 );
    this.tariffDto.toDate=date.toISOString();

    this.form = this.formBuilder.group({
      group: [''],// نوع تعرفه
      useType: ['', [Validators.required]],// عنوان تعرفه
      useCode: ['', [Validators.required]],// کد تعرفه
      approvalDate:[], // تاریخ تصویب 
      fromDate:[], // تاریخ شروع 
      toDate:[], // تاریخ اتمام 
    });
  }
 
  getOneTariff(pId): void {
    this.tariffService.getOneTariff({
      id: pId
    })
      .subscribe((res: any) => {
        if (res) {
          this.tariffDto = res.data;     
        }
      });
  }

  setUseTypeEnum(isChange?: boolean): void {
    switch (this.tariffDto.group) {
      case GroupEnum[GroupEnum.POWER.toString()]:
        this.useTypeEnum= PowerUseTypeEnum;
        break;
      case GroupEnum[GroupEnum.GAS.toString()]:
        this.useTypeEnum= GasUseTypeEnum;
        break;
      case GroupEnum[GroupEnum.WATER.toString()]:
        this.useTypeEnum= WaterUseTypeEnum;
        break;
    }
    this.LoadTariffParamView();

  }
  
  setUseCodeEnum(isChange?: boolean): void {
    switch (this.tariffDto.group) {
      case GroupEnum[GroupEnum.POWER.toString()]:
        this.setEnumUseCodePower(isChange)
        break;
      case GroupEnum[GroupEnum.GAS.toString()]:
        this.setEnumUseCodeGas(isChange)
        break;
      case GroupEnum[GroupEnum.WATER.toString()]:
          this.setEnumUseCodeWater(isChange)
          break;
    }

    this.LoadTariffParamView();

  }
  setEnumUseCodePower(isChange?: boolean): void {
    switch (this.tariffDto.useType) {
      case PowerUseTypeEnum[PowerUseTypeEnum.HOME.toString()]:
        this.useCodeEnum = HomeEnum;
        break;
      case PowerUseTypeEnum[PowerUseTypeEnum.GENERAL.toString()]:
        this.useCodeEnum = GeneralEnum;
        break;
      case PowerUseTypeEnum[PowerUseTypeEnum.WATER_PRODUCTS.toString()]:
        this.useCodeEnum = Water_productsEnum;
        break;
      case PowerUseTypeEnum[PowerUseTypeEnum.INDUSTRY_PRODUCTS.toString()]:
        this.useCodeEnum = Industry_productsEnum;
        break;
      case PowerUseTypeEnum[PowerUseTypeEnum.OTHER.toString()]:
        this.useCodeEnum = OtherEnum;
        break;
    }

  }
  setEnumUseCodeWater(isChange?: boolean): void {
    switch (this.tariffDto.useType) {
      case WaterUseTypeEnum[WaterUseTypeEnum.DOMESTIC.toString()]: // 'آب و فاضلاب خانگی'
        this.useCodeEnum = HomeEnum;
        break;
      case WaterUseTypeEnum[WaterUseTypeEnum.COMMUNAL.toString()]: // آب و فاضلاب مصارف اشتراکی
        this.useCodeEnum = GeneralEnum;
        break;
      case WaterUseTypeEnum[WaterUseTypeEnum.GENERAL.toString()]: // مصارف عمومی'
        this.useCodeEnum = Water_productsEnum;
        break;
      case WaterUseTypeEnum[WaterUseTypeEnum.FREE.toString()]: // آب فاضلاب آزاد
        this.useCodeEnum = Industry_productsEnum;
        break;
      case WaterUseTypeEnum[WaterUseTypeEnum.GREEN.toString()]: // فضای سبز
        this.useCodeEnum = OtherEnum;
        break; 
        case WaterUseTypeEnum[WaterUseTypeEnum.PRODUCTION.toString()]: // تولیدی 
        this.useCodeEnum = OtherEnum;
        break;
      case WaterUseTypeEnum[WaterUseTypeEnum.COMMERCIAL.toString()]: // مصارف تجاری 
        this.useCodeEnum = OtherEnum;
        break;
    }
  }
  LoadTariffParamView() {
    this.tariffParams.clear();
      switch (this.tariffDto.group) {
      case GroupEnum[GroupEnum.POWER.toString()]:
           this.factory = this.componentFactoryResolver.resolveComponentFactory(TariffPowerParam1Component);
           this.componentRef = this.tariffParams.createComponent(this.factory);
           this.componentRef.instance.paramOutputEvent.subscribe(val => 
            {
              console.log(val);
              this.tariffDto.params=val;
            });
        break; 

        case GroupEnum[GroupEnum.GAS.toString()]:

          this.factory = this.componentFactoryResolver.resolveComponentFactory(TariffPowerParam2Component);
           this.componentRef = this.tariffParams.createComponent(this.factory);
           this.componentRef.instance.paramOutputEvent.subscribe(val =>
            {
              console.log(val);
              this.tariffDto.params=val;
            });
        break;
      case GroupEnum[GroupEnum.WATER.toString()]:
          break;

      default: { 
        break; 
      } 
   } 
  }
  createTariff(): void {
    this.touched = true;
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      Notiflix.Notify.Failure('ورودی رو بررسی کنید!');
      return;
    }

    if (!this.edited) {
      this.tariffService.createTariff(this.tariffDto)
        .subscribe((res: any) => {
          if (res) {
            Notiflix.Notify.Success('ایجاد تعرفه با موفقیت انجام شد.');
            this.tariffId = res.data;
            setTimeout(() => {
              $('#pills-building-tab').click();
            }, 200);
            // this.router.navigate(['/index/user/configuration/tariffList']);
          }
        });
    } else {

      this.tariffService.updateTariff({id: this.tariffId}, this.tariffDto)
        .subscribe((res: any) => {
          if (res) {
            Notiflix.Notify.Success('ویرایش تعرفه با موفقیت انجام شد.');
            // this.router.navigate(['/index/user/configuration/tariffCreate' ],{fragment: "billingSearchId"});
            // this.router.navigate(['/index/user/configuration/tariffList']);
          }
        });
    }


  }
 
 
}
