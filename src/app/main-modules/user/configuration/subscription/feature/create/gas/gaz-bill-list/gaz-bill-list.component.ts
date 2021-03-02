 /**
 * create By reza mollaei
 * Email: reza_yki@yahoo.com
 * telegram: reza_yki
 */

import { Component, OnInit } from '@angular/core';
// @ts-ignore
import Notiflix from 'notiflix';
import {ActivatedRoute, Router} from '@angular/router';
import { GasReceiptService } from '../../../../service/gas-receipt.service';

import {GasBillList} from '../../../../model/gas';
import { UseTypeGasEnum } from '../../../../model/gasEnum';

@Component({
  selector: 'app-gaz-bill-list',
  templateUrl: './gaz-bill-list.component.html',
  styleUrls: ['./gaz-bill-list.component.scss']
})
export class GazBillListComponent implements OnInit {
  pageSize = 10;
  pageIndex = 0;
  length = -1;
  totalPages = 1;

   useTypeEnum = UseTypeGasEnum;
  gasBillList: GasBillList[] = [];
  
  constructor(public router: Router,
    private gasReceiptService: GasReceiptService,
    private activatedRoute: ActivatedRoute) { }
  ngOnInit(): void {
    this.getGasBillList();
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
