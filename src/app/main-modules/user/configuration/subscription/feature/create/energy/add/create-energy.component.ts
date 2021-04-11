/**
 * create By reza mollaei
 * Email: reza_yki@yahoo.com
 * telegram: reza_yki
 */

import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MyPattern} from '../../../../../../../../shared/tools/myPattern';
import {EnergyBuildingAllocation, EnergyDto} from '../../../../model/energy';
// @ts-ignore
import Notiflix from 'notiflix';
import {EnergyService} from '../../../../service/energy.service';
import {GasBuildingAllocation} from '../../../../model/gas';
import {BuildingAllocation} from '../../../../model/power';
import {BuildingService} from '../../../../../building/service/building.service';
import {UtilityTypeEnum} from '../../../../../building/model/useTypeEnum';
import {ActivatedRoute} from '@angular/router';
import { CarierUnitEnum, EnergyCarierEnum } from '../../../../model/energyEnum';

declare var $: any;
@Component({
  selector: 'app-create-energy',
  templateUrl: './create-energy.component.html',
  styleUrls: ['./create-energy.component.scss']
})
export class CreateEnergyComponent implements OnInit {
  pageSize = 20;
  pageIndex = 0;
  length = -1;

  energyId = '';
  touched = false;
  edited = false;
  form: FormGroup;

  utilityTypeEnum = UtilityTypeEnum;
  myPattern = MyPattern;
  energyCarierEnum=EnergyCarierEnum;
  carierUnitEnum=CarierUnitEnum;
  energyDto = new EnergyDto();
  buildingAllocation = new EnergyBuildingAllocation();
  filterBuilding = '';
  buildingList = [];
  editedAllocation = false;
  router: any;

  constructor(private formBuilder: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private buildingService: BuildingService,
              private energyService: EnergyService) {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern(this.myPattern.nameAndFamily)]],
      address: ['', [Validators.required]],
      energyCarrier: ['', [Validators.required]],
      energyUnit: [''],
      shareNumber: [''],
      capacity: [''],
      kiloWatConvert: [''],
    });

    this.activatedRoute.queryParams.subscribe(params => {
      console.log('params', params);
      if (params.id) {
        this.edited = true;
        this.energyId = params.id;
        this.getOneEnergy(params.id);
      }
    });
  }

  ngOnInit(): void {
  }

  createEnergy(): void {
    this.touched = true;
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      Notiflix.Notify.Failure('ورودی رو بررسی کنید!');
      return;
    }

    if (!this.edited) {
      this.energyService.createEnergy(this.energyDto)
        .subscribe((res: any) => {
          if (res) {
            Notiflix.Notify.Success('ایجاد اشتراک انرژی با موفقیت انجام شد.');
            this.energyId = res.data;
            setTimeout(() => {
              $('#pills-building-tab').click();
            }, 200);
            // this.router.navigate(['/index/user/configuration/energyList']).then();
            // this.router.navigateByUrl('/index/user/configuration/energyList').then();
          }
        });
    } else {
      this.energyService.updateEnergy({id: this.energyId}, this.energyDto)
        .subscribe((res: any) => {
          if (res) {
            Notiflix.Notify.Success('ویرایش اشتراک انرژی با موفقیت انجام شد.');
          }
        });
    }
  }

  getOneEnergy(gId): void {
    this.energyService.getOneEnergy({id: gId})
      .subscribe((res: any) => {
        if (res) {
          this.energyDto = res.data;
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
      this.energyService.addBuildingAllocation({id: this.energyId}, this.buildingAllocation)
        .subscribe((res: any) => {
          if (res) {
            this.buildingAllocation = new GasBuildingAllocation();
            Notiflix.Notify.Success('ثبت ساختمان با موفقیت انجام شد.');
            this.energyDto.buildingList.push(res.data);
            // this.router.navigate('/index/user/configuration/energyList').then();
          }
        });
    } else {
      this.energyService.updateBuildingAllocation({id: this.energyId}, this.buildingAllocation)
        .subscribe((res: any) => {
          if (res) {
            this.editedAllocation = false;
            const index = this.energyDto.buildingList.findIndex(e => e.id === this.buildingAllocation.id);
            if (index !== -1 ) {
              Notiflix.Notify.Success('ویرایش ساختمان با موفقیت انجام شد.');
              this.energyDto.buildingList[index] = this.buildingAllocation;
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
        this.energyService.deleteEnergyBuildingAllocation({id: this.energyId, allocationId: item.id})
          .subscribe((res: any) => {
            if (res) {
              Notiflix.Notify.Success('حذف با موفقیت انجام گردید');
              this.energyDto.buildingList.splice(i, 1);
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
