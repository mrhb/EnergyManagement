import {Component, OnInit} from '@angular/core';
import {BuildingList, EnergyLabel, Region} from '../../model/building';
import {BuildingService} from '../../service/building.service';
import {ActivatedRoute, Router} from '@angular/router';
import {UseTypeEnum} from '../../model/useTypeEnum';
// @ts-ignore
import Notiflix from 'notiflix';
import {EnergyLabelType} from '../../model/EnergyLabelType';
import {Moment} from '../../../../../../shared/tools/moment';

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

  moment = Moment;
  options;



  options2: any;
  updateOptions: any;

  private oneDay = 24 * 3600 * 1000;
  private now: Date;
  private value: number ;
  private data: any[];
  private timer: any;





  energyLabel = new EnergyLabel();
  energyLabelEnum = EnergyLabelType;

  constructor(private buildingService: BuildingService,
              public router: Router,
              private activatedRoute: ActivatedRoute) {
    console.log('this.energyLabel', this.energyLabel);
    const xAxisData = [];
    const eGaz = [];
    const eAct = [];

    const chartData = [
      {
        eGaz: 80,
        eAct: 40,
        date: '2020-05-12T12:19:00+00:00'
      },
      {
        // value: 50,
        eGaz: 60,
        eAct: 90,
        date: '2020-05-14T12:19:00+00:00'
      },
      {
        eGaz: 12,
        eAct: 37,
        date: '2020-05-16T12:19:00+00:00'
      },
      {
        eGaz: 55,
        eAct: 15,
        date: '2020-05-18T12:19:00+00:00'
      },
      {
        eGaz: 60,
        eAct: 90,
        date: '2020-05-20T12:19:00+00:00'
      },
      {
        eGaz: 99,
        eAct: 90,
        date: '2020-05-22T12:19:00+00:00'
      },
      {
        eGaz: 60,
        eAct: 55,
        date: '2020-05-24T12:19:00+00:00'
      },
      {
        eGaz: 12,
        eAct: 90,
        date: '2020-05-26T12:19:00+00:00'
      },
      {
        eGaz: 55,
        eAct: 90,
        date: '2020-05-28T12:19:00+00:00'
      },
      {
        eGaz: 66,
        eAct: 99,
        date: '2020-05-30T12:19:00+00:00'
      },
      {
        eGaz: 40,
        eAct: 85,
        date: '2020-06-01T12:19:00+00:00'
      },
      {
        eGaz: 60,
        eAct: 90,
        date: '2020-06-03T12:19:00+00:00'
      },
      {
        eGaz: 10,
        eAct: 30,
        date: '2020-06-05T12:19:00+00:00'
      },
      {
        eGaz: 30,
        eAct: 80,
        date: '2020-06-07T12:19:00+00:00'
      },
      {
        eGaz: 50,
        eAct: 30,
        date: '2020-06-08T12:19:00+00:00'
      },
      {
        eGaz: 60,
        eAct: 20,
        date: '2020-06-11T12:19:00+00:00'
      },
      {
        eGaz: 60,
        eAct: 80,
        date: '2020-06-14T12:19:00+00:00'
      },
      {
        eGaz: 87,
        eAct: 35,
        date: '2020-06-15T12:19:00+00:00'
      },
    ];
    const length = chartData.length;
    for (let i = 0; i < length; i++) {
      // xAxisData.push(this.moment.getJaliliDateFromIso(chartData[i].date));
      xAxisData.push(this.moment.getJaliliDateFromIso(chartData[i].date));
      console.log('chartData[i]', chartData[i]);
      eGaz.push(chartData[i].eGaz);
      eAct.push(chartData[i].eAct);
    }

    this.options = {
      legend: {
        data: ['گاز', 'eAct'],
        align: 'left',
      },
      tooltip: {},
      xAxis: {
        data: xAxisData,
        silent: false,
        splitLine: {
          show: true,
        },
      },
      yAxis: {},
      series: [
        {
          name: 'گاز',
          type: 'bar',
          data: eGaz,
          animationDelay: (idx) => idx * 10,
        },
        {
          name: 'eAct',
          type: 'bar',
          data: eAct,
          animationDelay: (idx) => idx * 10 + 100,
        },
      ],
      animationEasing: 'elasticOut',
      animationDelayUpdate: (idx) => idx * 5,
    };

    this.options2 = {
      legend: {
        data: ['گاز', 'eAct'],
        align: 'left',
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        },
      },
      xAxis: {
        data: xAxisData,
        silent: false,
        splitLine: {
          show: true,
        },
      },
      yAxis: {},
      series: [
        {
          name: 'گاز',
          type: 'line',
          data: eGaz,
          animationDelay: (idx) => idx * 10,
        },
        {
          name: 'eAct',
          type: 'line',
          data: eAct,
          animationDelay: (idx) => idx * 10 + 100,
        },
      ],
      animationEasing: 'elasticOut',
      animationDelayUpdate: (idx) => idx * 5,
    };
  }



  ngOnInit(): void {
    this.getBuildingList();
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
