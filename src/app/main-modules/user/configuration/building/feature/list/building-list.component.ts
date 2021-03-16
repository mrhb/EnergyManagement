/**
 * create By reza mollaei
 * Email: reza_yki@yahoo.com
 * telegram: reza_yki
 */

import {AfterViewInit, Component, OnInit} from '@angular/core';
import {BuildingList, EnergyLabel, Region} from '../../model/building';
import {BuildingService} from '../../service/building.service';
import {ActivatedRoute, Router} from '@angular/router';
// @ts-ignore
import Notiflix from 'notiflix';
import {EnergyLabelType} from '../../model/EnergyLabelType';
import {Moment} from '../../../../../../shared/tools/moment';
import {ChartFilter} from '../../model/chart';
import {chartTypeEnum, EffectiveParameterEnum, PeriodEnum} from '../../model/chartEnum';
import {UseTypeBuildingEnum} from '../../model/useTypeEnum';
import {CoolingHeatingSystemType} from '../../model/buildingEnum';

declare var $: any;

@Component({
  selector: 'app-building-list',
  templateUrl: './building-list.component.html',
  styleUrls: ['./building-list.component.scss']
})
export class BuildingListComponent implements OnInit {
  pageSize = 5;
  pageIndex = 0;
  length = -1;
  totalPages = 1;

  useTypeBuildingEnum = UseTypeBuildingEnum;
  coolingHeatingSystemType = CoolingHeatingSystemType;
  region = new Region();
  buildingList: BuildingList[] = [];
  buildingEnum = UseTypeBuildingEnum;

  moment = Moment;
 

  energyLabel = new EnergyLabel();
  energyLabelEnum = EnergyLabelType;

  constructor(private buildingService: BuildingService,
              public router: Router,
              private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params.pageIndex) {
        this.pageIndex = params.pageIndex;
        this.pageSize = params.pageSize;
      }
      this.getBuildingList();
    });

  }

  ngOnInit(): void {
  }

  getEnergyLabel(index): void {
    const list: EnergyLabel[] = [];
    const a: EnergyLabel = {
      consumptionIndex: '1277',
      label: 'A',
      labelType: EnergyLabelType.NON_RESIDENTIAL,
      ratio: '10.98'
    };

    const b: EnergyLabel = {
      consumptionIndex: '1858',
      label: 'B',
      labelType: EnergyLabelType.OFFICIAL,
      ratio: '75.66'
    };

    const c: EnergyLabel = {
      consumptionIndex: '1002',
      label: 'C',
      labelType: EnergyLabelType.RESIDENTIAL,
      ratio: '44.77'
    };

    const d: EnergyLabel = {
      consumptionIndex: '9502',
      label: 'D',
      labelType: EnergyLabelType.NON_RESIDENTIAL,
      ratio: '15.98'
    };

    const e: EnergyLabel = {
      consumptionIndex: '1102',
      label: 'E',
      labelType: EnergyLabelType.OFFICIAL,
      ratio: '16.48'
    };

    const f: EnergyLabel = {
      consumptionIndex: '16112',
      label: 'F',
      labelType: EnergyLabelType.RESIDENTIAL,
      ratio: '76.48'
    };

    const g: EnergyLabel = {
      consumptionIndex: '2266',
      label: 'G',
      labelType: EnergyLabelType.OFFICIAL,
      ratio: '79.12'
    };

    list.push(a);
    list.push(b);
    list.push(c);
    list.push(d);
    list.push(e);
    list.push(f);
    list.push(g);

    this.energyLabel = list[index];
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
        this.length = res.totalElements;
        this.pageIndex = res.page;
        this.totalPages = res. totalPages;
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
