/**
 * create By kazem Pourbadakhshan
 * Email: k_pour@yahoo.com
 */

import {GasList,GasAllocation} from '../../../../model/gas';
import { GasReceiptService } from '../../../../service/gas-receipt.service';
import { GasService } from '../../../../service/gas.service';
import Notiflix from 'notiflix';

import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {GasBillDto} from '../../../../model/gas';
import {FormBuilder, FormGroup} from '@angular/forms';
declare var $: any;

@Component({
  selector: 'app-gaz-bill-add',
  templateUrl: './gaz-bill-add.component.html',
  styleUrls: ['./gaz-bill-add.component.scss']
})
export class GazBillAddComponent implements OnInit {
  pageSize = 20;
  pageIndex = 0;
  length = -1;
  touched = false;
  edited = false;
  gasId = '';

  gasList: GasList[] = [];


  form: FormGroup;
  gasBillDto = new GasBillDto();
  gasAllocation = new GasAllocation();




  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private  activatedRoute: ActivatedRoute,
    private  gasReceiptService: GasReceiptService,
    private  gasService: GasService,
) { 
        this.activatedRoute.queryParams.subscribe(params => {
        console.log('params', params);
        if (params.id) {
          this.edited = true;
          this.gasId = params.id;
          this.getOneBill(params.id);
        }
      });

}
  ngOnInit(): void {
    this.form=this.formBuilder.group({
      billingId: [''],
      paymentCode: [''],
      fromDate:[], // تاریخ شروع 
      toDate:[], // تاریخ اتمام
      numberDays:[], // روزها      
      previousCounter:[], // رقم پیشین شمارشگر
      currentCounter:[], // رقم فعلی شمارشگر
      consumptionDurat:[], // مصرف دوره
      totalCounter:[],  // کارکرد شمارشگر
      estandardConsumption:[],  //  مصرف استاندارد
      consumptionAmount:[],  //   بهای گاز مصرفی
      subscription:[],  //    آبونمان
      gasTolls:[],  //    عوارض
      insurance:[],  //    بیمه
      bedehyMotaf:[],  //    بدهی متفرقه
      mandeBedehy:[],  //     مانده بدهی
      mandeHesabGhab:[],  //     مانده صورتحساب قبلی
      teedadBedehy:[],  //     تعداد بدهی  
      payableAmount:[],  //      مبلغ قابل پرداخت  
    }
    
    );
  }

getOneBill(pId): void {
  this.gasReceiptService.getOneReceipt({
    id: pId
  })
    .subscribe((res: any) => {
      if (res) {
        this.gasBillDto = res.data;
        this.gasAllocation= res.data.gasSharing;
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
    this.gasReceiptService.createReceipt(this.gasBillDto)
      .subscribe((res: any) => {
        if (res) {
          Notiflix.Notify.Success('ایجاد قبض گاز با موفقیت انجام شد.');
          this.gasId = res.data;
          setTimeout(() => {
            $('#pills-building-tab').click();
          }, 200);
          // this.router.navigate(['/index/user/configuration/gasList']);
        }
      });
  } else {

    this.gasReceiptService.updateReceipt({id: this.gasId}, this.gasBillDto)
      .subscribe((res: any) => {
        if (res) {
          Notiflix.Notify.Success('ویرایش قبض گاز با موفقیت انجام شد.');
          // this.router.navigate(['/index/user/configuration/gasList']);
        }
      });
  }

}
getListGas(): void {
  this.gasService.getGasList(
    {
      page: this.pageIndex,
      size: this.pageSize,
    }, ''
  ).subscribe((res: any) => {
    if (res) {
      this.gasList = res.content;
      this.length = res.totalElements;
    }
  });
}
selectGas(item): void {
  this.gasAllocation = item;
  this.gasBillDto.gasSharingId=item.id;

}
}