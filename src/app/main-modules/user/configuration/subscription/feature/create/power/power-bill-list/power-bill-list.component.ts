import { Component, OnInit } from '@angular/core';
import { PowerBillList } from '../../../../model/power';
import { UseTypePowerEnum } from '../../../../model/powerEnum';


import Notiflix from 'notiflix';
import { ActivatedRoute, Router } from '@angular/router';
import { PowerReceiptService } from '../../../../service/power-receipt.service';

@Component({
  selector: 'app-power-bill-list',
  templateUrl: './power-bill-list.component.html',
  styleUrls: ['./power-bill-list.component.scss']
})
export class PowerBillListComponent implements OnInit {

  pageSize = 10;
  pageIndex = 0;
  length = -1;

  filterBuilding = '';
  useTypeEnum = UseTypePowerEnum;
  powerBillList: PowerBillList[] = [];
  buildingList = [];
  constructor(public router: Router,
    private PowerReceiptService: PowerReceiptService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getPowerBillList();
  }

  
  getPowerBillList(): void {

    this.PowerReceiptService.getReceiptList(
      {
        page: this.pageIndex,
        size: this.pageSize,
      }, ''
    ).subscribe((res: any) => {
      if (res) {
        this.powerBillList = res.content;
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
      'حذف فضا',
      'آیا اطمینان دارید که این اشتراک حذف گردد؟',
      'بله',
      'خیر',
      () => {
        this.PowerReceiptService.deleteReceipt({id: pId})
          .subscribe((res: any) => {
            if (res) {
              Notiflix.Notify.Success('حذف فضا با موفقیت انجام گردید');
              this.powerBillList.splice(i, 1);
            }
          });
      });
  }
}
