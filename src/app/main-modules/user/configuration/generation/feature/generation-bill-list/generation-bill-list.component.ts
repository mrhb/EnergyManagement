 /**
 * create By reza mollaei
 * Email: reza_yki@yahoo.com
 * telegram: reza_yki
 */

import { Component, OnInit } from '@angular/core';
// @ts-ignore
import Notiflix from 'notiflix';
// import {GenerationService} from '../../../../service/generation.service';
import {ActivatedRoute, Router} from '@angular/router';
import { Moment } from 'src/app/shared/tools/moment';
import { ConsumptionTypeEnum, GenerationTypeEnum } from '../../model/generationEnum';
import { GenerationBillList } from '../../model/generation';
import { GenerationReceiptService } from '../../service/generation-receipt.service';

@Component({
  selector: 'app-generation-bill-list',
  templateUrl: './generation-bill-list.component.html',
  styleUrls: ['./generation-bill-list.component.scss']
})
export class GenerationBillListComponent implements OnInit {
  pageSize = 5;
  pageIndex = 0;
  length = -1;
  totalPages = 1;
  moment = Moment;

  generationTypeEnum = GenerationTypeEnum;
  consumptionTypeEnum = ConsumptionTypeEnum;

  generationBillList: GenerationBillList[] = [];
  constructor(public router: Router,
    private generationReceiptService: GenerationReceiptService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getGenerationBillList();
  }
  getGenerationBillList(): void {
    this.generationReceiptService.getReceiptList(
      {
        page: this.pageIndex,
        size: this.pageSize,
      }, ''
    ).subscribe((res: any) => {
      if (res) {
        this.generationBillList = res.content;
        this.length = res.totalElements;
        this.pageIndex = res.page;
        this.totalPages = res. totalPages;
      }
    });

  }

  navigate(): void {
    console.log(this.activatedRoute.snapshot.url[0].path);
    // @ts-ignore
    this.router.navigate([window.location.hash.split('#/')[1].split('?')[0]], {
      queryParams: {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
      },
    });
    this.getGenerationBillList();
  }

  changePage(event: any): void {
    this.length = event.length;
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.navigate();
  }

  deleteGeneration(i, pId): void {
    Notiflix.Confirm.Show(
      'قبض',
      'آیا اطمینان دارید که این قبض حذف گردد؟',
      'بله',
      'خیر',
      () => {
        this.generationReceiptService.deleteReceipt({id: pId})
          .subscribe((res: any) => {
            if (res) {
              Notiflix.Notify.Success('حذف نیروگاه با موفقیت انجام گردید');
              this.generationBillList.splice(i, 1);
            }
          });
      });
  }

}
