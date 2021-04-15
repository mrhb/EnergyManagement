import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { TariffParamsViewDirective } from '../tariff-create/tariff-params-view.directive';

@Component({
  selector: 'app-tariff-power-param1',
  templateUrl: './tariff-power-param1.component.html',
  styleUrls: ['./tariff-power-param1.component.scss']
})
export class TariffPowerParam1Component implements  OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
