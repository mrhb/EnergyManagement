/**
 * create By reza mollaei
 * Email: reza_yki@yahoo.com
 * telegram: reza_yki
 */

import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
// @ts-ignore
import Notiflix from 'notiflix';
import { MyPattern } from 'src/app/shared/tools/myPattern';
import { UseTypeBuildingEnum } from '../../../building/model/useTypeEnum';
import { BuildingService } from '../../../building/service/building.service';
import { EnergyBuildingAllocation } from '../../../subscription/model/energy';
import { GasBuildingAllocation } from '../../../subscription/model/gas';
import { BuildingAllocation } from '../../../subscription/model/power';
import { GenerationBuildingAllocation, GenerationDto } from '../../model/generation';
import { GenerationTypeEnum, ConsumptionTypeEnum } from '../../model/generationEnum';
import { GenerationService } from '../../service/generation.service';
declare var $: any;
@Component({
  selector: 'app-create-generation',
  templateUrl: './create-generation.component.html',
  styleUrls: ['./create-generation.component.scss']
})
export class CreateGenerationComponent implements OnInit {
  pageSize = 20;
  pageIndex = 0;
  length = -1;

  generationId = '';
  touched = false;
  edited = false;
  form: FormGroup;
  myPattern = MyPattern;
  generationDto = new GenerationDto();
  buildingAllocation = new GenerationBuildingAllocation();
  buildingEnum = UseTypeBuildingEnum;
  filterBuilding = '';
  buildingList = [];
  generationTypeEnum = GenerationTypeEnum;
  consumptionTypeEnum = ConsumptionTypeEnum;
  editedAllocation = false;

  constructor(private formBuilder: FormBuilder,
              private generationService: GenerationService,
              private buildingService: BuildingService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
    this.form = this.formBuilder.group({
      name: ['', [Validators.minLength(3), Validators.pattern(this.myPattern.nameAndFamily)]],
      address: [''],
      billingId: ['', [Validators.required]],
      // numberShare: ['', [Validators.required, Validators.pattern(this.myPattern.number)]],
      fileNumber: ['', [Validators.minLength(1)]],
      // serialShare: [''],
      generationType: ['', [Validators.required]],
      // generationBranchDiameter: ['', [Validators.required]],
      sewageBranchDiameter: [''],
      capacity: [''],
      consumptionType: ['', [Validators.required]],
    });
    this.activatedRoute.queryParams.subscribe(params => {
      console.log('params', params);
      if (params.id) {
        this.edited = true;
        this.generationId = params.id;
        this.getOneGeneration(params.id);
      }
    });
  }

  ngOnInit(): void {
  }

  createGeneration(): void {
    this.touched = true;
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      Notiflix.Notify.Failure('ورودی رو بررسی کنید!');
      return;
    }

    if (!this.edited) {
      this.generationService.createGeneration(this.generationDto)
        .subscribe((res: any) => {
          if (res) {
            Notiflix.Notify.Success('ایجاد نیروگاه با موفقیت انجام شد.');
            this.generationId = res.data;
            setTimeout(() => {
              $('#pills-building-tab').click();
            }, 200);
            // this.router.navigate(['/index/user/configuration/generationList']).then();
            // this.router.navigateByUrl('/index/user/configuration/generationList').then();
          }
        });
    } else {
      this.generationService.updateGeneration({id: this.generationId}, this.generationDto)
        .subscribe((res: any) => {
          if (res) {
            Notiflix.Notify.Success('ویرایش نیروگاه با موفقیت انجام شد.');
            // this.router.navigateByUrl('/index/user/configuration/generationList').then();
          }
        });
    }
  }

  getOneGeneration(gId): void {
    this.generationService.getOneGeneration({id: gId})
      .subscribe((res: any) => {
        if (res) {
          this.generationDto = res.data;
        }
      });
  }

  getListBuilding(): void {
    this.buildingService.getListBuilding({
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
      this.generationService.addBuildingAllocation({id: this.generationId}, this.buildingAllocation)
        .subscribe((res: any) => {
          if (res) {
            this.buildingAllocation = new GasBuildingAllocation();
            Notiflix.Notify.Success('ثبت ساختمان با موفقیت انجام شد.');
            this.generationDto.buildingList.push(res.data);
          }
        });
    } else {
      this.generationService.updateBuildingAllocation({id: this.generationId}, this.buildingAllocation)
        .subscribe((res: any) => {
          if (res) {
            this.editedAllocation = false;
            const index = this.generationDto.buildingList.findIndex(e => e.id === this.buildingAllocation.id);
            if (index !== -1 ) {
              Notiflix.Notify.Success('ویرایش ساختمان با موفقیت انجام شد.');
              this.generationDto.buildingList[index] = this.buildingAllocation;
              this.buildingAllocation = new GasBuildingAllocation();
            }
          }
        });
    }
  }

  deleteBuilding(item: BuildingAllocation, i): void {
    Notiflix.Confirm.Show(
      'قبض',
      'آیا اطمینان دارید که این ساختمانحذف گردد؟',
      'بله',
      'خیر',
      () => {
        this.generationService.deleteGenerationBuildingAllocation({id: this.generationId, allocationId: item.id})
          .subscribe((res: any) => {
            if (res) {
              Notiflix.Notify.Success('قبض با موفقیت انجام گردید');
              this.generationDto.buildingList.splice(i, 1);
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
