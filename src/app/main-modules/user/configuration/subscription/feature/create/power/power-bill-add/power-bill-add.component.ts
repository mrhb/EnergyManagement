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
  power = new PowerList();


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

  
  getOneBill(pId): void {
    this.powerReceiptService.getOneReceipt({
      id: pId
    })
      .subscribe((res: any) => {
        if (res) {
          this.powerBillDto = res.data;
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
    this.power.name = item.name;
    this.power.id = item.id;
  }
}