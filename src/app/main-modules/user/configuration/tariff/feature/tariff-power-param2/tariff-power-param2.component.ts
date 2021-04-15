import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Power1Params, TariffInfo } from '../../model/tariff';

@Component({
  selector: 'app-tariff-power-param2',
  templateUrl: './tariff-power-param2.component.html',
  styleUrls: ['./tariff-power-param2.component.scss']
})
export class TariffPowerParam2Component implements OnInit {
  @Input() TariffInfo: TariffInfo;
  powerParams=new Power1Params();

  constructor() { }

  ngOnInit(): void {

    this.someFunc();
  }

  someFunc() {
    this.powerParams.demandPrice=132423;
    this.powerParams.x=[234,35,34,345,344,345];
    this.powerParams.y=[234,35,34,345,344,345];
    this.powerParams.xGarm=[234,35,34,345,344,345];
    this.powerParams.yGarm=[234,35,34,345,344,345];

}
}
