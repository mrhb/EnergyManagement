 /**
 * create By reza mollaei
 * Email: reza_yki@yahoo.com
 * telegram: reza_yki
 */

import { Component, OnInit } from '@angular/core';
// @ts-ignore
import Notiflix from 'notiflix';
import {WaterService} from '../../../../service/water.service';
import {ActivatedRoute} from '@angular/router';
import {UseTypeWater} from '../../../../model/waterEnum';
import {WaterBillList} from '../../../../model/water';

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
    this.getWaterBillList();
  }
  getWaterBillList(): void {   
    this.waterBillList = [
     {
     id:"1",
     BillId: "123459886",
     StartDate:"98/01/01",
     EndDate:"98/10/01",
     Days: "27",
     Masraf:  "7020 ",
     Mablagh:   " 3600000 ریال",
     Duration: "100"
     }
   ];   
   
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
    this.getWaterBillList();
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
