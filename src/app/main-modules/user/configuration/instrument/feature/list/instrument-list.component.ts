/**
 * create By reza mollaei
 * Email: reza_yki@yahoo.com
 * telegram: reza_yki
 */

import { Component, OnInit } from '@angular/core';
import {InstrumentList} from '../../model/instrument';
// @ts-ignore
import Notiflix from 'notiflix';
import {InstrumentService} from '../../service/instrument.service';
import {ActivatedRoute, Router} from '@angular/router';
import { EnergyCarierEnum } from '../../model/instrumentEnum';
@Component({
  selector: 'app-instrument-list',
  templateUrl: './instrument-list.component.html',
  styleUrls: ['./instrument-list.component.scss']
})
export class InstrumentListComponent implements OnInit {
  pageSize = 10;
  pageIndex = 0;
  length = -1;
  totalPages = 1;
  energyCarierEnum=EnergyCarierEnum;

  instrumentList: InstrumentList[] = [];
  constructor(private instrumentService: InstrumentService,
              public router: Router,
              private activatedRoute: ActivatedRoute
              ) {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params.pageIndex) {
        this.pageIndex = params.pageIndex;
        this.pageSize = params.pageSize;
      }
      this.getListInstrument();
    });
  }

  ngOnInit(): void {
  }

  getListInstrument(): void {
    this.instrumentService.getInstrumentList(
      {
        page: this.pageIndex,
        size: this.pageSize,
      }, ''
    ).subscribe((res: any) => {
      if (res) {
        this.instrumentList = res.content;
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
    this.getListInstrument();
  }

  changePage(event: any): void {
    this.length = event.length;
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.navigate();
  }

  deleteInstrument(i, pId): void {
    Notiflix.Confirm.Show(
      'قبض',
      'آیا اطمینان دارید که این اشتراک حذف گردد؟',
      'بله',
      'خیر',
      () => {
        this.instrumentService.deleteInstrument({id: pId})
          .subscribe((res: any) => {
            if (res) {
              Notiflix.Notify.Success('قبض با موفقیت انجام گردید');
              this.instrumentList.splice(i, 1);
            }
          });
      });
  }
}
