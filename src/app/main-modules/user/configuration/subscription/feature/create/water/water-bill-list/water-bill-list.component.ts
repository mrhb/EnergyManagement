 /**
 * create By reza mollaei
 * Email: reza_yki@yahoo.com
 * telegram: reza_yki
 */

import { Component, OnInit } from '@angular/core';
// @ts-ignore
import Notiflix from 'notiflix';
import {WaterService} from '../../../../service/water.service';
import {ActivatedRoute, Router} from '@angular/router';
import {UseTypeWater} from '../../../../model/waterEnum';
import {WaterBillList} from '../../../../model/water';
import { WaterReceiptService } from '../../../../service/water-receipt.service';

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

  useTypeEnum = UseTypeWater;
  waterBillList: WaterBillList[] = [];
  constructor(private waterReceiptService: WaterReceiptService,
              public router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getWaterBillList();
  }
  getWaterBillList(): void {
    this.waterReceiptService.getReceiptList(
      {
        page: this.pageIndex,
        size: this.pageSize,
      }, ''
    ).subscribe((res: any) => {
      if (res) {
        this.waterBillList = res.content;
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
      'حذف فضا',
      'آیا اطمینان دارید که این اشتراک حذف گردد؟',
      'بله',
      'خیر',
      () => {
        this.waterService.deleteWater({id: pId})
          .subscribe((res: any) => {
            if (res) {
              Notiflix.Notify.Success('حذف فضا با موفقیت انجام گردید');
              this.waterBillList.splice(i, 1);
            }
          });
      });
  }

}
