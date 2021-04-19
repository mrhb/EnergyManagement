/**
 * create By reza mollaei
 * Email: reza_yki@yahoo.com
 * telegram: reza_yki
 */

import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MyPattern} from '../../../../../../../../shared/tools/myPattern';
import {BuildingAllocation, PowerBuildingAllocation, PowerDto} from '../../../../model/power';
import {
  GeneralEnum, GroupEnum,
  HomeEnum,
  Industry_productsEnum, OtherEnum, powerSupplyVoltage,
  UseTypePowerEnum, VoltageTypeEnum,
  Water_productsEnum
} from '../../../../model/powerEnum';
import {PowerService} from '../../../../service/power.service';
// @ts-ignore
import Notiflix from 'notiflix';
import {ActivatedRoute, Router} from '@angular/router';
import {UseTypeBuildingEnum, UtilityTypeEnum} from '../../../../../building/model/useTypeEnum';
import {BuildingService} from '../../../../../building/service/building.service';
import {EnergyBuildingAllocation} from '../../../../model/energy';

declare var $: any;

@Component({
  selector: 'app-power-create',
  templateUrl: './power-create.component.html',
  styleUrls: ['./power-create.component.scss']
})
export class PowerCreateComponent implements OnInit {
  pageSize = 20;
  pageIndex = 0;
  length = -1;
  touched = false;
  edited = false;
  powerId = '';
  form: FormGroup;
  myPattern = MyPattern;
  powerDto = new PowerDto();
  buildingAllocation = new PowerBuildingAllocation();
  useTypeEnum = UseTypePowerEnum;
  voltageTypeEnum = VoltageTypeEnum;
  useCodeEnum;
  groupEnum = GroupEnum;
  powerSupplyVoltageEnum = powerSupplyVoltage;
  utilityTypeEnum = UtilityTypeEnum;
  filterBuilding = '';
  buildingList = [];
  editedAllocation = false;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private buildingService: BuildingService,
              private activatedRoute: ActivatedRoute,
              private  powerService: PowerService) {
    this.activatedRoute.queryParams.subscribe(params => {
      console.log('params', params);
      if (params.id) {
        this.edited = true;
        this.powerId = params.id;
        this.getOnePower(params.id);
      }
    });
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', [Validators.minLength(3), Validators.pattern(this.myPattern.nameAndFamily)]],
      address: [''],
      billingId: ['', [Validators.required, Validators.pattern(this.myPattern.number)]],
      systemPass: ['', [Validators.minLength(1), Validators.pattern(this.myPattern.number)]],
      contract:  [''],
      addressCode: ['', [Validators.required, Validators.maxLength(400), Validators.pattern(this.myPattern.number)]],
      fileNumber: [''],
      serialShare: [''],
      useType: ['', [Validators.required]],
      useCode: ['', [Validators.required]],
      group: [''],
      coefficient: [''],
      voltageType: [''],
      powerSupplyVoltage: [''],
      // numberShare: [''],
      // capacity: [''],
      // domainCode: [''], //کد حوزه
      // buildingList: [''],
      // buildingNum: ['', [Validators.pattern(this.myPattern.number)]],
    });
  }

  getOnePower(pId): void {
    this.powerService.getOnePower({
      id: pId
    })
      .subscribe((res: any) => {
        if (res) {
          this.powerDto = res.data;
          this.setEnumUseType();
        }
      });
  }

  setEnumUseType(isChange?: boolean): void {
    switch (this.powerDto.useType) {
      case UseTypePowerEnum[UseTypePowerEnum.HOME.toString()]:
        this.useCodeEnum = HomeEnum;
        break;
      case UseTypePowerEnum[UseTypePowerEnum.GENERAL.toString()]:
        this.useCodeEnum = GeneralEnum;
        break;
      case UseTypePowerEnum[UseTypePowerEnum.WATER_PRODUCTS.toString()]:
        this.useCodeEnum = Water_productsEnum;
        break;
      case UseTypePowerEnum[UseTypePowerEnum.INDUSTRY_PRODUCTS.toString()]:
        this.useCodeEnum = Industry_productsEnum;
        break;
      case UseTypePowerEnum[UseTypePowerEnum.OTHER.toString()]:
        this.useCodeEnum = OtherEnum;
        break;
    }
    if (this.useCodeEnum && isChange) {
      Object.keys(this.useCodeEnum).map((key, index) => {
        if ((index % 2) === 0) {
          this.powerDto.useCode = this.useCodeEnum[this.useCodeEnum[key.toString()]];
          return;
        }
      });
    }
  }

  createPower(): void {
    this.touched = true;
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      Notiflix.Notify.Failure('ورودی رو بررسی کنید!');
      return;
    }

    if (!this.edited) {
      this.powerService.createPower(this.powerDto)
        .subscribe((res: any) => {
          if (res) {
            this.edited=true;
            Notiflix.Notify.Success('ایجاد اشتراک برق با موفقیت انجام شد.');
            this.powerId = res.data;
            setTimeout(() => {
              $('#pills-building-tab').click();
            }, 200);
            // this.router.navigate(['/index/user/configuration/powerList']);
          }
        });
    } else {

      this.powerService.updatePower({id: this.powerId}, this.powerDto)
        .subscribe((res: any) => {
          if (res) {
            Notiflix.Notify.Success('ویرایش اشتراک برق با موفقیت انجام شد.');
            // this.router.navigate(['/index/user/configuration/powerCreate' ],{fragment: "billingSearchId"});
            // this.router.navigate(['/index/user/configuration/powerList']);
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
        this.powerService.deletePowerBuildingAllocation({id: this.powerId, allocationId: item.id})
          .subscribe((res: any) => {
            if (res) {
              Notiflix.Notify.Success('حذف با موفقیت انجام گردید');
              this.powerDto.buildingList.splice(i, 1);
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
      this.powerService.addBuildingAllocation({id: this.powerId}, this.buildingAllocation)
        .subscribe((res: any) => {
          if (res) {
            this.buildingAllocation = new PowerBuildingAllocation();
            this.powerDto.buildingList.push(res.data);
            this.router.navigate(['/index/user/configuration/powerList']);
            Notiflix.Notify.Success('تخصیص ساختمان با موفقیت انجام شد.');
          }
        });
    } else {
      this.powerService.updateBuildingAllocation({id: this.powerId}, this.buildingAllocation)
        .subscribe((res: any) => {
          if (res) {
            const index = this.powerDto.buildingList.findIndex(e => e.id === this.buildingAllocation.id);
            if (index !== -1 ) {
              Notiflix.Notify.Success('ویرایش ساختمان تخصیصی با موفقیت انجام شد.');
              this.powerDto.buildingList[index] = this.buildingAllocation;
              this.buildingAllocation = new PowerBuildingAllocation();
              this.router.navigate(['/index/user/configuration/powerList']);
            }
          }
        });
    }
  }

  selectBuildingAllocation(item): void {
    this.buildingAllocation.name = item.name;
    this.buildingAllocation.buildingId = item.id;
  }

  editAllocationPercentage(item: PowerBuildingAllocation): void {
    this.editedAllocation = true;
    this.buildingAllocation = JSON.parse(JSON.stringify(item));
  }

}
