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
      numberShare: ['', [Validators.minLength(3), Validators.pattern(this.myPattern.nameAndFamily)]],// شماره اشتراک
      paymentCode: ['', [Validators.minLength(3), Validators.pattern(this.myPattern.nameAndFamily)]], // شناسه پرداخت
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
    this.formDiscrip=this.formBuilder.group({
      paymentDeadLine:[], //  مهلت پرداخت
      badConsumptionLossRatio:[], //  ضریب زیان بدی مصرف   
      maximeterNumber:[], // عدد ماکسیمتر
      contractualPower:[], // قدرت قراردادی
      calculatedPower:[], // قدرت محاسبه شده
      powerConsumption:[], // قدرت مصرفی  
      intermediate :[],
      // ["preCounter" "currentCounter"  "coefficient" "totalConsumption" 
      //   "consumptionAfterLastChange"  "nerkh" "mablagh" ], //   
    });
  }
  // {

//     "intermediate" : {
//         "preCounter" : 324,
//         "currentCounter" : 23453,
//         "coefficient" : 877,
//         "totalConsumption" : 986,
//         "consumptionAfterLastChange" : 13245,
//         "nerkh" : 5467,
//         "mablagh" : 9865
//     },
//     "peakLoad" : {
//         "preCounter" : 324,
//         "currentCounter" : 23453,
//         "coefficient" : 877,
//         "totalConsumption" : 986,
//         "consumptionAfterLastChange" : 13245,
//         "nerkh" : 5467,
//         "mablagh" : 9865
//     },
//     "lowLoad" : {
//         "preCounter" : 324,
//         "currentCounter" : 23453,
//         "coefficient" : 877,
//         "totalConsumption" : 986,
//         "consumptionAfterLastChange" : 13245,
//         "nerkh" : 5467,
//         "mablagh" : 9865
//     },
//     "peakTimesFriday" : {
//         "preCounter" : 324,
//         "currentCounter" : 23453,
//         "coefficient" : 877,
//         "totalConsumption" : 986,
//         "consumptionAfterLastChange" : 13245,
//         "nerkh" : 5467,
//         "mablagh" : 9865
//     },
//     "reactive" : {
//         "preCounter" : 7856,
//         "currentCounter" : 6345,
//         "coefficient" : 971,
//         "totalConsumption" : 13457,
//         "consumptionAfterLastChange" : 13245,
//         "nerkh" : 186764,
//         "mablagh" : 9987865
//     },

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