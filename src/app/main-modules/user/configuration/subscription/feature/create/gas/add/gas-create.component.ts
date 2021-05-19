/**
 * create By reza mollaei
 * Email: reza_yki@yahoo.com
 * telegram: reza_yki
 */

import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MyPattern} from '../../../../../../../../shared/tools/myPattern';
import {ActivatedRoute, Router} from '@angular/router';
import {GasBuildingAllocation, GasDto} from '../../../../model/gas';
import {GroupGasEnum, UseTypeGasEnum , CapacityGasEnum} from '../../../../model/gasEnum';
// @ts-ignore
import Notiflix from 'notiflix';
import {GasService} from '../../../../service/gas.service';
import {BuildingService} from '../../../../../building/service/building.service';
import {BuildingAllocation} from '../../../../model/power';
import {UseTypeBuildingEnum, UtilityTypeEnum} from '../../../../../building/model/useTypeEnum';
import {EnergyBuildingAllocation} from '../../../../model/energy';

declare var $: any;

@Component({
  selector: 'app-gas-create',
  templateUrl: './gas-create.component.html',
  styleUrls: ['./gas-create.component.scss']
})
export class GasCreateComponent implements OnInit {
  pageSize = 20;
  pageIndex = 0;
  length = -1;

  gasId = '';
  touched = false;
  edited = false;
  form: FormGroup;
  myPattern = MyPattern;
  gasDto = new GasDto();
  groupEnum = GroupGasEnum;
  capacityEnum = CapacityGasEnum;
  utilityTypeEnum = UtilityTypeEnum;

  useTypeGasEnum = UseTypeGasEnum;

  filterBuilding = '';
  buildingList = [];
  buildingAllocation = new GasBuildingAllocation();
  buildingEnum = UseTypeBuildingEnum;
  editedAllocation = false;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private buildingService: BuildingService,
              private gasService: GasService,
              private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParams.subscribe(params => {
      console.log('params', params);
      if (params.id) {
        this.edited = true;
        this.gasId = params.id;
        this.getOneGas(params.id);
      }
    });
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', [Validators.minLength(3), Validators.pattern(this.myPattern.nameAndFamily)]],
      address: [''],
      billingId: ['', [Validators.required, Validators.pattern(this.myPattern.number)]],
      city: ['', [Validators.minLength(1)]],
      domainCode: [''],
      addressCode: ['', [Validators.required, Validators.maxLength(400), Validators.pattern(this.myPattern.number)]],
      numberUnits: [''],//تعداد واحدها

      numberShare: [''],
      fileNumber: [''],
      serialShare: [''],
      useType: ['', [Validators.required]],
      group: ['', [Validators.required]],
      capacity: ['', [Validators.required]],
      coefficient: [''],
    });
  }

  createGas(): void {
    this.touched = true;
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      Notiflix.Notify.Failure('ورودی رو بررسی کنید!');
      return;
    }

    if (!this.edited) {
      this.gasService.createGas(this.gasDto)
        .subscribe((res: any) => {
          if (res) {
            this.edited=true;
            Notiflix.Notify.Success('ایجاد اشتراک گاز با موفقیت انجام شد.');
            this.gasId = res.data;
            setTimeout(() => {
              $('#pills-building-tab').click();
            }, 200);
            // this.router.navigate(['/index/user/configuration/gasList']).then();
            // this.router.navigateByUrl('/index/user/configuration/gasList').then();
          }
        });
    } else {
      this.gasService.updateGas({id: this.gasId}, this.gasDto)
        .subscribe((res: any) => {
          if (res) {
            Notiflix.Notify.Success('ویرایش اشتراک گاز با موفقیت انجام شد.');
            // this.router.navigateByUrl('/index/user/configuration/gasList').then();
          }
        });
    }
  }

  getOneGas(gId): void {
    this.gasService.getOneGas({id: gId})
      .subscribe((res: any) => {
        if (res) {
          this.gasDto = res.data;
        }
      });
  }

  deleteBuilding(item: BuildingAllocation, i): void {
    Notiflix.Confirm.Show(
      'اشتراک',
      'آیا اطمینان دارید که این اشتراک حذف گردد؟',
      'بله',
      'خیر',
      () => {
        this.gasService.deleteGasBuildingAllocation({id: this.gasId, allocationId: item.id})
          .subscribe((res: any) => {
            if (res) {
              Notiflix.Notify.Success('حذف با موفقیت انجام گردید');
              this.gasDto.buildingList.splice(i, 1);
            }
          });
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
      this.gasService.addBuildingAllocation({id: this.gasId}, this.buildingAllocation)
        .subscribe((res: any) => {
          if (res) {
            Notiflix.Notify.Success('ثبت ساختمان با موفقیت انجام شد.');
            this.buildingAllocation = new GasBuildingAllocation();
            this.gasDto.buildingList.push(res.data);
          }
        });
    } else {
      this.gasService.updateBuildingAllocation({id: this.gasId}, this.buildingAllocation)
        .subscribe((res: any) => {
          if (res) {
            const index = this.gasDto.buildingList.findIndex(e => e.id === this.buildingAllocation.id);
            if (index !== -1) {
              Notiflix.Notify.Success('ویرایش ساختمان با موفقیت انجام شد.');
              this.gasDto.buildingList[index] = this.buildingAllocation;
              this.buildingAllocation = new GasBuildingAllocation();
            }
          }
        });
      }
    }

  selectBuildingAllocation(item): void {
    this.buildingAllocation.name = item.name;
    this.buildingAllocation.buildingId = item.id;
  }

  editAllocationPercentage(item: GasBuildingAllocation): void {
    this.editedAllocation = true;
    this.buildingAllocation = JSON.parse(JSON.stringify(item));
  }
}
