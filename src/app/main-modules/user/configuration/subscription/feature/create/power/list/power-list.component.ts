/**
 * create By reza mollaei
 * Email: reza_yki@yahoo.com
 * telegram: reza_yki
 */

import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PowerList} from '../../../../model/power';
import {GroupEnum, UseCodeEnum, UseTypePowerEnum} from '../../../../model/powerEnum';
import {PowerService} from '../../../../service/power.service';
// @ts-ignore
import Notiflix from 'notiflix';

@Component({
  selector: 'app-power-list',
  templateUrl: './power-list.component.html',
  styleUrls: ['./power-list.component.scss']
})
export class PowerListComponent implements OnInit {
  pageSize = 10;
  pageIndex = 0;
  length = -1;
  totalPages = 1;

  filterBuilding = '';
  useTypeEnum = UseTypePowerEnum;
  useCodeEnum=UseCodeEnum;
  groupEnum=GroupEnum;
  powerList: PowerList[] = [];
  buildingList = [];
  constructor(public router: Router,
              private powerService: PowerService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.getListPower();
  }

  getListPower(): void {
    console.log('this.pageIndex', this.pageIndex);
    console.log('this.pageSize', this.pageSize);
    this.powerService.getPowerList(
      {
        page: this.pageIndex,
        size: this.pageSize,
      }, ''
    ).subscribe((res: any) => {
      if (res) {
        this.powerList = res.content;
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
              Notiflix.Notify.Success('قبض با موفقیت انجام گردید');
              this.powerList.splice(i, 1);
            }
          });
      });
  }
}
