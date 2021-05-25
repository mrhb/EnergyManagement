/**
 * create By reza mollaei
 * Email: reza_yki@yahoo.com
 * telegram: reza_yki
 */

 import { Component, OnInit } from '@angular/core';
 // @ts-ignore
 import Notiflix from 'notiflix';
 import {ActivatedRoute, Router} from '@angular/router';
import { TariffService } from '../../service/tariff.service';
import { TariffList } from '../../model/tariff';
import { GroupEnum } from '../../model/tariffEnum';
import { Moment } from 'src/app/shared/tools/moment';
 
@Component({
  selector: 'app-tariff-list',
  templateUrl: './tariff-list.component.html',
  styleUrls: ['./tariff-list.component.scss']
})
export class TariffListComponent implements OnInit {
  pageSize = 20;
  pageIndex = 0;
  length = -1;
  totalPages = 1;
  moment = Moment;
  groupEnum=GroupEnum;
  // generationTypeEnum = GenerationTypeEnum;
  // consumptionTypeEnum=ConsumptionTypeEnum;
  triffList: TariffList[] = [];
  constructor(private tariffService: TariffService,
              public router: Router,
              private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params.pageIndex) {
        this.pageIndex = params.pageIndex;
        this.pageSize = params.pageSize;
      }
      this.getTariffList();
    });
  }

  ngOnInit(): void {
  }

  getTariffList(): void {
    this.tariffService.getTariffList(
      {
        page: this.pageIndex,
        size: this.pageSize,
      }, ''
    ).subscribe((res: any) => {
      if (res) {
        this.triffList = res.content;
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
    this.getTariffList();
  }

  changePage(event: any): void {
    this.length = event.length;
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.navigate();
  }

  deleteTariff(i, pId): void {
    Notiflix.Confirm.Show(
      'تعرفه',
      'آیا اطمینان دارید که این تعرفه حذف گردد؟',
      'بله',
      'خیر',
      () => {
        this.tariffService.deleteTariff({id: pId})
          .subscribe((res: any) => {
            if (res) {
              Notiflix.Notify.Success('حذف با موفقیت انجام گردید');
              this.triffList.splice(i, 1);
            }
          });
      });
  }

}
