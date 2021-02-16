import { Component, OnInit } from '@angular/core';
import {GasList} from '../../../../model/gas';

@Component({
  selector: 'app-gaz-bill-list',
  templateUrl: './gaz-bill-list.component.html',
  styleUrls: ['./gaz-bill-list.component.scss']
})
export class GazBillListComponent implements OnInit {
  pageSize = 10;
  pageIndex = 0;
  length = -1;

  // useTypeEnum = UseTypeGasEnum;
  gasBillList: GasList[] = [];
  
  constructor() { }

  ngOnInit(): void {
    this.getListPower();
  }
  getListPower(): void {
    // this.gasService.getGasList(
    //   {
    //     page: this.pageIndex,
    //     size: this.pageSize,
    //   }, ''
    // ).subscribe((res: any) => {
    //   if (res) {
    //     this.gasList = res.content;
    //   }
    // });
  }


    
  navigate(): void {
    // console.log(this.activatedRoute.snapshot.url[0].path);
    // // @ts-ignore
    // this.router.navigate([this.activatedRoute.parent.snapshot._routerState.url.split('?')[0]], {
    //   queryParams: {
    //     pageIndex: this.pageIndex,
    //     pageSize: this.pageSize,
    //   },
    // });
    // this.getGasBillList();
  }

  changePage(event: any): void {
    this.length = event.length;
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.navigate();
  }


}
