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
    this.getEnergyBillList();
  }

  getEnergyBillList(): void {
    this.energyBillList = [
      {
        id:"1",
        EnergyType: "'گازوئیل'",
        StartDate:"99/01/01",
        EndDate:"99/10/01",
        Days: "27",
        Masraf:  "720 ",
        Hazineh:  " 120000 ریال",
        Mablagh:   " 120000 ریال",
      }
    ];   
  }

    
  navigate(): void {
  
    this.getEnergyBillList();
  }

  changePage(event: any): void {
    this.length = event.length;
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.navigate();
  }
}


