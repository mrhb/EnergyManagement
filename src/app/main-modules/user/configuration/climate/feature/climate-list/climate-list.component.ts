import { Component, OnInit } from '@angular/core';
import { ClimateList, ClimateListDto } from '../../model/climate';
import { ClimateTypeEnum, ProvinceEnum } from '../../model/climateEnum';
import { ActivatedRoute, Router } from '@angular/router';
import { RegionService } from '../../../region/service/region.service';
import { ClimateService } from '../../service/climate.service';
import Notiflix from 'notiflix';

@Component({
  selector: 'app-climate-list',
  templateUrl: './climate-list.component.html',
  styleUrls: ['./climate-list.component.scss']
})
export class ClimateListComponent implements OnInit {
  pageSize = 20;
  pageIndex = 0;
  length = -1;
  totalPages = 1;

  filterBuilding = '';
  climateTypeEnum = ClimateTypeEnum;
  provinceEnum=ProvinceEnum;
  climateList : ClimateList [] = [];
  buildingList = [];
  climateListDto = new ClimateListDto();
  regionId ="111111111111111111111111";

  constructor(
    private router: Router,
    private climateService: ClimateService,
    private stateService:RegionService,
  ){}

  ngOnInit(): void {
    this.stateService.regionId.subscribe(reg=>{
    this.regionId=reg;
    this.getClimateList();
  });
  }

  getClimateList(): void {
    console.log('this.pageIndex', this.pageIndex);
    console.log('this.pageSize', this.pageSize);
    // this.climateList = [];
    this.climateService.getClimateList(
      {
        page: this.pageIndex,
        size: this.pageSize,
      }, ''
    ).subscribe((res: any) => {
      if (res) {
        this.climateList = res.content;
        this.length = res.totalElements;
        this.pageIndex = res.page;
        this.totalPages = res. totalPages;
      }
    });
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
  
  deleteClimate(i, pId): void {
    Notiflix.Confirm.Show(
      'اقلیم',
      'آیا اطمینان دارید که این اقلیم حذف گردد؟',
      'بله',
      'خیر',
      () => {
        this.climateService.deleteClimate({id: pId})
          .subscribe((res: any) => {
            if (res) {
              Notiflix.Notify.Success('حذف اقلیم با موفقیت انجام گردید');
              this.climateList.splice(i, 1);
            }
          });
      });
  }
}
