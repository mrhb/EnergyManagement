import { Component, OnInit } from '@angular/core';
import { EnergyBillList } from '../../../../model/energy';

@Component({
  selector: 'app-energy-bill-list',
  templateUrl: './energy-bill-list.component.html',
  styleUrls: ['./energy-bill-list.component.scss']
})
export class EnergyBillListComponent implements OnInit {
  pageSize = 10;
  pageIndex = 0;
  length = -1;
  energyBillList: EnergyBillList[] = [];

  constructor() { }

  ngOnInit(): void {
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


