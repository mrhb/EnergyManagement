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
import {ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-energy-list',
  templateUrl: './energy-list.component.html',
  styleUrls: ['./energy-list.component.scss']
})
export class EnergyListComponent implements OnInit {
  pageSize = 10;
  pageIndex = 0;
  length = -1;

  energyList: EnergyList[] = [];
  constructor(private energyService: EnergyService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getListPower();
  }

  getListPower(): void {
    this.energyService.getEnergyList(
      {
        page: this.pageIndex,
        size: this.pageSize,
      }, ''
    ).subscribe((res: any) => {
      if (res) {
        this.energyList = res.content;
      }
    });
  }

  getListEnergy(): void {
    this.energyService.getEnergyList(
      {
        page: this.pageIndex,
        size: this.pageSize,
      }, ''
    ).subscribe((res: any) => {
      if (res) {
        this.energyList = res.content;
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
      'حذف فضا',
      'آیا اطمینان دارید که این اشتراک حذف گردد؟',
      'بله',
      'خیر',
      () => {
        this.energyService.deleteEnergy({id: pId})
          .subscribe((res: any) => {
            if (res) {
              Notiflix.Notify.Success('حذف فضا با موفقیت انجام گردید');
              this.energyList.splice(i, 1);
            }
          });
      });
  }
}
