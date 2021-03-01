import { Component, OnInit } from '@angular/core';
import {Consumption, PowerBillDto, PowerList} from '../../../../model/power';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import Notiflix from 'notiflix';
import { MyPattern } from 'src/app/shared/tools/myPattern';
import {PowerAllocation} from '../../../../model/power';
import { ActivatedRoute, Router } from '@angular/router';
import { PowerReceiptService } from '../../../../service/power-receipt.service';
import { PowerService } from '../../../../service/power.service';
import { WaterBillAddComponent } from '../../water/water-bill-add/water-bill-add.component';
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
  formIntermed: FormGroup;
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
  }
    


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