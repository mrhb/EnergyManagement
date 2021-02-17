import { Component, OnInit } from '@angular/core';
import {GasBillList} from '../../../../model/gas';

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
  gasBillList: GasBillList[] = [];
  
  constructor() { }

  ngOnInit(): void {
    this.getGasBillList();
  }
  
  getGasBillList(): void {   
     this.gasBillList = [
      {
      id:"1",
      BillId: "123459886",
      StartDate:"98/01/01",
      EndDate:"98/10/01",
      Days: "27",
      Masraf:  "7020 ",
      Mablagh:   " 3600000 ریال",
      }
    ];   
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
    this.getGasBillList();
  }

  changePage(event: any): void {
    this.length = event.length;
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.navigate();
  }


}
