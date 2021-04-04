/**
 * create By reza mollaei
 * Email: reza_yki@yahoo.com
 * telegram: reza_yki
 */

import {AfterViewInit, Component, OnInit} from '@angular/core';
import { EnergyLabel, FacilityList, Region} from '../../model/facility';
import {ActivatedRoute, Router} from '@angular/router';
// @ts-ignore
import Notiflix from 'notiflix';
import {Moment} from '../../../../../../shared/tools/moment';
import { FacilityService } from '../../service/facility.service';
import { FacilityUsageEnum } from '../../model/facilityEnum';
import { RegionService } from '../../../region/service/region.service';

declare var $: any;

@Component({
  selector: 'app-facility-list',
  templateUrl: './facility-list.component.html',
  styleUrls: ['./facility-list.component.scss']
})
export class FacilityListComponent implements OnInit, AfterViewInit {
  pageSize = 5;
  pageIndex = 0;
  length = -1;
  totalPages = 1;
  regionId ="111111111111111111111111";

  facilityUsageEnum=FacilityUsageEnum;
  facilityList: FacilityList[] = [];

  moment = Moment;
  options;
  isLoadingChart = false;
  optionsOneGraph;
  optionsOneGraph2;

  optionsThreeGraph;
  optionsThreeGraph2;


  effectiveParameterList = [];

  options2: any;


  energyLabel = new EnergyLabel();

  constructor(
    private stateService:RegionService,
    private facilityService: FacilityService,
              public router: Router,
              private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params.pageIndex) {
        this.pageIndex = params.pageIndex;
        this.pageSize = params.pageSize;
      }
      this.getFacilityList();
    });

  }

  ngOnInit(): void {
    this.stateService.regionId.subscribe(reg=>{
      this.regionId=reg;
      this.getFacilityList();
    });

  }

  ngAfterViewInit(): void {
  }

  getFacilityList(): void {
    this.facilityService.getFacilityList({
      page: this.pageIndex,
      size: this.pageSize,
    }, {regionId: this.regionId}).subscribe((res: any) => {
      if (res) {
        this.facilityList = res.content;
        this.length = res.totalElements;
        this.pageIndex = res.page;
        this.totalPages = res. totalPages;
      }
    });
  }

  deleteFacility(i: number, bId): void {
    Notiflix.Confirm.Show(
      'حذف فضا',
      'آیا اطمینان دارید که ساختمان حذف گردد؟',
      'بله',
      'خیر',
      () => {
        this.facilityService.deleteFacility({id: bId})
          .subscribe((res: any) => {
            if (res) {
              Notiflix.Notify.Success('حذف فضا با موفقیت انجام گردید');
              this.facilityList.splice(i, 1);
            }
          });
      });
  }

  navigate(): void {
    this.router.navigate([window.location.hash.split('#/')[1].split('?')[0]], {
      queryParams: {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
      },
    });

  }

  changePage(event: any): void {
    console.log('event.length', event.length);
    this.length = event.length;
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.navigate();
  }
 

}
