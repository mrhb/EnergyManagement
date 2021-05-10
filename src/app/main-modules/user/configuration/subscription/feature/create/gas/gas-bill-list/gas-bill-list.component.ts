 /**
 * create By reza mollaei
 * Email: reza_yki@yahoo.com
 * telegram: reza_yki
 */

import { Component, OnInit } from '@angular/core';
// @ts-ignore
import Notiflix from 'notiflix';
import {ActivatedRoute, Router} from '@angular/router';

import {GasBillExcelList, GasBillList} from '../../../../model/gas';
import { GroupGasEnum,UseTypeGasEnum } from '../../../../model/gasEnum';
import { Moment } from 'src/app/shared/tools/moment';

import { GasReceiptService } from '../../../../service/gas-receipt.service';
import * as XLSX from 'xlsx';
type AOA = any[][];

@Component({
  selector: 'app-gas-bill-list',
  templateUrl: './gas-bill-list.component.html',
  styleUrls: ['./gas-bill-list.component.scss']
})
export class GasBillListComponent implements OnInit {
  pageSize = 10;
  pageIndex = 0;
  length = -1;
  totalPages = 1;
  moment = Moment;
  data: AOA = [[1, 2], [3, 4]];
  xlsxGasBillList: GasBillExcelList[] = [];

  useTypeEnum = UseTypeGasEnum;
  groupGasEnum = GroupGasEnum;
  gasBillList: GasBillList[] = [];
  
  constructor(public router: Router,
    private gasReceiptService: GasReceiptService,
    private activatedRoute: ActivatedRoute) { }
  ngOnInit(): void {
    this.getGasBillList();
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
       let bill=new GasBillExcelList();

        bill.billingId = item[0].toString(); // شماره اشتراک
        bill.paymentCode = item[1]; // شناسه پرداخت
        bill.fromDate=this.moment.convertJaliliToIsoDate(item[2].toString()) // تاریخ قبلی 
        bill.toDate=this.moment.convertJaliliToIsoDate(item[3].toString()); // تاریخ فعلی 
        bill.previousCounter=item[4]; //رقم قبلی 
        bill.currentCounter=item[5]; //رقم فعلی 
        bill.consumptionDurat=item[6]; // مصرف دوره
        bill.consumptionAmount=item[6]; // بهای گاز مصرفی 
        bill.payableAmount=item[7];//    مبلغ قابل پرداخت      
      
        this.xlsxGasBillList.push(bill);
    });

    };
    reader.readAsBinaryString(target.files[0]);
  }

  saveXlsxData()
  {
    this.gasReceiptService.createMultiReceipt(this.xlsxGasBillList)
    .subscribe((res: any) => {
      if (res) {
        Notiflix.Notify.Success('ثبت داده های اکسل با موفقیت انجام شد.');
        // setTimeout(() => {
        //   $('#pills-building-tab').click();
        // }, 200);
        this.router.navigate(['/index/user/configuration/gasBillList']);
      }
    });
  }
 
  getGasBillList(): void {   
    this.gasReceiptService.getReceiptList(
      {
        page: this.pageIndex,
        size: this.pageSize,
      }, ''
    ).subscribe((res: any) => {
      if (res) {
        this.gasBillList = res.content;
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
  this.getGasBillList();
}

changePage(event: any): void {
  this.length = event.length;
  this.pageIndex = event.pageIndex;
  this.pageSize = event.pageSize;
  this.navigate();
}

deleteGas(i, pId): void {
  Notiflix.Confirm.Show(
    'حذف قبض',
    'آیا اطمینان دارید که این قبض حذف گردد؟',
    'بله',
    'خیر',
    () => {
      this.gasReceiptService.deleteReceipt({id: pId})
        .subscribe((res: any) => {
          if (res) {
            Notiflix.Notify.Success('حذف قبض با موفقیت انجام گردید');
            this.gasBillList.splice(i, 1);
          }
        });
    });
}

}