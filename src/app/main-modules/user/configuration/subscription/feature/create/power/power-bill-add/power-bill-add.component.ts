import { Component, OnInit } from '@angular/core';
import {PowerBillDto, PowerList} from '../../../../model/power';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import Notiflix from 'notiflix';
import { MyPattern } from 'src/app/shared/tools/myPattern';
import {PowerAllocation} from '../../../../model/power';
import { ActivatedRoute, Router } from '@angular/router';
import { PowerReceiptService } from '../../../../service/power-receipt.service';
import { PowerService } from '../../../../service/power.service';
declare var $: any;

@Component({
  selector: 'app-power-bill-add',
  templateUrl: './power-bill-add.component.html',
  styleUrls: ['./power-bill-add.component.scss']
})
export class PowerBillAddComponent implements OnInit {

  pageSize = 20;
  pageIndex = 0;
  length = -1;
  touched = false;
  edited = false;
  powerId = '';
  powerList: PowerList[] = [];
  myPattern = MyPattern;
  form: FormGroup;
  formDiscrip: FormGroup;
  powerBillDto = new PowerBillDto();
  powerAllocation = new PowerAllocation();

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
    this.form=this.formBuilder.group({
      billId: ['', [Validators.minLength(3), Validators.pattern(this.myPattern.nameAndFamily)]],
      pardakhtId: ['', [Validators.minLength(3), Validators.pattern(this.myPattern.nameAndFamily)]],
      duration:[], // دوره
      fromDate:[], // تاریخ شروع 
      toDate:[], // تاریخ اتمام
      numberDays:[], // تعداد روز دوره
      consumptionAmount:[], //   مبلغ مصرف
      subscription:[], //   آبونمان 
      powerPrice:[], //   بهای قدرت 
      seasonPrice:[], //   بهای فصل 
      payableAmount:[], //   بهای فصل      
    }
    
    //     : {type: Number, required: true}, // مبلغ قابل پرداخت
    );
    this.formDiscrip=this.formBuilder.group({
      paymentDeadLine:[], //  مهلت پرداخت
      badConsumptionLossRatio:[], //  ضریب زیان بدی مصرف   
      maximeterNumber:[], // عدد ماکسیمتر
      contractualPower:[], // قدرت قراردادی
      calculatedPower:[], // قدرت محاسبه شده
      powerConsumption:[], // قدرت مصرفی  
    });
  }
  //////////////////
  // explanationExpenses:[], // شرح مصارف
  //     badPenaltiesForConsumingElectricityDuringThePeriod: {type: Number, required: true}, // جریمه بدی مصرف بهای برق دوره
//     previousCounter: {type: String, required: true}, // شمارنده قبلی
//     currentCounter: {type: String, required: true}, // شمارنده کنونی
//     coefficient: {type: String, required: true}, // ضریب
//     totalConsumption: {type: String, required: true}, // مصرف کل
//     totalConsumptionLastChanges: {type: String, required: true}, // مصرف بعد از آخرین تغییرات
//     rate: {type: String, required: true}, // نرخ
//     amount: {type: String, required: true}, // مبلغ
//     intermediate: {type: String, required: true}, // میان باری
//     peakLoad: {type: String, required: true}, // اوج بار
//     lowLoad: {type: String, required: true}, // کم بار
//     peakTimesFriday: {type: String, required: true}, // اوج بار جمعه
//     reactive: {type: String, required: true}, // راکتیو
//     vat: {type: Number, required: true}, // مالیات بر ارزش افزوده
//     electricalTolls: {type: Number, required: true}, // عوارض برق
//     debt: {type: Number, required: true}, // بدهکاری کسر هزار ریال
    ///////////////////////

    
  getOneBill(pId): void {
    this.powerReceiptService.getOneReceipt({
      id: pId
    })
      .subscribe((res: any) => {
        if (res) {
          this.powerBillDto = res.data;
          this.powerAllocation= res.data.powerSharing;
          // this.setEnumUseType();
        }
      });
  }
  createReceipt(): void {
    this.touched = true;
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      Notiflix.Notify.Failure('ورودی رو بررسی کنید!');
      return;
    }

    if (!this.edited) {
      this.powerReceiptService.createReceipt(this.powerBillDto)
        .subscribe((res: any) => {
          if (res) {
            Notiflix.Notify.Success('ایجاد اشتراک برق با موفقیت انجام شد.');
            this.powerId = res.data;
            setTimeout(() => {
              $('#pills-building-tab').click();
            }, 200);
            // this.router.navigate(['/index/user/configuration/powerList']);
          }
        });
    } else {

      this.powerReceiptService.updateReceipt({id: this.powerId}, this.powerBillDto)
        .subscribe((res: any) => {
          if (res) {
            Notiflix.Notify.Success('ویرایش اشتراک برق با موفقیت انجام شد.');
            // this.router.navigate(['/index/user/configuration/powerList']);
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
  }
}