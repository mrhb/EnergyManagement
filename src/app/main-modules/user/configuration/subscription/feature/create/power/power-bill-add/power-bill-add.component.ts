import { Component, OnInit } from '@angular/core';
import {PowerBillDto, PowerList} from '../../../../model/power';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MyPattern } from 'src/app/shared/tools/myPattern';
import {PowerAllocation} from '../../../../model/power';
import { ActivatedRoute, Router } from '@angular/router';
import { PowerReceiptService } from '../../../../service/power-receipt.service';
import { PowerService } from '../../../../service/power.service';

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
      startDate:[], // تاریخ شروع 
      endDate:[], // تاریخ اتمام
      Days:[], // روزها
      ghodratGharar:[], // قدرت قراردادی
      ghodratMohasebeh:[], // قدرت محاسبه شده
      maximeterNumber:[], // عدد ماکسیمتر
      ghodratMasrafy:[], // قدرت مصرفی  
      zianBady:[], //  ضریب زیان بدی مصرف   
      mohlatParakht:[], //  مهلت پرداخت
    }

    );
  }
//////////////////

// fromDate: {type: Date, required: true}, // از تاریخ
//     toDate: {type: Date, required: true}, // تا تاریخ
//     numberDays: {type: Number, required: true}, // تعداد روز دوره
//     explanationExpenses: {type: String, required: true}, // شرح مصارف
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
//     contractualPower: {type: String, required: true}, // قدرت قراردادی
//     calculatedPower: {type: String, required: true}, // قدرت محاسبه شده
//     maximeterNumber: {type: String, required: true}, // عدد ماکسیمتر
//     powerConsumption: {type: String, required: true}, // قدرت مصرفی
//     badConsumptionLossRatio: {type: String, required: true}, // ضریب زیان بدی مصرف
//     paymentDeadLine: {type: Date, required: true}, // مهلت پرداخت
//     consumptionAmount: {type: Number, required: true}, // مبلغ مصرف
//     subscription: {type: String, required: true}, // آبونمان
//     powerPrice: {type: Number, required: true}, // بهای قدرت
//     seasonPrice: {type: Number, required: true}, // بهای فصل
//     badPenaltiesForConsumingElectricityDuringThePeriod: {type: Number, required: true}, // جریمه بدی مصرف بهای برق دوره
//     vat: {type: Number, required: true}, // مالیات بر ارزش افزوده
//     electricalTolls: {type: Number, required: true}, // عوارض برق
//     debt: {type: Number, required: true}, // بدهکاری کسر هزار ریال
//     payableAmount: {type: Number, required: true}, // مبلغ قابل پرداخت
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