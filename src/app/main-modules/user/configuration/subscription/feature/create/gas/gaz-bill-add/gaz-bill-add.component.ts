/**
 * create By kazem Pourbadakhshan
 * Email: k_pour@yahoo.com
 */

import {GasList,GasAllocation} from '../../../../model/gas';
import { GasReceiptService } from '../../../../service/gas-receipt.service';
import { GasService } from '../../../../service/gas.service';
import Notiflix from 'notiflix';

import { AfterViewInit, Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {GasBillDto} from '../../../../model/gas';
import {FormBuilder, FormGroup} from '@angular/forms';
import { Moment } from 'src/app/shared/tools/moment';
declare var $: any;

@Component({
  selector: 'app-gaz-bill-add',
  templateUrl: './gaz-bill-add.component.html',
  styleUrls: ['./gaz-bill-add.component.scss']
})
export class GazBillAddComponent implements OnInit , AfterViewInit{
  pageSize = 20;
  pageIndex = 0;
  length = -1;
  touched = false;
  edited = false;
  gasId = '';

  moment = Moment;
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
      estandardConsumption:[],  //  مصرف دوره
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
        this.gasBillDto.fromDate = this.moment.convertJaliliToIsoDate($(e.currentTarget).val());
        if (this.gasBillDto.fromDate > this.gasBillDto.toDate) {
          setTimeout(() => {
            Notiflix.Notify.Failure('تاریخ شروع باید قبل از تاریخ پایان انتخاب شود');
            this.gasBillDto.toDate = null;
            $('#toDate').val(this.moment.getJaliliDateFromIso(this.gasBillDto.toDate));
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
        this.gasBillDto.toDate = this.moment.convertJaliliToIsoDate($(e.currentTarget).val());
        console.log('this.gasBillDto.toDate', this.gasBillDto.toDate);
        if (this.gasBillDto.fromDate > this.gasBillDto.toDate) {
          setTimeout(() => {
            Notiflix.Notify.Failure('تاریخ وارده باید قبل از تاریخ شروع انتخاب شود');
            this.gasBillDto.toDate = null;
            $('#toDate').val(this.moment.getJaliliDateFromIso(this.gasBillDto.fromDate));
          }, 200);
        }
      });
    }, 100);
  }
getOneBill(pId): void {
  this.gasReceiptService.getOneReceipt({
    id: pId
  })
    .subscribe((res: any) => {
      if (res) {
        this.gasBillDto = res.data;
        $('#fromDate').val(this.moment.getJaliliDateFromIso(this.gasBillDto.fromDate));
        $('#toDate').val(this.moment.getJaliliDateFromIso(this.gasBillDto.toDate));
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
  this.gasBillDto.gasSharingId=item._id;

}
}