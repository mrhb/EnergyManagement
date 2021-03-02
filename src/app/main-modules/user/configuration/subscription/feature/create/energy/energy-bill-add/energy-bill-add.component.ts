/**
 * create By kazem Pourbadakhshan
 * Email: k_pour@yahoo.com
 */

import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {EnergyAllocation, EnergyBillDto,EnergyList} from '../../../../model/energy';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MyPattern } from 'src/app/shared/tools/myPattern';
import { EnergyReceiptService } from '../../../../service/energy-receipt.service';
import { EnergyService } from '../../../../service/energy.service';
import Notiflix from 'notiflix';
declare var $: any;
@Component({
  selector: 'app-Energy-bill-add',
  templateUrl: './energy-bill-add.component.html',
  styleUrls: ['./energy-bill-add.component.scss']
})
export class EnergyBillAddComponent implements OnInit {
  pageSize = 20;
  pageIndex = 0;
  length = -1;
  touched = false;
  edited = false;
  myPattern = MyPattern;
  energyId = '';
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

}
  ngOnInit(): void {
    this.form=this.formBuilder.group({
      energyCarrier: [''], //حامل انرژی 
      fromDate:[], // تاریخ شروع 
      toDate:[], // تاریخ اتمام
      numberDays:[], // روزها      
      consumptionAmount:[], // میزان مصرف
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
          this.energyAllocation= res.data.energySharing;
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
    this.energyBillDto.energySharingId=item.id;
  }
}