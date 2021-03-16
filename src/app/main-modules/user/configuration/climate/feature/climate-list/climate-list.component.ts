import { Component, OnInit } from '@angular/core';
import { ClimateList } from '../../model/climate';
import { ClimateTypeEnum, ProvinceEnum } from '../../model/climateEnum';
import {Router} from '@angular/router';

@Component({
  selector: 'app-climate-list',
  templateUrl: './climate-list.component.html',
  styleUrls: ['./climate-list.component.scss']
})
export class ClimateListComponent implements OnInit {
  pageSize = 10;
  pageIndex = 0;
  length = -1;
  totalPages = 1;

  filterBuilding = '';
  climateType = ClimateTypeEnum;
  climateList: ClimateList[] = [];
  buildingList = [];

  constructor(public router: Router,) {
}

  ngOnInit(): void {
    this.getClimateList();
  }

  getClimateList(): void {
    console.log('this.pageIndex', this.pageIndex);
    console.log('this.pageSize', this.pageSize);
    this.climateList = [];
    // this.ClimateService.getClimateList(
    //   {
    //     page: this.pageIndex,
    //     size: this.pageSize,
    //   }, ''
    // ).subscribe((res: any) => {
    //   if (res) {
    //     this.climateList = res.content;
    //   }
    // });
  }
  navigate(): void {
    // console.log(this.activatedRoute.snapshot.url[0].path);
    // @ts-ignore
    this.router.navigate([window.location.hash.split('#/')[1].split('?')[0]], {
      queryParams: {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
      },
    });
    this.getClimateList();
  }
  changePage(event: any): void {
    this.length = event.length;
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.navigate();
  }

}
