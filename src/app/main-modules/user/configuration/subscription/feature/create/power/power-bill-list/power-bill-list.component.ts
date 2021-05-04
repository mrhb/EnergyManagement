import { Component, OnInit } from '@angular/core';

import { Consumption, PowerBillDto, PowerBillExcelList, PowerBillList } from '../../../../model/power';
import { UseTypePowerEnum } from '../../../../model/powerEnum';


import Notiflix from 'notiflix';
import { ActivatedRoute, Router } from '@angular/router';
import { Moment } from 'src/app/shared/tools/moment';
import { PeriodEnum } from '../../../../model/sharedEnum';

import { PowerReceiptService } from '../../../../service/power-receipt.service';
import * as XLSX from 'xlsx';
type AOA = any[][];

declare var $: any;


@Component({
  selector: 'app-power-bill-list',
  templateUrl: './power-bill-list.component.html',
  styleUrls: ['./power-bill-list.component.scss']
})
export class PowerBillListComponent implements OnInit {

  pageSize = 10;
  pageIndex = 0;
  length = -1;
  totalPages = 1;
  moment = Moment;
period=PeriodEnum;
  data: AOA = [[1, 2], [3, 4]];
  wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };
  fileName: string = 'SheetJS.xlsx';

  filterBuilding = '';
  useTypeEnum = UseTypePowerEnum;
  periodEnum=PeriodEnum;
  powerBillList: PowerBillList[] = [];
  xlsxPowerBillList: PowerBillExcelList[] = [];
  buildingList = [];

  constructor(public router: Router,
              private powerReceiptService: PowerReceiptService,
              private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params.pageIndex) {
        this.pageIndex = params.pageIndex;
        this.pageSize = params.pageSize;
      }
      this.getPowerBillList();
    });
  }

  ngOnInit(): void {
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
       let bill=new PowerBillExcelList();

var periodName=[
'یکم',
'دوم',
'سوم',
'چهارم',
'پنجم',
'ششم',
'هفتم',
'هشتم',
'نهم',
'دهم',
'یازدهم',
'دوازدهم'];
       bill.billingId = item[0].toString(); // شماره اشتراک
       bill.paymentCode = item[1]; // شناسه پرداخت
       bill.period= this.period[periodName[item[2]]];//item[2]; //  دوره
       bill.fromDate=this.moment.convertJaliliToIsoDate(item[3].toString()) // تاریخ قبلی 
       bill.toDate=this.moment.convertJaliliToIsoDate(item[4].toString()); // تاریخ فعلی 
       bill.intermediate= new Consumption();
       bill.peakLoad= new Consumption();
       bill.lowLoad= new Consumption();
       bill.peakTimesFriday= new Consumption();
       bill.reactive= new Consumption();

        bill.intermediate.totalConsumption=item[5]; //مجموع مصرف  
        bill.peakLoad.totalConsumption=item[6]; //مجموع مصرف  
        bill.lowLoad.totalConsumption=item[7]; //مجموع مصرف  
        bill.peakTimesFriday.totalConsumption=item[8]; //مجموع مصرف  
        bill.reactive.totalConsumption=item[9]; //مجموع مصرف  

  bill.contractualPower=item[10]; // قدرت قراردادی
  bill.calculatedPower=item[11]; // قدرت محاسبه شده
  bill.powerConsumption=item[12]; // قدرت مصرفی
  bill.badConsumptionLossRatio=item[13]; //   ضریب زیان بدی مصرف 
  bill.maximeterNumber=item[14]; //  عدد ماکسیمتر
  bill.consumptionAmount=item[15]; //   مبلغ مصرف
  bill.consumptionDurat=item[15]; //   میزان مصرف
  bill.powerPrice=item[16]; //   بهای قدرت 
  bill.seasonPrice=item[17]; //   بهای فصل 
  bill.badPenaltiesForConsuming=item[18];// جریمه بدی مصرف 
  bill.payableAmount=item[19]; //   مبلغ قابل پرداخت


       this.xlsxPowerBillList.push(bill);
    });

    };
    reader.readAsBinaryString(target.files[0]);
  }

  saveXlsxData()
  {
    this.powerReceiptService.createMultiReceipt(this.xlsxPowerBillList)
    .subscribe((res: any) => {
      if (res) {
        Notiflix.Notify.Success('ثبت داده های اکسل با موفقیت انجام شد.');
        // setTimeout(() => {
        //   $('#pills-building-tab').click();
        // }, 200);
        this.router.navigate(['/index/user/configuration/powerBillList']);
      }
    });
  }

  getPowerBillList(): void {

    this.powerReceiptService.getReceiptList(
      {
        page: this.pageIndex,
        size: this.pageSize,
      }, ''
    ).subscribe((res: any) => {
      if (res) {
        this.powerBillList = res.content;
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
    this.getPowerBillList();
  }


  changePage(event: any): void {
    this.length = event.length;
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.navigate();
  }

  deletePower(i, pId): void {
    Notiflix.Confirm.Show(
      'حذف قبض',
      'آیا اطمینان دارید که این قبض حذف گردد؟',
      'بله',
      'خیر',
      () => {
        this.powerReceiptService.deleteReceipt({id: pId})
          .subscribe((res: any) => {
            if (res) {
              Notiflix.Notify.Success('حذف قبض با موفقیت انجام گردید');
              this.powerBillList.splice(i, 1);
            }
          });
      });
  }
}
