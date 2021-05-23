 /**
 * create By reza mollaei
 * Email: reza_yki@yahoo.com
 * telegram: reza_yki
 */

import { Component, OnInit } from '@angular/core';
// @ts-ignore
import Notiflix from 'notiflix';
// import {WaterService} from '../../../../service/water.service';
import {ActivatedRoute, Router} from '@angular/router';
import {UseTypeWater} from '../../../../model/waterEnum';
import {WaterBillExcelList, WaterBillList} from '../../../../model/water';
import { WaterReceiptService } from '../../../../service/water-receipt.service';
import { Moment } from 'src/app/shared/tools/moment';

import * as XLSX from 'xlsx';
import { BillFilterDto } from '../../../../model/billFilter';
type AOA = any[][];

@Component({
  selector: 'app-water-bill-list',
  templateUrl: './water-bill-list.component.html',
  styleUrls: ['./water-bill-list.component.scss']
})
export class WaterBillListComponent implements OnInit {
  pageSize = 10;
  pageIndex = 0;
  length = -1;
  totalPages = 1;
  moment = Moment;

  billFilter= new BillFilterDto();

  
  data: AOA = [[1, 2], [3, 4]];
  xlsxWaterBillList: WaterBillExcelList[] = [];

  useTypeEnum = UseTypeWater;
  waterBillList: WaterBillList[] = [];
  constructor(public router: Router,
    private waterReceiptService: WaterReceiptService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getWaterBillList();
  }

  onFileChange(evt: any) {
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      this.data = <AOA>(XLSX.utils.sheet_to_json(ws, { header: 1 }));
      console.log(this.data);

      this.data.shift();

      this.data.forEach(item => {
       let bill=new WaterBillExcelList();

         bill.billingId = item[0].toString(); // شماره اشتراک
         bill.paymentCode = item[1]; // شناسه پرداخت
         bill.fromDate =this.moment.convertJaliliToIsoDate(item[2].toString()); // تاریخ قبلی 
         bill.toDate =this.moment.convertJaliliToIsoDate(item[3].toString()); // تاریخ قبلی 
         bill.previousCounter=item[4]; //  رقم قبلی 
         bill.currentCounter=item[5]; //  رقم فعلی 
         bill.consumptionDurat=item[6];//    مصرف دوره      
         bill.consumptionAmount=item[7];//    بهای آب مصرفی      
         bill.payableAmount=item[8];//    مبلغ قابل پرداخت      
     
         this.xlsxWaterBillList.push(bill);
    });

    };
    reader.readAsBinaryString(target.files[0]);
  }

  saveXlsxData()
  {
    this.waterReceiptService.createMultiReceipt(this.xlsxWaterBillList)
    .subscribe((res: any) => {
      if (res) {
        Notiflix.Notify.Success('ثبت داده های اکسل با موفقیت انجام شد.');
        // setTimeout(() => {
        //   $('#pills-building-tab').click();
        // }, 200);
        this.router.navigate(['/index/user/configuration/waterBillList']);
      }
    });
  }
 
  filterChange(event) {
    this.billFilter=event;
    this.pageSize = 10;
    this.pageIndex = 0;
    this.getWaterBillList()
  }
  getWaterBillList(): void {
    this.waterReceiptService.getReceiptList(
      {
        page: this.pageIndex,
        size: this.pageSize,
      }, this.billFilter
    ).subscribe((res: any) => {
      if (res) {
        Notiflix.Notify.Success('داده جدید دریافت شد.');

        this.waterBillList = res.content;
        this.length = res.totalElements;
        this.pageIndex = res.page;
        this.totalPages = res. totalPages;
      }
    });

  }

  navigate(): void {
    console.log(this.activatedRoute.snapshot.url[0].path);
    // @ts-ignore
    this.router.navigate([window.location.hash.split('#/')[1].split('?')[0]], {
      queryParams: {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
      },
    });
    this.getWaterBillList();
  }

  changePage(event: any): void {
    this.length = event.length;
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.navigate();
  }

  deleteWater(i, pId): void {
    Notiflix.Confirm.Show(
      'قبض',
      'آیا اطمینان دارید که این قبض حذف گردد؟',
      'بله',
      'خیر',
      () => {
        this.waterReceiptService.deleteReceipt({id: pId})
          .subscribe((res: any) => {
            if (res) {
              Notiflix.Notify.Success('حذف با موفقیت انجام گردید');
              this.waterBillList.splice(i, 1);
            }
          });
      });
  }

}
