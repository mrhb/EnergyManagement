import { Component, OnInit,  EventEmitter, Output, ViewContainerRef, } from '@angular/core';

@Component({
  selector: 'app-tariff-power-param1',
  templateUrl: './tariff-power-param1.component.html',
  styleUrls: ['./tariff-power-param1.component.scss']
})
export class TariffPowerParam1Component implements  OnInit {
  @Output() paramOutputEvent : EventEmitter<Number> = new EventEmitter<Number>();

  constructor() { }

  ngOnInit(): void {

    this.someFunc();
  }

  someFunc() {
    this.paramOutputEvent.emit(122212)
}

}
