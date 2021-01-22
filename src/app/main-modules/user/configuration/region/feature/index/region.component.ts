import {Component, OnInit} from '@angular/core';
import {RegionService} from '../../service/region.service';
import {Region} from "../../model/region";
import {Tools} from "../../../../../../shared/tools/tools";

@Component({
  selector: 'app-region',
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.scss']
})
export class RegionComponent implements OnInit {
  regionList: Region[] = [];
  region = new Region();

  constructor() {
  }

  ngOnInit(): void {

  }


}
