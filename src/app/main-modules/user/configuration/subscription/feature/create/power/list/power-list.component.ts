import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PowerList} from '../../../../model/power';
import {UseTypePowerEnum} from '../../../../model/powerEnum';
import {PowerService} from '../../../../service/power.service';
// @ts-ignore
import Notiflix from 'notiflix';
import {BuildingService} from '../../../../../building/service/building.service';
import {UseTypeBuildingEnum} from '../../../../../building/model/useTypeEnum';

@Component({
  selector: 'app-power-list',
  templateUrl: './power-list.component.html',
  styleUrls: ['./power-list.component.scss']
})
export class PowerListComponent implements OnInit {
  pageSize = 10;
  pageIndex = 0;
  length = -1;

  filterBuilding = '';
  buildingEnum = UseTypeBuildingEnum;
  useTypeEnum = UseTypePowerEnum;
  powerList: PowerList[] = [];
  buildingList = [];
  constructor(public router: Router,
              private buildingService: BuildingService,
              private powerService: PowerService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.getListPower();
    this.getListBuilding();
  }

  getListPower(): void {
    console.log('this.pageIndex', this.pageIndex);
    console.log('this.pageSize', this.pageSize);
    this.powerService.getPowerList(
      {
        page: this.pageIndex,
        size: this.pageSize,
      }, ''
    ).subscribe((res: any) => {
      if (res) {
        this.powerList = res.content;
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
    this.getListPower();
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
              this.powerList.splice(i, 1);
            }
          });
      });
  }

  getListBuilding(): void {
    this.buildingService.getListBuilding({
      page: this.pageIndex,
      size: this.pageSize,
      term: this.filterBuilding,
    }).subscribe( (res: any) => {
      if (res) {
        if (res.flag) {
          this.buildingList = res.content;
        }
      }
    });
  }

  selectBuilding(id): void {
    // this.powerService.addBuildingAllocation({
    //   id: id
    // })
  }
}
