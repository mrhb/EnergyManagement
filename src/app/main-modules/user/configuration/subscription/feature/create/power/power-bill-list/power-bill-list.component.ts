import { Component, OnInit } from '@angular/core';
import { PowerBillList } from '../../../../model/power';
import { UseTypePowerEnum } from '../../../../model/powerEnum';


import Notiflix from 'notiflix';
import { PowerService } from '../../../../service/power.service';
import { ActivatedRoute, Router } from '@angular/router';

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
    private powerService: PowerService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getPowerBillList();
  }

  
  getPowerBillList(): void {
    this.powerBillList = [
      {
        id:"1",
        BillId: "123456",
        StartDate:"99/01/01",
        EndDate:"99/10/01",
        Days: "27",
        Masraf:  "720 ",
        Mablagh:   " 120000 ریال",
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
        this.powerService.deletePower({id: pId})
          .subscribe((res: any) => {
            if (res) {
              Notiflix.Notify.Success('حذف فضا با موفقیت انجام گردید');
              this.powerBillList.splice(i, 1);
            }
          });
      });
  }
}
