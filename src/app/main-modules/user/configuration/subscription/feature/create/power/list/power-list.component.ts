/**
 * create By reza mollaei
 * Email: reza_yki@yahoo.com
 * telegram: reza_yki
 */

import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PowerBillExcelList, PowerList} from '../../../../model/power';
import {GroupEnum, UseCodeEnum, UseTypePowerEnum} from '../../../../model/powerEnum';
import {PowerService} from '../../../../service/power.service';
// @ts-ignore
import Notiflix from 'notiflix';
import * as XLSX from 'xlsx';
import { RegionService } from 'src/app/main-modules/user/configuration/region/service/region.service';
type AOA = any[][];

@Component({
  selector: 'app-power-list',
  templateUrl: './power-list.component.html',
  styleUrls: ['./power-list.component.scss']
})
export class PowerListComponent implements OnInit {
  data: AOA = [[1, 2], [3, 4]];
  pageSize = 10;
  pageIndex = 0;
  length = -1;
  totalPages = 1;
  regionId ="111111111111111111111111";

  filterBuilding = '';
  useTypeEnum = UseTypePowerEnum;
  useCodeEnum=UseCodeEnum;
  groupEnum=GroupEnum;
  powerList: PowerList[] = [];
  xlsxPowerList: PowerList[] = [];
  xlsxPowerBillList: PowerBillExcelList[] = [];

  buildingList = [];
  constructor(    
    private stateService:RegionService,
    public router: Router,
    private powerService: PowerService,
    private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.stateService.regionId.subscribe(reg=>{
      this.regionId=reg;
      this.getListPower();
    })
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

        // bill.billingId = item[0].toString(); // شماره اشتراک
        // bill.paymentCode = item[1]; // شناسه پرداخت
        // bill.fromDate=this.moment.convertJaliliToIsoDate(item[2].toString()) // تاریخ قبلی 
        // bill.toDate=this.moment.convertJaliliToIsoDate(item[3].toString()); // تاریخ فعلی 
        // bill.toDate=item[2]; // تاریخ قبلی 
        // bill.toDate=item[3]; // تاریخ فعلی 
        // bill.previousCounter=item[4]; //رقم قبلی 
        // bill.currentCounter=item[5]; //رقم فعلی 
        // bill.consumptionDurat=item[6]; // مصرف دوره
        // bill.consumptionAmount=item[6]; // مصرف دوره
        // bill.payableAmount=item[7];//    مبلغ قابل پرداخت      
      
        this.xlsxPowerBillList.push(bill);
    });

    };
    reader.readAsBinaryString(target.files[0]);
  }

  saveXlsxData()
  {
    this.powerService.createMultiList(this.xlsxPowerList)
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
  getListPower(): void {
    console.log('this.pageIndex', this.pageIndex);
    console.log('this.pageSize', this.pageSize);
    this.powerService.getPowerList(
      {
        page: this.pageIndex,
        size: this.pageSize,
      },{regionId: this.regionId}
    ).subscribe((res: any) => {
      if (res) {
        this.powerList = res.content;
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
    this.getListPower();
  }


  changePage(event: any): void {
    this.length = event.length;
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.navigate();
  }

  deletePower(i, pId): void {
    Notiflix.Confirm.Show(
      'قبض',
      'آیا اطمینان دارید که این اشتراک حذف گردد؟',
      'بله',
      'خیر',
      () => {
        this.powerService.deletePower({id: pId})
          .subscribe((res: any) => {
            if (res) {
              Notiflix.Notify.Success('حذف با موفقیت انجام گردید');
              this.powerList.splice(i, 1);
            }
          });
      });
  }
}
