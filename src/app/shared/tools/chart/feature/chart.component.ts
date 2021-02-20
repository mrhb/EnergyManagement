/**
 * create By reza mollaei
 * Email: reza_yki@yahoo.com
 * telegram: reza_yki
 */

import {Component, ElementRef, Input, OnChanges, OnInit} from '@angular/core';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  @Input() public isLoadingChart = false;
  @Input() public options;

  constructor(public chartElem: ElementRef) {
  }

  ngOnInit(): void {

  }
}
