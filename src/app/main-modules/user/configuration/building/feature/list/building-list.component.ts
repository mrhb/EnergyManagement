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
import { ConfigurationStateService } from '../../../configuration-state.service';
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
  regionId ="111111111111111111111111";
  buildingList: BuildingList[] = [];
  buildingEnum = UseTypeBuildingEnum;

  moment = Moment;
 

  energyLabel = new EnergyLabel();
  energyLabelEnum = EnergyLabelType;

  constructor(
    stateService:ConfigurationStateService,
    private buildingService: BuildingService,
    public router: Router,
    private activatedRoute: ActivatedRoute) {

    stateService.regionId.subscribe(reg=>{
      this.regionId=reg;
      this.getBuildingList();
    });
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

  getBuildingList(): void {
    this.buildingService.getBuildingList({
      page: this.pageIndex,
      size: this.pageSize,
    }, {regionId: this.regionId}).subscribe((res: any) => {
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
