/**
 * create By reza mollaei
 * Email: reza_yki@yahoo.com
 * telegram: reza_yki
 */

import { Component, OnInit } from '@angular/core';
import {GasList} from '../../../../model/gas';
import {GasService} from '../../../../service/gas.service';
import {ActivatedRoute} from '@angular/router';
import {UseTypeGasEnum} from '../../../../model/gasEnum';
// @ts-ignore
import Notiflix from 'notiflix';
@Component({
  selector: 'app-gas-list',
  templateUrl: './gas-list.component.html',
  styleUrls: ['./gas-list.component.scss']
})
export class GasListComponent implements OnInit {
  pageSize = 10;
  pageIndex = 0;
  length = -1;

  useTypeEnum = UseTypeGasEnum;
  gasList: GasList[] = [];
  constructor(private gasService: GasService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getListPower();
  }

  getListPower(): void {
    this.gasService.getGasList(
      {
        page: this.pageIndex,
        size: this.pageSize,
      }, ''
    ).subscribe((res: any) => {
      if (res) {
        this.gasList = res.content;
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
      'حذف فضا',
      'آیا اطمینان دارید که این اشتراک حذف گردد؟',
      'بله',
      'خیر',
      () => {
        this.gasService.deleteGas({id: pId})
          .subscribe((res: any) => {
            if (res) {
              Notiflix.Notify.Success('حذف فضا با موفقیت انجام گردید');
              this.gasList.splice(i, 1);
            }
          });
      });
  }

}