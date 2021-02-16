 /**
 * create By reza mollaei
 * Email: reza_yki@yahoo.com
 * telegram: reza_yki
 */

import { Component, OnInit } from '@angular/core';
import {WaterBillList} from '../../../../model/water';
// @ts-ignore
import Notiflix from 'notiflix';
import {WaterService} from '../../../../service/water.service';
import {ActivatedRoute} from '@angular/router';
import {UseTypeWater} from '../../../../model/waterEnum';

@Component({
  selector: 'app-water-bill-list',
  templateUrl: './water-bill-list.component.html',
  styleUrls: ['./water-bill-list.component.scss']
})
export class WaterBillListComponent implements OnInit {
  pageSize = 10;
  pageIndex = 0;
  length = -1;

  useTypeEnum = UseTypeWater;
  waterBillList: WaterBillList[] = [];
  constructor(private waterService: WaterService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getListPower();
  }

  getListPower(): void {
    this.waterService.getWaterBillList(
      {
        page: this.pageIndex,
        size: this.pageSize,
      }, ''
    ).subscribe((res: any) => {
      if (res) {
        this.waterBillList = res.content;
      }
    });
  }

  getListWater(): void {
    this.waterService.getWaterBillList(
      {
        page: this.pageIndex,
        size: this.pageSize,
      }, ''
    ).subscribe((res: any) => {
      if (res) {
        this.waterBillList = res.content;
      }
    });
  }

  navigate(): void {
    console.log(this.activatedRoute.snapshot.url[0].path);
    // @ts-ignore
    this.router.navigate([this.activatedRoute.parent.snapshot._routerState.url.split('?')[0]], {
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
