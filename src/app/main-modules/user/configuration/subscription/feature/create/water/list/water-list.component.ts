/**
 * create By reza mollaei
 * Email: reza_yki@yahoo.com
 * telegram: reza_yki
 */

import { Component, OnInit } from '@angular/core';
import {WaterList} from '../../../../model/water';
// @ts-ignore
import Notiflix from 'notiflix';
import {WaterService} from '../../../../service/water.service';
import {ActivatedRoute, Router} from '@angular/router';
import {UseCodeWaterEnum, UseTypeWater} from '../../../../model/waterEnum';

import * as XLSX from 'xlsx';
import { RegionService } from 'src/app/main-modules/user/configuration/region/service/region.service';
type AOA = any[][];

@Component({
  selector: 'app-water-list',
  templateUrl: './water-list.component.html',
  styleUrls: ['./water-list.component.scss']
})
export class WaterListComponent implements OnInit {
  pageSize = 20;
  pageIndex = 0;
  length = -1;
  totalPages = 1;
  regionId ="111111111111111111111111";

  xlsxWaterList: WaterList[] = [];
  data: AOA = [[1, 2], [3, 4]];

  useTypeEnum = UseTypeWater;
  useCodeWaterEnum=UseCodeWaterEnum;
  waterList: WaterList[] = [];
  constructor(
    private stateService:RegionService,
    private waterService: WaterService,
              public router: Router,
              private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params.pageIndex) {
        this.pageIndex = params.pageIndex;
        this.pageSize = params.pageSize;
      }
      this.getListWater();
    });
  }

  ngOnInit(): void {
    this.stateService.regionId.subscribe(reg=>{
      this.regionId=reg;
      this.getListWater();
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

      this.data.forEach(item => {
       let bill=new WaterList();

       bill.billingId = item[0]; // شناسه قبض 
       bill.numberShare = item[0]; // شماره اشتراک
       bill.useType=item[1]; //  کاربری انشعاب 
       bill.useCode=item[1]; //    کد و نوع تعرفه 
       bill.capacity=item[1]; // ظرفیت قراردادی 
      this.xlsxWaterList.push(bill);
    });

    };
    reader.readAsBinaryString(target.files[0]);
  }

  saveXlsxData()
  {
    this.waterService.createMultiReceipt(this.xlsxWaterList)
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
  getListWater(): void {
    this.waterService.getWaterList(
      {
        page: this.pageIndex,
        size: this.pageSize,
      },{regionId: this.regionId}
    ).subscribe((res: any) => {
      if (res) {
        this.waterList = res.content;
        this.length = res.totalElements;
        this.pageIndex = res.page;
        this.totalPages = res. totalPages;
      }
    });
  }

  navigate(): void {
    // this.activatedRoute.parent.snapshot._routerState.url.split('?')[0]
    this.router.navigate([window.location.hash.split('#/')[1].split('?')[0]], {
      queryParams: {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
      },
    });
    this.getListWater();
  }

  changePage(event: any): void {
    this.length = event.length;
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.navigate();
  }

  deleteWater(i, pId): void {
    Notiflix.Confirm.Show(
      'اشتراک',
      'آیا اطمینان دارید که این اشتراک حذف گردد؟',
      'بله',
      'خیر',
      () => {
        this.waterService.deleteWater({id: pId})
          .subscribe((res: any) => {
            if (res) {
              Notiflix.Notify.Success('حذف با موفقیت انجام گردید');
              this.waterList.splice(i, 1);
            }
          });
      });
  }

}
