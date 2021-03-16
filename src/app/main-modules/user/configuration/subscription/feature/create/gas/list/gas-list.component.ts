/**
 * create By reza mollaei
 * Email: reza_yki@yahoo.com
 * telegram: reza_yki
 */

import { Component, OnInit } from '@angular/core';
import {GasList} from '../../../../model/gas';
import {GasService} from '../../../../service/gas.service';
import {ActivatedRoute, Router} from '@angular/router';
import {GroupGasEnum,UseTypeGasEnum} from '../../../../model/gasEnum';
// @ts-ignore
import Notiflix from 'notiflix';

import * as XLSX from 'xlsx';
type AOA = any[][];

@Component({
  selector: 'app-gas-list',
  templateUrl: './gas-list.component.html',
  styleUrls: ['./gas-list.component.scss']
})
export class GasListComponent implements OnInit {
  pageSize = 5;
  pageIndex = 0;
  length = -1;
  totalPages = 1;
  data: AOA = [[1, 2], [3, 4]];
  xlsxGasList: GasList[] = [];

  useTypeEnum = UseTypeGasEnum;
  groupGasEnum = GroupGasEnum;

  gasList: GasList[] = [];
  constructor(private gasService: GasService,
              public router: Router,
              private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params.pageIndex) {
        this.pageIndex = params.pageIndex;
        this.pageSize = params.pageSize;
      }
      this.getListGas();
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

      this.data.forEach(item => {
       let bill=new GasList();

                bill.name = item[0]; // نام مشترک
                bill.addressCode=item[1]; // کد آدرس

                this.xlsxGasList.push(bill);
    });

    };
    reader.readAsBinaryString(target.files[0]);
  }

  saveXlsxData()
  {
    this.gasService.createMultiReceipt(this.xlsxGasList)
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

  getListGas(): void {
    this.gasService.getGasList(
      {
        page: this.pageIndex,
        size: this.pageSize,
      }, ''
    ).subscribe((res: any) => {
      if (res) {
        this.gasList = res.content;
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
    this.getListGas();
  }

  changePage(event: any): void {
    this.length = event.length;
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.navigate();
  }

  deleteGas(i, pId): void {
    Notiflix.Confirm.Show(
      'قبض',
      'آیا اطمینان دارید که این اشتراک حذف گردد؟',
      'بله',
      'خیر',
      () => {
        this.gasService.deleteGas({id: pId})
          .subscribe((res: any) => {
            if (res) {
              Notiflix.Notify.Success('حذف با موفقیت انجام گردید');
              this.gasList.splice(i, 1);
            }
          });
      });
  }

}
