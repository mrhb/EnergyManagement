/**
 * create By reza mollaei
 * Email: reza_yki@yahoo.com
 * telegram: reza_yki
 */

import {Component, OnInit} from '@angular/core';
import {Region} from '../../model/region';

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
