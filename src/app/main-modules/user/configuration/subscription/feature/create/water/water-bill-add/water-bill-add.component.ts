/**
 * create By kazem Pourbadakhshan
 * Email: k_pour@yahoo.com
 */

import {AfterViewInit, Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {WaterAllocation, WaterBillDto, WaterList} from '../../../../model/water';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MyPattern } from 'src/app/shared/tools/myPattern';
import { WaterReceiptService } from '../../../../service/water-receipt.service';
import { WaterService } from '../../../../service/water.service';
import Notiflix from 'notiflix';
import { Moment } from 'src/app/shared/tools/moment';
declare var $: any;

@Component({
  selector: 'app-water-bill-add',
  templateUrl: './water-bill-add.component.html',
  styleUrls: ['./water-bill-add.component.scss']
})
export class WaterBillAddComponent implements OnInit  , AfterViewInit{
  pageSize = 20;
  pageIndex = 0;
  length = -1;
  touched = false;
  edited = false;
  myPattern = MyPattern;
  moment = Moment;

  waterId = '';
  waterList: WaterList[] = [];

  form: FormGroup;
  waterBillDto = new WaterBillDto();
  waterAllocation = new WaterAllocation();


  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private  activatedRoute: ActivatedRoute,
    private  waterReceiptService: WaterReceiptService,
    private  waterService: WaterService,
) { 
        this.activatedRoute.queryParams.subscribe(params => {
        console.log('params', params);
        if (params.id) {
          this.edited = true;
          this.waterId = params.id;
          this.getOneBill(params.id);
        }
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
      this.waterBillDto.fromDate = this.moment.convertJaliliToIsoDate($(e.currentTarget).val());
      if (this.waterBillDto.fromDate > this.waterBillDto.toDate) {
        setTimeout(() => {
          Notiflix.Notify.Failure('تاریخ شروع باید قبل از تاریخ پایان انتخاب شود');
          this.waterBillDto.toDate = null;
          $('#toDate').val(this.moment.getJaliliDateFromIso(this.waterBillDto.toDate));
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
      this.waterBillDto.toDate = this.moment.convertJaliliToIsoDate($(e.currentTarget).val());
      console.log('this.waterBillDto.toDate', this.waterBillDto.toDate);
      if (this.waterBillDto.fromDate > this.waterBillDto.toDate) {
        setTimeout(() => {
          Notiflix.Notify.Failure('تاریخ وارده باید قبل از تاریخ شروع انتخاب شود');
          this.waterBillDto.toDate = null;
          $('#toDate').val(this.moment.getJaliliDateFromIso(this.waterBillDto.fromDate));
        }, 200);
      }
    });
  }, 100);
}
  ngOnInit(): void {
    this.form=this.formBuilder.group({
      billingId: [''],// شناسه قبض
      paymentCode: [''],// شناسه پرداخت
      fromDate:[], // تاریخ شروع 
      toDate:[], // تاریخ اتمام
      numberDays:[], // روزها      
      previousCounter:[], // رقم قبلی
      currentCounter:[], // رقم فعلی
      consumptionDurat:[], // مصرف دوره
      consumptionAmount:[], //  بهای آب مصرفی
      payableAmount:[], //     مبلغ قابل پرداخت
    }
    );
  }

getOneBill(pId): void {
  this.waterReceiptService.getOneReceipt({
    id: pId
  })
    .subscribe((res: any) => {
      if (res) {
        this.waterBillDto = res.data;
        $('#fromDate').val(this.moment.getJaliliDateFromIso(this.waterBillDto.fromDate));
        $('#toDate').val(this.moment.getJaliliDateFromIso(this.waterBillDto.toDate));
        this.waterAllocation= res.data.waterSharing;
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
    this.waterReceiptService.createReceipt(this.waterBillDto)
      .subscribe((res: any) => {
        if (res) {
          Notiflix.Notify.Success('ایجاد قبض آب با موفقیت انجام شد.');
          this.waterId = res.data;
          setTimeout(() => {
            $('#pills-building-tab').click();
          }, 200);
          // this.router.navigate(['/index/user/configuration/waterList']);
        }
      });
  } else {

    this.waterReceiptService.updateReceipt({id: this.waterId}, this.waterBillDto)
      .subscribe((res: any) => {
        if (res) {
          Notiflix.Notify.Success('ویرایش قبض آب با موفقیت انجام شد.');
          // this.router.navigate(['/index/user/configuration/waterList']);
        }
      });
  }

}
getListWater(): void {
  this.waterService.getWaterList(
    {
      page: this.pageIndex,
      size: this.pageSize,
    }, ''
  ).subscribe((res: any) => {
    if (res) {
      this.waterList = res.content;
      this.length = res.totalElements;
    }
  });
}
selectWater(item): void {
  this.waterAllocation = item;
  this.waterBillDto.waterSharingId=item.id;
}
}