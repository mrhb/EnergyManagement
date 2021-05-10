import { Component, OnInit } from '@angular/core';
import { EnergyBillList } from '../../../../model/energy';
import {ActivatedRoute, Router} from '@angular/router';
import { EnergyReceiptService } from '../../../../service/energy-receipt.service';
// @ts-ignore
import Notiflix from 'notiflix';
import { Moment } from 'src/app/shared/tools/moment';
// import {EnergyService} from '../../../../service/energy.service';

import * as XLSX from 'xlsx';
type AOA = any[][];

@Component({
  selector: 'app-energy-bill-list',
  templateUrl: './energy-bill-list.component.html',
  styleUrls: ['./energy-bill-list.component.scss']
})
export class EnergyBillListComponent implements OnInit {
  pageSize = 5;
  pageIndex = 0;
  length = -1;
  totalPages = 1;
  moment = Moment;
  data: AOA = [[1, 2], [3, 4]];
  xlsxEnergyBillList: EnergyBillList[] = [];

  energyBillList: EnergyBillList[] = [];

  constructor(public router: Router,
    private energyReceiptService: EnergyReceiptService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getEnergyBillList();
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

      this.data.forEach(item => {
       let bill=new EnergyBillList();
       bill.energyCarrier = item[0]; //حامل انرژی 
      bill.fromDate=item[1]; // تاریخ شروع 
      bill.toDate=item[1]; // تاریخ اتمام 
      bill.numberDays=item[1]; // تعداد روز دوره
      bill.consumptionAmount=item[1]; // میزان مصرف
      bill.payableAmount=item[1];//    مبلغ قابل پرداخت      
       this.xlsxEnergyBillList.push(bill);
    });

    };
    reader.readAsBinaryString(target.files[0]);
  }

  saveXlsxData()
  {
    this.energyReceiptService.createMultiReceipt(this.xlsxEnergyBillList)
    .subscribe((res: any) => {
      if (res) {
        Notiflix.Notify.Success('ثبت داده های اکسل با موفقیت انجام شد.');
        // setTimeout(() => {
        //   $('#pills-building-tab').click();
        // }, 200);
        // this.router.navigate(['/index/user/configuration/powerList']);
      }
    });
  }
 
  getEnergyBillList(): void {
    this.energyReceiptService.getReceiptList(
      {
        page: this.pageIndex,
        size: this.pageSize,
      }, ''
    ).subscribe((res: any) => {
      if (res) {
        this.energyBillList = res.content;
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
    this.getEnergyBillList();
  }

  changePage(event: any): void {
    this.length = event.length;
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.navigate();
  }

  deleteEnergy(i, pId): void {
    Notiflix.Confirm.Show(
      'قبض',
      'آیا اطمینان دارید که این قبض حذف گردد؟',
      'بله',
      'خیر',
      () => {
        this.energyReceiptService.deleteReceipt({id: pId})
          .subscribe((res: any) => {
            if (res) {
              Notiflix.Notify.Success('حذف قبض با موفقیت انجام گردید');
              this.energyBillList.splice(i, 1);
            }
          });
      });
  }

}
