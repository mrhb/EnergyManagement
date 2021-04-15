import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tariff-list',
  templateUrl: './tariff-list.component.html',
  styleUrls: ['./tariff-list.component.scss']
})
export class TariffListComponent implements OnInit {
  pageSize = 10;
  pageIndex = 0;
  length = -1;
  totalPages = 1;

  // filterBuilding = '';
  // useTypeEnum = UseTypePowerEnum;
  // useCodeEnum=UseCodeEnum;
  // groupEnum=GroupEnum;
  // powerList: PowerList[] = [];
  // xlsxPowerList: PowerList[] = [];

  triffList = [];

  constructor(public router: Router
    ) {
}
  
  ngOnInit(): void {
  }

  
}
