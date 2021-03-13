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

  energyCarierEnum=EnergyCarierEnum;
  carierUnitEnum=CarierUnitEnum;
  energyList: EnergyList[] = [];
  constructor(private energyService: EnergyService,
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
      'آیا اطمینان دارید که این اشتراک حذف گردد؟',
      'بله',
      'خیر',
      () => {
        this.energyService.deleteEnergy({id: pId})
          .subscribe((res: any) => {
            if (res) {
              Notiflix.Notify.Success('قبض با موفقیت انجام گردید');
              this.energyList.splice(i, 1);
            }
          });
      });
  }
}
