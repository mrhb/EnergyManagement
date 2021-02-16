import { Component, OnInit } from '@angular/core';
import { ClimateList } from '../../model/climate';
import { UseTypePowerEnum,OstanEnum } from '../../model/climateEnum';
@Component({
  selector: 'app-climate-list',
  templateUrl: './climate-list.component.html',
  styleUrls: ['./climate-list.component.scss']
})
export class ClimateListComponent implements OnInit {
  pageSize = 10;
  pageIndex = 0;
  length = -1;

  filterBuilding = '';
  useTypeEnum = UseTypePowerEnum;
  climateList: ClimateList[] = [];
  buildingList = [];

  constructor() { 

  }

  ngOnInit(): void {
  }

}
