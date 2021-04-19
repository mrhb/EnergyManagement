/**
 * create By kazem Pourbadakhshan
 * Email: k_pour@yahoo.com
 */

import {AfterViewInit, Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {EnergyAllocation, EnergyBillDto,EnergyList} from '../../../../model/energy';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MyPattern } from 'src/app/shared/tools/myPattern';
import { EnergyReceiptService } from '../../../../service/energy-receipt.service';
import { EnergyService } from '../../../../service/energy.service';
import Notiflix from 'notiflix';
import { Moment } from 'src/app/shared/tools/moment';
import { EnergyCarierEnum } from '../../../../model/energyEnum';
declare var $: any;
@Component({
  selector: 'app-Energy-bill-add',
  templateUrl: './energy-bill-add.component.html',
  styleUrls: ['./energy-bill-add.component.scss']
})
export class EnergyBillAddComponent implements OnInit , AfterViewInit{
  pageSize = 20;
  pageIndex = 0;
  length = -1;
  touched = false;
  edited = false;
  myPattern = MyPattern;
  moment = Moment;

  energyId = '';
  energyCarierEnum=EnergyCarierEnum;
  energyList: EnergyList[] = [];

  form: FormGroup;
  energyBillDto = new EnergyBillDto();
  energyAllocation = new EnergyAllocation();

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private  activatedRoute: ActivatedRoute,
    private  energyService: EnergyService,
    private  energyReceiptService: EnergyReceiptService
) { 
  this.activatedRoute.queryParams.subscribe(params => {
    console.log('params', params);
    if (params.id) {
      this.edited = true;
      this.energyId = params.id;
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
        this.energyBillDto.fromDate = this.moment.convertJaliliToIsoDate($(e.currentTarget).val());
        if (this.energyBillDto.fromDate > this.energyBillDto.toDate) {
          setTimeout(() => {
            Notiflix.Notify.Failure('تاریخ شروع باید قبل از تاریخ پایان انتخاب شود');
            this.energyBillDto.toDate = null;
            $('#toDate').val(this.moment.getJaliliDateFromIso(this.energyBillDto.toDate));
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
        this.energyBillDto.toDate = this.moment.convertJaliliToIsoDate($(e.currentTarget).val());
        console.log('this.energyBillDto.toDate', this.energyBillDto.toDate);
        if (this.energyBillDto.fromDate > this.energyBillDto.toDate) {
          setTimeout(() => {
            Notiflix.Notify.Failure('تاریخ وارده باید قبل از تاریخ شروع انتخاب شود');
            this.energyBillDto.toDate = null;
            $('#toDate').val(this.moment.getJaliliDateFromIso(this.energyBillDto.fromDate));
          }, 200);
        }
      });
    }, 100);
  }

  ngOnInit(): void {
    this.form=this.formBuilder.group({
      energyCarrier: [''], //حامل انرژی 
      fromDate:[], // تاریخ شروع 
      toDate:[], // تاریخ اتمام
      numberDays:[], // روزها      
      consumptionDurat:[], // میزان مصرف
      consumptionAmount:[],//هزینه انرژی
      otherAmount:[], // سایر هزینه ها      
      payableAmount:[], //  مبلغ قابل پرداخت     
    }
    );
  }

  getOneBill(pId): void {
    this.energyReceiptService.getOneReceipt({
      id: pId
    })
      .subscribe((res: any) => {
        if (res) {
          this.energyBillDto = res.data;
          $('#fromDate').val(this.moment.getJaliliDateFromIso(this.energyBillDto.fromDate));
          $('#toDate').val(this.moment.getJaliliDateFromIso(this.energyBillDto.toDate));
          this.energyAllocation= res.data.sharing;
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
      this.energyReceiptService.createReceipt(this.energyBillDto)
        .subscribe((res: any) => {
          if (res) {
            Notiflix.Notify.Success('ایجاد قبض انرژی با موفقیت انجام شد.');
            this.energyId = res.data;
            setTimeout(() => {
              $('#pills-building-tab').click();
            }, 200);
            // this.router.navigate(['/index/user/configuration/energyList']);
          }
        });
    } else {
  
      this.energyReceiptService.updateReceipt({id: this.energyId}, this.energyBillDto)
        .subscribe((res: any) => {
          if (res) {
            Notiflix.Notify.Success('ویرایش قبض انرژی با موفقیت انجام شد.');
            // this.router.navigate(['/index/user/configuration/energyList']);
          }
        });
    }
  
  }
  getListEnergy(): void {
    this.energyService.getEnergyList(
      {
        page: this.pageIndex,
        size: this.pageSize,
      }, ''
    ).subscribe((res: any) => {
      if (res) {
        this.energyList = res.content;
        this.length = res.totalElements;
      }
    });
  }
  selectEnergy(item): void {
    this.energyAllocation = item;
    
    this.energyBillDto.sharingId=item._id;
  }
}