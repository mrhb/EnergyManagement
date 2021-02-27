/**
 * create By kazem Pourbadakhshan
 * Email: k_pour@yahoo.com
 */

import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
// import {GasBuildingAllocation, GasDto} from '../../../../model/gas';
// import {GroupGasEnum, UseTypeGasEnum} from '../../../../model/gasEnum';
// // @ts-ignore
// import Notiflix from 'notiflix';
// import {GasService} from '../../../../service/gas.service';
import {BuildingService} from '../../../../../building/service/building.service';
import {BuildingAllocation} from '../../../../model/power';
// import {UseTypeBuildingEnum} from '../../../../../building/model/useTypeEnum';
// import {EnergyBuildingAllocation} from '../../../../model/energy';
import {GazBillDto} from '../../../../model/gas';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MyPattern } from 'src/app/shared/tools/myPattern';
// declare var $: any;

@Component({
  selector: 'app-gaz-bill-add',
  templateUrl: './gaz-bill-add.component.html',
  styleUrls: ['./gaz-bill-add.component.scss']
})
export class GazBillAddComponent implements OnInit {
  pageSize = 20;
  pageIndex = 0;
  length = -1;
  touched = false;
  edited = false;
  powerId = '';
  myPattern = MyPattern;
  gasId = '';

  form: FormGroup;
  gazBillDto = new GazBillDto();

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private buildingService: BuildingService
) { 

}
  ngOnInit(): void {
    this.form=this.formBuilder.group({
      billingId: ['', [Validators.minLength(3), Validators.pattern(this.myPattern.nameAndFamily)]],
      paymentCode: ['', [Validators.minLength(3), Validators.pattern(this.myPattern.nameAndFamily)]],
      fromDate:[], // تاریخ شروع 
      toDate:[], // تاریخ اتمام
      numberDays:[], // روزها      
      previousCounter:[], // رقم پیشین شمارشگر
      currentCounter:[], // رقم فعلی شمارشگر
      totalCounter:[],  // کارکرد شمارشگر
      estandardConsumption:[],  //  مصرف استاندارد
      gasPrice:[],  //   بهای گاز مصرفی
      subscription:[],  //    آبونمان
      gasTolls:[],  //    عوارض
      insurance:[],  //    بیمه
      bedehyMotaf:[],  //    بدهی متفرقه
      mandeBedehy:[],  //     مانده بدهی
      mandeHesabGhab:[],  //     مانده صورتحساب قبلی
      teedadBedehy:[],  //     تعداد بدهی  
      payableAmount:[],  //      مبلغ قابل پرداخت  
    }
    
    );
  }
}


// export class GasCreateComponent implements OnInit {
//   pageSize = 20;
//   pageIndex = 0;
//   length = -1;

//   gasId = '';
//   touched = false;
//   edited = false;
//   form: FormGroup;
//   myPattern = MyPattern;
//   gasDto = new GasDto();
//   groupEnum = GroupGasEnum;
//   useTypeGasEnum = UseTypeGasEnum;

//   filterBuilding = '';
//   buildingList = [];
  // buildingAllocation = new GasBuildingAllocation();
//   buildingEnum = UseTypeBuildingEnum;
//   editedAllocation = false;

//   constructor(private formBuilder: FormBuilder,
//               private router: Router,
//               private buildingService: BuildingService,
//               private gasService: GasService,
//               private activatedRoute: ActivatedRoute) {
//     this.activatedRoute.queryParams.subscribe(params => {
//       console.log('params', params);
//       if (params.id) {
//         this.edited = true;
//         this.gasId = params.id;
//         this.getOneGas(params.id);
//       }
//     });
//   }

//   ngOnInit(): void {
//     this.form = this.formBuilder.group({
//       name: ['', [Validators.minLength(3), Validators.pattern(this.myPattern.nameAndFamily)]],
//       address: [''],
//       billingId: ['', [Validators.required, Validators.pattern(this.myPattern.number)]],
//       city: ['', [Validators.minLength(1)]],
//       domainCode: [''],
//       addressCode: ['', [Validators.required, Validators.maxLength(400), Validators.pattern(this.myPattern.number)]],
//       numberShare: [''],
//       fileNumber: [''],
//       serialShare: [''],
//       useType: ['', [Validators.required]],
//       group: ['', [Validators.required]],
//       capacity: [''],
//       coefficient: [''],
//     });
//   }

//   createGas(): void {
//     this.touched = true;
//     if (this.form.invalid) {
//       this.form.markAllAsTouched();
//       Notiflix.Notify.Failure('ورودی رو بررسی کنید!');
//       return;
//     }

//     if (!this.edited) {
//       this.gasService.createGas(this.gasDto)
//         .subscribe((res: any) => {
//           if (res) {
//             Notiflix.Notify.Success('ایجاد اشتراک گاز با موفقیت انجام شد.');
//             this.gasId = res.data;
//             setTimeout(() => {
//               $('#pills-building-tab').click();
//             }, 200);
//             // this.router.navigate(['/index/user/configuration/gasList']).then();
//             // this.router.navigateByUrl('/index/user/configuration/gasList').then();
//           }
//         });
//     } else {
//       this.gasService.updateGas({id: this.gasId}, this.gasDto)
//         .subscribe((res: any) => {
//           if (res) {
//             Notiflix.Notify.Success('ویرایش اشتراک گاز با موفقیت انجام شد.');
//             // this.router.navigateByUrl('/index/user/configuration/gasList').then();
//           }
//         });
//     }
//   }

//   getOneGas(gId): void {
//     this.gasService.getOneGas({id: gId})
//       .subscribe((res: any) => {
//         if (res) {
//           this.gasDto = res.data;
//         }
//       });
//   }

//   deleteBuilding(item: BuildingAllocation, i): void {
//     Notiflix.Confirm.Show(
//       'حذف فضا',
//       'آیا اطمینان دارید که این اشتراک حذف گردد؟',
//       'بله',
//       'خیر',
//       () => {
//         this.gasService.deleteGasBuildingAllocation({id: this.gasId, allocationId: item.id})
//           .subscribe((res: any) => {
//             if (res) {
//               Notiflix.Notify.Success('حذف فضا با موفقیت انجام گردید');
//               this.gasDto.buildingList.splice(i, 1);
//             }
//           });
//       });
//   }

//   getListBuilding(): void {
//     this.buildingService.getListBuilding({
//       page: this.pageIndex,
//       size: this.pageSize,
//       term: this.filterBuilding,
//     }).subscribe((res: any) => {
//       if (res) {
//         if (res.flag) {
//           this.buildingList = res.content;
//         }
//       }
//     });
//   }

//   addBuildingAllocation(): void {

//     if (!this.editedAllocation) {
//       this.gasService.addBuildingAllocation({id: this.gasId}, this.buildingAllocation)
//         .subscribe((res: any) => {
//           if (res) {
//             Notiflix.Notify.Success('ثبت ساختمان با موفقیت انجام شد.');
//             this.buildingAllocation = new GasBuildingAllocation();
//             this.gasDto.buildingList.push(res.data);
//           }
//         });
//     } else {
//       this.gasService.updateBuildingAllocation({id: this.gasId}, this.buildingAllocation)
//         .subscribe((res: any) => {
//           if (res) {
//             const index = this.gasDto.buildingList.findIndex(e => e.id === this.buildingAllocation.id);
//             if (index !== -1) {
//               Notiflix.Notify.Success('ویرایش ساختمان با موفقیت انجام شد.');
//               this.gasDto.buildingList[index] = this.buildingAllocation;
//               this.buildingAllocation = new GasBuildingAllocation();
//             }
//           }
//         });
//     }


//   }

//   selectBuildingAllocation(item): void {
//     this.buildingAllocation.name = item.name;
//     this.buildingAllocation.buildingId = item.id;
//   }

//   editAllocationPercentage(item: GasBuildingAllocation): void {
//     this.editedAllocation = true;
//     this.buildingAllocation = JSON.parse(JSON.stringify(item));
//   }
// }
