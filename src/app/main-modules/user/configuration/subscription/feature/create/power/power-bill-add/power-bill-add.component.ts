import { AfterViewInit, Component, OnInit } from '@angular/core';
import {Consumption, PowerBillDto, PowerList} from '../../../../model/power';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MyPattern } from 'src/app/shared/tools/myPattern';
import {PowerAllocation} from '../../../../model/power';
import { ActivatedRoute, Router } from '@angular/router';
import { PowerReceiptService } from '../../../../service/power-receipt.service';
import { PowerService } from '../../../../service/power.service';
import Notiflix from 'notiflix';
import { Moment } from 'src/app/shared/tools/moment';
import { PeriodEnum } from '../../../../model/sharedEnum';
declare var $: any;

@Component({
  selector: 'app-power-bill-add',
  templateUrl: './power-bill-add.component.html',
  styleUrls: ['./power-bill-add.component.scss']
})
export class PowerBillAddComponent implements OnInit , AfterViewInit {

  pageSize = 20;
  pageIndex = 0;
  length = -1;
  touched = false;
  edited = false;
  powerId = '';
  periodEnum=PeriodEnum;
  powerList: PowerList[] = [];
  myPattern = MyPattern;
  moment = Moment;

  // form: FormGroup;
  formInformation: FormGroup;
  formDiscrip: FormGroup;
  formIntermed: FormGroup;
  powerBillDto = new PowerBillDto();
  powerAllocation = new PowerAllocation();
  formAmount: FormGroup;
  constructor(private formBuilder: FormBuilder,
    private router: Router,
    // private buildingService: BuildingService,
    private  activatedRoute: ActivatedRoute,
    private  powerReceiptService: PowerReceiptService,
    private  powerService: PowerService,
    ) { 
      this.activatedRoute.queryParams.subscribe(params => {
        console.log('params', params);
        if (params.id) {
          this.edited = true;
          this.powerId = params.id;
          this.getOneBill(params.id);
        }
      });
    }

  ngOnInit(): void {
    this.formInformation=this.formBuilder.group({
      numberShare: [''],// شماره اشتراک
      paymentCode: [''], // شناسه پرداخت
      period:[], // دوره
      fromDate:[], // تاریخ شروع 
      toDate:[], // تاریخ اتمام
      numberDays:[], // تعداد روز دوره
      consumptionAmount:[], //   مبلغ مصرف
      subscription:[], //   آبونمان 
      powerPrice:[], //   بهای قدرت 
      seasonPrice:[], //   بهای فصل 
      payableAmount:[], //  مبلغ قابل پرداخت      
    }
    );
    this.formIntermed=this.formBuilder.group({
      intermediate :[],
      intermediate_preCounter :[],// شمارنده قبلی میان باری 
      intermediate_currentCounter :[],// شمارنده کنونی میان باری 
      intermediate_coefficient :[],// ضریب میان باری 
      intermediate_totalConsumption :[],// مصرف کل میان باری 
      intermediate_totalAfterLast :[],// مصرف بعد از آخرین تغییرات میان باری 
      intermediate_nerkh :[],// نرخ میان باری 
      intermediate_mablagh :[],// مبلغ میان باری 
      peakLoad_preCounter :[],// شمارنده قبلی اوج باری 
      peakLoad_currentCounter :[],// شمارنده کنونی اوج باری 
      peakLoad_coefficient :[],// ضریب اوج باری 
      peakLoad_totalConsumption :[],// مصرف کل اوج باری 
      peakLoad_totalAfterLast :[],// مصرف بعد از آخرین تغییرات اوج باری 
      peakLoad_nerkh :[],// نرخ اوج باری 
      peakLoad_mablagh :[],// مبلغ اوج باری 
     lowLoad_preCounter :[],// شمارنده قبلی کم باری 
     lowLoad_currentCounter :[],// شمارنده کنونی کم باری 
     lowLoad_coefficient :[],// ضریب کم باری 
     lowLoad_totalConsumption :[],// مصرف کل کم باری 
     lowLoad_totalAfterLast :[],// مصرف بعد از آخرین تغییرات کم باری 
     lowLoad_nerkh :[],// نرخ کم باری 
     lowLoad_mablagh :[],// مبلغ کم باری   
     peakTimesFriday_preCounter :[],// شمارنده قبلی اوج بار جمعه 
     peakTimesFriday_currentCounter :[],// شمارنده کنونی اوج بار جمعه 
     peakTimesFriday_coefficient :[],// ضریب اوج بار جمعه 
     peakTimesFriday_totalConsumption :[],// مصرف کل اوج بار جمعه 
     peakTimesFriday_totalAfterLast :[],// مصرف بعد از آخرین تغییرات اوج بار جمعه 
     peakTimesFriday_nerkh :[],// نرخ اوج بار جمعه 
     peakTimesFriday_mablagh :[],// مبلغ اوج بار جمعه         })
     reactive_preCounter :[],// شمارنده قبلی راکتیو 
     reactive_currentCounter :[],// شمارنده کنونی راکتیو 
     reactive_coefficient :[],// ضریب راکتیو 
     reactive_totalConsumption :[],// مصرف کل راکتیو 
     reactive_totalAfterLast :[],// مصرف بعد از آخرین تغییرات راکتیو 
     reactive_nerkh :[],// نرخ راکتیو 
     reactive_mablagh :[],// مبلغ راکتیو         })
    });
        
    this.formDiscrip=this.formBuilder.group({
      paymentDeadLine:[], //  مهلت پرداخت
      badConsumptionLossRatio:[], //  ضریب زیان بدی مصرف   
      maximeterNumber:[], // عدد ماکسیمتر
      contractualPower:[], // قدرت قراردادی
      calculatedPower:[], // قدرت محاسبه شده
      powerConsumption:[], // قدرت مصرفی  
    });

    //بهای قبض
    this.formAmount=this.formBuilder.group({
      consumptionAmount:[], //  مبلغ مصرف
      subscription:[], // آبونمان
      powerPrice:[], // بهای قدرت
      seasonPrice:[], // بهای فصل
      badPenaltiesForConsuming:[],// جریمه بدی مصرف 
      payableAmount:[], // مبلغ قابل پرداخت
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
        this.powerBillDto.fromDate = this.moment.convertJaliliToIsoDate($(e.currentTarget).val());
        if (this.powerBillDto.fromDate > this.powerBillDto.toDate) {
          setTimeout(() => {
            Notiflix.Notify.Failure('تاریخ شروع باید قبل از تاریخ پایان انتخاب شود');
            this.powerBillDto.toDate = null;
            $('#toDate').val(this.moment.getJaliliDateFromIso(this.powerBillDto.toDate));
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
        this.powerBillDto.toDate = this.moment.convertJaliliToIsoDate($(e.currentTarget).val());
        console.log('this.powerBillDto.toDate', this.powerBillDto.toDate);
        if (this.powerBillDto.fromDate > this.powerBillDto.toDate) {
          setTimeout(() => {
            Notiflix.Notify.Failure('تاریخ وارده باید قبل از تاریخ شروع انتخاب شود');
            this.powerBillDto.toDate = null;
            $('#toDate').val(this.moment.getJaliliDateFromIso(this.powerBillDto.fromDate));
          }, 200);
        }
      });
    }, 100);
  }

  getOneBill(pId): void {
    this.powerReceiptService.getOneReceipt({
      id: pId
    })
      .subscribe((res: any) => {
        if (res) {
          this.powerBillDto = res.data;
        $('#fromDate').val(this.moment.getJaliliDateFromIso(this.powerBillDto.fromDate));
        $('#toDate').val(this.moment.getJaliliDateFromIso(this.powerBillDto.toDate));
          this.powerAllocation= res.data.powerSharing;
          // this.setEnumUseType();
        }
      });
  }
  createReceipt(): void {
    this.touched = true;
    if (this.formInformation.invalid) {
      this.formInformation.markAllAsTouched();
      Notiflix.Notify.Failure('ورودی رو بررسی کنید!');
      return;
    }

    if (!this.edited) {
      this.powerReceiptService.createReceipt(this.powerBillDto)
        .subscribe((res: any) => {
          if (res) {
            Notiflix.Notify.Success('ایجاد قبض برق با موفقیت انجام شد.');
            this.powerId = res.data;
            setTimeout(() => {
              $('#pills-building-tab').click();
            }, 200);
            this.router.navigate(['/index/user/configuration/powerBillList']);
          }
        });
    } else {

      this.powerReceiptService.updateReceipt({id: this.powerId}, this.powerBillDto)
        .subscribe((res: any) => {
          if (res) {
            Notiflix.Notify.Success('ویرایش قبض برق با موفقیت انجام شد.');
            this.router.navigate(['/index/user/configuration/powerBillList']);
          }
        });
    }

  }
  getListPower(): void {
    this.powerService.getPowerList(
      {
        page: this.pageIndex,
        size: this.pageSize,
      }, ''
    ).subscribe((res: any) => {
      if (res) {
        if (res.flag) {
          this.powerList = res.content;
        }
      }
    });
  }

  selectPower(item): void {
    this.powerAllocation = item;
    this.powerBillDto.powerSharingId=item._id;
  }
}