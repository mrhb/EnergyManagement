/**
 * create By reza mollaei
 * Email: reza_yki@yahoo.com
 * telegram: reza_yki
 */

import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MyPattern} from '../../../../../../../../shared/tools/myPattern';
import {ActivatedRoute, Router} from '@angular/router';
import {WaterBuildingAllocation, WaterDto} from '../../../../model/water';
// @ts-ignore
import Notiflix from 'notiflix';
import {WaterService} from '../../../../service/water.service';
import {BuildingAllocation} from '../../../../model/power';
import {GasBuildingAllocation} from '../../../../model/gas';
import {UseTypeBuildingEnum, UtilityTypeEnum} from '../../../../../building/model/useTypeEnum';
import {BuildingService} from '../../../../../building/service/building.service';
import {UseCodeWaterEnum, UseTypeWater} from '../../../../model/waterEnum';
import {EnergyBuildingAllocation} from '../../../../model/energy';
declare var $: any;
@Component({
  selector: 'app-create-water',
  templateUrl: './create-water.component.html',
  styleUrls: ['./create-water.component.scss']
})
export class CreateWaterComponent implements OnInit {
  pageSize = 20;
  pageIndex = 0;
  length = -1;

  waterId = '';
  touched = false;
  edited = false;
  form: FormGroup;
  myPattern = MyPattern;
  waterDto = new WaterDto();
  buildingAllocation = new WaterBuildingAllocation();
  buildingEnum = UseTypeBuildingEnum;
  utilityTypeEnum = UtilityTypeEnum;

  filterBuilding = '';
  buildingList = [];
  useTypeWaterEnum = UseTypeWater;
  useCodeWaterEnum = UseCodeWaterEnum;
  editedAllocation = false;

  constructor(private formBuilder: FormBuilder,
              private waterService: WaterService,
              private buildingService: BuildingService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
    this.form = this.formBuilder.group({
      name: ['', [Validators.minLength(3), Validators.pattern(this.myPattern.nameAndFamily)]],
      address: [''],
      billingId: ['', [Validators.required]],
      numberShare: ['', [Validators.required, Validators.pattern(this.myPattern.number)]],
      fileNumber: ['', [Validators.minLength(1)]],
      serialShare: [''],
      useType: ['', [Validators.required]],
      waterBranchDiameter: ['', [Validators.required]],
      sewageBranchDiameter: [''],
      capacity: [''],
      useCode: ['', [Validators.required]],
    });
    this.activatedRoute.queryParams.subscribe(params => {
      console.log('params', params);
      if (params.id) {
        this.edited = true;
        this.waterId = params.id;
        this.getOneWater(params.id);
      }
    });
  }

  ngOnInit(): void {
  }

  createWater(): void {
    this.touched = true;
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      Notiflix.Notify.Failure('ورودی رو بررسی کنید!');
      return;
    }

    if (!this.edited) {
      this.waterService.createWater(this.waterDto)
        .subscribe((res: any) => {
          if (res) {
            this.edited=true;
            Notiflix.Notify.Success('ایجاد اشتراک آب با موفقیت انجام شد.');
            this.waterId = res.data;
            setTimeout(() => {
              $('#pills-building-tab').click();
            }, 200);
            // this.router.navigate(['/index/user/configuration/waterList']).then();
            // this.router.navigateByUrl('/index/user/configuration/waterList').then();
          }
        });
    } else {
      this.waterService.updateWater({id: this.waterId}, this.waterDto)
        .subscribe((res: any) => {
          if (res) {
            Notiflix.Notify.Success('ویرایش اشتراک آب با موفقیت انجام شد.');
            // this.router.navigateByUrl('/index/user/configuration/waterList').then();
          }
        });
    }
  }

  getOneWater(gId): void {
    this.waterService.getOneWater({id: gId})
      .subscribe((res: any) => {
        if (res) {
          this.waterDto = res.data;
        }
      });
  }
  
  getListBuilding(): void {
    this.buildingService.getListBuildingForSelection({
      page: this.pageIndex,
      size: this.pageSize,
      term: this.filterBuilding,
    }).subscribe((res: any) => {
      if (res) {
        if (res.flag) {
          this.buildingList = res.content;
        }
      }
    });
  }

  addBuildingAllocation(): void {
    if (!this.editedAllocation) {
      this.waterService.addBuildingAllocation({id: this.waterId}, this.buildingAllocation)
        .subscribe((res: any) => {
          if (res) {
            this.buildingAllocation = new GasBuildingAllocation();
            Notiflix.Notify.Success('ثبت ساختمان با موفقیت انجام شد.');
            this.waterDto.buildingList.push(res.data);
          }
        });
    } else {
      this.waterService.updateBuildingAllocation({id: this.waterId}, this.buildingAllocation)
        .subscribe((res: any) => {
          if (res) {
            this.editedAllocation = false;
            const index = this.waterDto.buildingList.findIndex(e => e.id === this.buildingAllocation.id);
            if (index !== -1 ) {
              Notiflix.Notify.Success('ویرایش ساختمان با موفقیت انجام شد.');
              this.waterDto.buildingList[index] = this.buildingAllocation;
              this.buildingAllocation = new GasBuildingAllocation();
            }
          }
        });
    }
  }

  deleteBuilding(item: BuildingAllocation, i): void {
    Notiflix.Confirm.Show(
      'قبض',
      'آیا اطمینان دارید که این اشتراک حذف گردد؟',
      'بله',
      'خیر',
      () => {
        this.waterService.deleteWaterBuildingAllocation({id: this.waterId, allocationId: item.id})
          .subscribe((res: any) => {
            if (res) {
              Notiflix.Notify.Success('حذف با موفقیت انجام گردید');
              this.waterDto.buildingList.splice(i, 1);
            }
          });
      });
  }

  selectBuildingAllocation(item): void {
    this.buildingAllocation.name = item.name;
    this.buildingAllocation.buildingId = item.id;
  }

  editAllocationPercentage(item: EnergyBuildingAllocation): void {
    this.editedAllocation = true;
    this.buildingAllocation = JSON.parse(JSON.stringify(item));
  }
}
