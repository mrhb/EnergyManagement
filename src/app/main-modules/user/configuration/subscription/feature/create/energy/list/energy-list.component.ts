/**
 * create By reza mollaei
 * Email: reza_yki@yahoo.com
 * telegram: reza_yki
 */

import { Component, OnInit } from '@angular/core';
import {EnergyList} from '../../../../model/energy';
// @ts-ignore
import Notiflix from 'notiflix';
import {EnergyService} from '../../../../service/energy.service';
import {ActivatedRoute, Router} from '@angular/router';
import { CarierUnitEnum, EnergyCarierEnum } from '../../../../model/energyEnum';
import {UtilityTypeEnum} from '../../../../../building/model/useTypeEnum';

import * as XLSX from 'xlsx';
import { RegionService } from 'src/app/main-modules/user/configuration/region/service/region.service';
type AOA = any[][];


@Component({
  selector: 'app-energy-list',
  templateUrl: './energy-list.component.html',
  styleUrls: ['./energy-list.component.scss']
})
export class EnergyListComponent implements OnInit {
  pageSize = 10;
  pageIndex = 0;
  length = -1;
  totalPages = 1;
  regionId ="111111111111111111111111";


  data: AOA = [[1, 2], [3, 4]];
  xlsxEnergyList: EnergyList[] = [];
  utilityTypeEnum = UtilityTypeEnum;

  energyCarierEnum=EnergyCarierEnum;
  carierUnitEnum=CarierUnitEnum;
  energyList: EnergyList[] = [];
  constructor(    
    private stateService:RegionService,
    private energyService: EnergyService,
              public router: Router,
              private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params.pageIndex) {
        this.pageIndex = params.pageIndex;
        this.pageSize = params.pageSize;
      }
      this.getListEnergy();
    });
  }

  ngOnInit(): void {
    this.stateService.regionId.subscribe(reg=>{
      this.regionId=reg;
      this.getListEnergy();
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
       let bill=new EnergyList();
       
       bill.name = item[0]; // نام مشترک
       bill.energyCarrier = item[0]; //حامل انرژی
       bill.energyUnit = item[0]; //واحد انرژی
       bill.shareNumber = item[0]; //شماره کنتور
       bill.capacity = item[0]; //ظرفیت
       bill.kiloWatConvert = item[0]; // ضریب تبدیل به کیلووات
       this.xlsxEnergyList.push(bill);
    });

    };
    reader.readAsBinaryString(target.files[0]);
  }

  saveXlsxData()
  {
    this.energyService.createMultiReceipt(this.xlsxEnergyList)
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
  getListEnergy(): void {
    this.energyService.getEnergyList(
      {
        page: this.pageIndex,
        size: this.pageSize,
      },{regionId: this.regionId}
      ).subscribe((res: any) => {
      if (res) {
        this.energyList = res.content;
        this.length = res.totalElements;
        this.pageIndex = res.page;
        this.totalPages = res. totalPages;
      }
    });
  }

  navigate(): void {
    this.router.navigate([window.location.hash.split('#/')[1].split('?')[0]], {
      queryParams: {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
      },
    });
    this.getListEnergy();
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
        this.energyService.deleteEnergy({id: pId})
          .subscribe((res: any) => {
            if (res) {
              Notiflix.Notify.Success('حذف با موفقیت انجام گردید');
              this.energyList.splice(i, 1);
            }
          });
      });
  }
}
