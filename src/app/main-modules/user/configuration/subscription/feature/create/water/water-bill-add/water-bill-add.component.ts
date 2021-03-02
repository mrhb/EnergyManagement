/**
 * create By kazem Pourbadakhshan
 * Email: k_pour@yahoo.com
 */

import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {WaterAllocation, WaterBillDto, WaterList} from '../../../../model/water';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MyPattern } from 'src/app/shared/tools/myPattern';
import { WaterReceiptService } from '../../../../service/water-receipt.service';
import { WaterService } from '../../../../service/water.service';
import Notiflix from 'notiflix';
declare var $: any;

@Component({
  selector: 'app-water-bill-add',
  templateUrl: './water-bill-add.component.html',
  styleUrls: ['./water-bill-add.component.scss']
})
export class WaterBillAddComponent implements OnInit {
  pageSize = 20;
  pageIndex = 0;
  length = -1;
  touched = false;
  edited = false;
  myPattern = MyPattern;
  waterId = '';
  waterList: WaterList[] = [];

  form: FormGroup;
  waterBillDto = new WaterBillDto();
  waterAllocation = new WaterAllocation();


  constructor(private formBuilder: FormBuilder,
    private router: Router,
    // private buildingService: BuildingService,
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