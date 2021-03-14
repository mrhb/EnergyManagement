/**
 * create By reza mollaei
 * Email: reza_yki@yahoo.com
 * telegram: reza_yki
 */

import { Component, OnInit } from '@angular/core';
// @ts-ignore
import Notiflix from 'notiflix';
import {ActivatedRoute, Router} from '@angular/router';
import {GenerationTypeEnum, ConsumptionTypeEnum } from '../../model/generationEnum';
import { GenerationList } from '../../model/generation';
import { GenerationService } from '../../service/generation.service';

@Component({
  selector: 'app-generation-list',
  templateUrl: './generation-list.component.html',
  styleUrls: ['./generation-list.component.scss']
})
export class GenerationListComponent implements OnInit {
  pageSize = 10;
  pageIndex = 0;
  length = -1;
  totalPages = 1;

  generationTypeEnum = GenerationTypeEnum;
  consumptionTypeEnum=ConsumptionTypeEnum;
  generationList: GenerationList[] = [];
  constructor(private generationService: GenerationService,
              public router: Router,
              private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params.pageIndex) {
        this.pageIndex = params.pageIndex;
        this.pageSize = params.pageSize;
      }
      this.getListGeneration();
    });
  }

  ngOnInit(): void {
  }

  getListGeneration(): void {
    this.generationService.getGenerationList(
      {
        page: this.pageIndex,
        size: this.pageSize,
      }, ''
    ).subscribe((res: any) => {
      if (res) {
        this.generationList = res.content;
        this.length = res.totalElements;
        this.pageIndex = res.page;
        this.totalPages = res. totalPages;
      }
    });
  }

  navigate(): void {
    // this.activatedRoute.parent.snapshot._routerState.url.split('?')[0]
    this.router.navigate([window.location.hash.split('#/')[1].split('?')[0]], {
      queryParams: {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
      },
    });
    this.getListGeneration();
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
      'آیا اطمینان دارید که این نیروگاه حذف گردد؟',
      'بله',
      'خیر',
      () => {
        this.generationService.deleteGeneration({id: pId})
          .subscribe((res: any) => {
            if (res) {
              Notiflix.Notify.Success('قبض با موفقیت انجام گردید');
              this.generationList.splice(i, 1);
            }
          });
      });
  }

}
