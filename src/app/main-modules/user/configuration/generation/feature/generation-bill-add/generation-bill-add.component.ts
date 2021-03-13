/**
 * create By kazem Pourbadakhshan
 * Email: k_pour@yahoo.com
 */

import {AfterViewInit, Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MyPattern } from 'src/app/shared/tools/myPattern';
import Notiflix from 'notiflix';
import { Moment } from 'src/app/shared/tools/moment';
import { GenerationAllocation, GenerationBillDto, GenerationList } from '../../model/generation';
import { GenerationReceiptService } from '../../service/generation-receipt.service';
import { GenerationService } from '../../service/generation.service';
declare var $: any;

@Component({
  selector: 'app-generation-bill-add',
  templateUrl: './generation-bill-add.component.html',
  styleUrls: ['./generation-bill-add.component.scss']
})
export class GenerationBillAddComponent implements OnInit  , AfterViewInit{
  pageSize = 20;
  pageIndex = 0;
  length = -1;
  touched = false;
  edited = false;
  myPattern = MyPattern;
  moment = Moment;

  generationId = '';
  generationList: GenerationList[] = [];

  form: FormGroup;
  generationBillDto = new GenerationBillDto();
  generationAllocation = new GenerationAllocation();


  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private  activatedRoute: ActivatedRoute,
    private  generationReceiptService: GenerationReceiptService,
    private  generationService: GenerationService,
) { 
        this.activatedRoute.queryParams.subscribe(params => {
        console.log('params', params);
        if (params.id) {
          this.edited = true;
          this.generationId = params.id;
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
      this.generationBillDto.fromDate = this.moment.convertJaliliToIsoDate($(e.currentTarget).val());
      if (this.generationBillDto.fromDate > this.generationBillDto.toDate) {
        setTimeout(() => {
          Notiflix.Notify.Failure('تاریخ شروع باید قبل از تاریخ پایان انتخاب شود');
          this.generationBillDto.toDate = null;
          $('#toDate').val(this.moment.getJaliliDateFromIso(this.generationBillDto.toDate));
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
      this.generationBillDto.toDate = this.moment.convertJaliliToIsoDate($(e.currentTarget).val());
      console.log('this.generationBillDto.toDate', this.generationBillDto.toDate);
      if (this.generationBillDto.fromDate > this.generationBillDto.toDate) {
        setTimeout(() => {
          Notiflix.Notify.Failure('تاریخ وارده باید قبل از تاریخ شروع انتخاب شود');
          this.generationBillDto.toDate = null;
          $('#toDate').val(this.moment.getJaliliDateFromIso(this.generationBillDto.fromDate));
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
  this.generationReceiptService.getOneReceipt({
    id: pId
  })
    .subscribe((res: any) => {
      if (res) {
        this.generationBillDto = res.data;
        $('#fromDate').val(this.moment.getJaliliDateFromIso(this.generationBillDto.fromDate));
        $('#toDate').val(this.moment.getJaliliDateFromIso(this.generationBillDto.toDate));
        this.generationAllocation= res.data.generationSharing;
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
    this.generationReceiptService.createReceipt(this.generationBillDto)
      .subscribe((res: any) => {
        if (res) {
          Notiflix.Notify.Success('ایجاد قبض آب با موفقیت انجام شد.');
          this.generationId = res.data;
          setTimeout(() => {
            $('#pills-building-tab').click();
          }, 200);
          // this.router.navigate(['/index/user/configuration/generationList']);
        }
      });
  } else {

    this.generationReceiptService.updateReceipt({id: this.generationId}, this.generationBillDto)
      .subscribe((res: any) => {
        if (res) {
          Notiflix.Notify.Success('ویرایش قبض آب با موفقیت انجام شد.');
          // this.router.navigate(['/index/user/configuration/generationList']);
        }
      });
  }

}
getListGeneration(): void {
  this.generationService.getGenerationList(
    {
      page: this.pageIndex,
      size: this.pageSize,
    }, ''
  ).subscribe((res: any) => {
    if (res) {
      this.generationList = res.content;
      this.length = res.totalElements;
    }
  });
}
selectGeneration(item): void {
  this.generationAllocation = item;
  this.generationBillDto.generationSharingId=item.id;
}
}