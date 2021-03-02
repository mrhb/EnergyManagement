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
import {UseTypeWater} from '../../../../model/waterEnum';

@Component({
  selector: 'app-water-list',
  templateUrl: './water-list.component.html',
  styleUrls: ['./water-list.component.scss']
})
export class WaterListComponent implements OnInit {
  pageSize = 10;
  pageIndex = 0;
  length = -1;
  totalPages = 1;

  useTypeEnum = UseTypeWater;
  waterList: WaterList[] = [];
  constructor(private waterService: WaterService,
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
  }

  getListWater(): void {
    this.waterService.getWaterList(
      {
        page: this.pageIndex,
        size: this.pageSize,
      }, ''
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
      'قبض',
      'آیا اطمینان دارید که این اشتراک حذف گردد؟',
      'بله',
      'خیر',
      () => {
        this.waterService.deleteWater({id: pId})
          .subscribe((res: any) => {
            if (res) {
              Notiflix.Notify.Success('قبض با موفقیت انجام گردید');
              this.waterList.splice(i, 1);
            }
          });
      });
  }

}
