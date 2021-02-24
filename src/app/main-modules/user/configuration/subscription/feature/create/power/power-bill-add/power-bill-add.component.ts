import { Component, OnInit } from '@angular/core';
import {PowerBillDto} from '../../../../model/power';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MyPattern } from 'src/app/shared/tools/myPattern';
import {PowerAllocation} from '../../../../model/power';
import { ActivatedRoute, Router } from '@angular/router';
import { PowerReceiptService } from '../../../../service/power-receipt.service';

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
  myPattern = MyPattern;

  form: FormGroup;
  powerBillDto = new PowerBillDto();
  powerAllocation = new PowerAllocation();

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    // private buildingService: BuildingService,
    private  activatedRoute: ActivatedRoute,
    private  powerService: PowerReceiptService) { 
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
    this.powerService.getOneReceipt({
      id: pId
    })
      .subscribe((res: any) => {
        if (res) {
          this.powerBillDto = res.data;
          // this.setEnumUseType();
        }
      });
  }
  
  // deletePower(item: PowerAllocation, i): void {
  //   Notiflix.Confirm.Show(
  //     'حذف فضا',
  //     'آیا اطمینان دارید که این اشتراک حذف گردد؟',
  //     'بله',
  //     'خیر',
  //     () => {
  //       this.powerService.deletePowerAllocation({id: this.powerId, allocationId: item.id})
  //       .subscribe((res: any) => {
  //         if (res) {
  //           Notiflix.Notify.Success('حذف اشتراک با موفقیت انجام گردید');
  //           this.powerBillDto.buildingList.splice(i, 1);
  //         }
  //       });
  //     });
  //   }
  // selectPowerAllocation(item): void {
  //   this.powerAllocation.name = item.name;
  //   this.powerAllocation.powerId = item.id;
  // }
  
  }