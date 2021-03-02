import { Component, OnInit } from '@angular/core';
import { PowerBillList } from '../../../../model/power';
import { UseTypePowerEnum } from '../../../../model/powerEnum';


import Notiflix from 'notiflix';
import { ActivatedRoute, Router } from '@angular/router';
import { PowerReceiptService } from '../../../../service/power-receipt.service';
import { Moment } from 'src/app/shared/tools/moment';

@Component({
  selector: 'app-power-bill-list',
  templateUrl: './power-bill-list.component.html',
  styleUrls: ['./power-bill-list.component.scss']
})
export class PowerBillListComponent implements OnInit {

  pageSize = 10;
  pageIndex = 0;
  length = -1;
  totalPages = 1;
  moment = Moment;

  filterBuilding = '';
  useTypeEnum = UseTypePowerEnum;
  powerBillList: PowerBillList[] = [];
  buildingList = [];
  constructor(public router: Router,
              private powerReceiptService: PowerReceiptService,
              private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params.pageIndex) {
        this.pageIndex = params.pageIndex;
        this.pageSize = params.pageSize;
      }
      this.getPowerBillList();
    });
  }

  ngOnInit(): void {
  }


  getPowerBillList(): void {

    this.powerReceiptService.getReceiptList(
      {
        page: this.pageIndex,
        size: this.pageSize,
      }, ''
    ).subscribe((res: any) => {
      if (res) {
        this.powerBillList = res.content;
        this.length = res.totalElements;
        this.pageIndex = res.page;
        this.totalPages = res. totalPages;
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
    this.getPowerBillList();
  }


  changePage(event: any): void {
    this.length = event.length;
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.navigate();
  }

  deletePower(i, pId): void {
    Notiflix.Confirm.Show(
      'حذف قبض',
      'آیا اطمینان دارید که این قبض حذف گردد؟',
      'بله',
      'خیر',
      () => {
        this.powerReceiptService.deleteReceipt({id: pId})
          .subscribe((res: any) => {
            if (res) {
              Notiflix.Notify.Success('حذف قبض با موفقیت انجام گردید');
              this.powerBillList.splice(i, 1);
            }
          });
      });
  }
}
