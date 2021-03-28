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
import {CoolingSystemType, HeatingSystemType} from '../../model/buildingEnum';
import * as XLSX from 'xlsx';
type AOA = any[][];

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
  buildingId: string;
  xlsxBuildingList: BuildingList[] = [];
  data: AOA = [[1, 2], [3, 4]];

  useTypeBuildingEnum = UseTypeBuildingEnum;
  coolingSystemType = CoolingSystemType;
  heatingSystemType = HeatingSystemType;
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
  onFileChange(evt: any) {
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      this.data = <AOA>(XLSX.utils.sheet_to_json(ws, { header: 1 }));
      console.log(this.data);

      this.data.forEach(item => {
       let bill=new BuildingList();

      bill.name = item[0]; // نام مشترک
      bill.floorNum=item[1]; // تعداد طبقات

      this.xlsxBuildingList.push(bill);
    });

    };
    reader.readAsBinaryString(target.files[0]);
  }

  saveXlsxData()
  {
    this.buildingService.createMultiReceipt(this.xlsxBuildingList)
    .subscribe((res: any) => {
      if (res) {
        Notiflix.Notify.Success('ثبت داده های اکسل با موفقیت انجام شد.');
        // setTimeout(() => {
        //   $('#pills-building-tab').click();
        // }, 200);
        // this.router.navigate(['/index/user/configuration/powerList']);
      }
    });
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
      'حذف ساختمان',
      'آیا اطمینان دارید که ساختمان حذف گردد؟',
      'بله',
      'خیر',
      () => {
        this.buildingService.deleteBuilding({id: bId})
          .subscribe((res: any) => {
            if (res) {
              Notiflix.Notify.Success('حذف ساختمان با موفقیت انجام گردید');
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
