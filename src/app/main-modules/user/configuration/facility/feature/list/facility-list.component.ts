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

  region = new Region();
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

  constructor(private facilityService: FacilityService,
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
    // this.getFacilityList();
    $('.e-not-close a').on('click', (event) => {
      $(this).parent().toggleClass('open');
    });

    $('body').on('click', (e) => {
      if (!$('.e-not-close').is(e.target)
        && $('.e-not-close').has(e.target).length === 0
        && $('.show').has(e.target).length === 0
      ) {
        $('.e-not-close').addClass('show');
      } else {
        $('.e-not-close').removeClass('show');
      }
    });


    const currentYear = this.moment.getJDateFromIsoOnlyYear(new Date().toISOString());
    const Gregorian = this.moment.convertJaliliToGregorian(currentYear + '/1/1');

  }

  ngAfterViewInit(): void {
  }


  getRegion($event: any): void {
    this.region = $event;
    console.log('this.region', this.region);
    this.getFacilityList();
  }

  getFacilityList(): void {
    this.facilityService.getFacilityList({
      page: this.pageIndex,
      size: this.pageSize,
    }, {facilitySharingId: this.region.facilitySharingId}).subscribe((res: any) => {
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
