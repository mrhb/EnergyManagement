import { Component, OnInit } from '@angular/core';
import {BuildingList, Region} from '../../model/building';
import {BuildingService} from '../../service/building.service';
import {ActivatedRoute, Router} from '@angular/router';
import {UseTypeEnum} from '../../model/useTypeEnum';
// @ts-ignore
import Notiflix from 'notiflix';

@Component({
  selector: 'app-building-list',
  templateUrl: './building-list.component.html',
  styleUrls: ['./building-list.component.scss']
})
export class BuildingListComponent implements OnInit {
  pageSize = 10;
  pageIndex = 0;
  length = -1;

  useTypeEnum = UseTypeEnum;
  region = new Region();
  buildingList: BuildingList[] = [];
  constructor(private buildingService: BuildingService,
              public router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getBuildingList();
  }

  getRegion($event: any): void {
    this.region = $event;
    console.log('this.region', this.region);
    this.getBuildingList();
  }

  getBuildingList(): void {
    this.buildingService.getBuildingList({
      page: this.pageIndex,
      size: this.pageSize,
    }, {regionId: this.region.regionId}).subscribe((res: any) => {
      if (res) {
        this.buildingList = res.content;
      }
    });
  }

  deleteBuilding(i: number, bId): void {
    Notiflix.Confirm.Show(
      'حذف فضا',
      'آیا اطمینان دارید که ساختمان حذف گردد؟',
      'بله',
      'خیر',
      () => {
        this.buildingService.deleteBuilding({id: bId})
          .subscribe((res: any) => {
            if (res) {
              Notiflix.Notify.Success('حذف فضا با موفقیت انجام گردید');
              this.buildingList.splice(i, 1);
            }
          });
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
    this.getBuildingList();
  }

  changePage(event: any): void {
    this.length = event.length;
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.navigate();
  }
}
