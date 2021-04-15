import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-tariff-power-param2',
  templateUrl: './tariff-power-param2.component.html',
  styleUrls: ['./tariff-power-param2.component.scss']
})
export class TariffPowerParam2Component implements OnInit {
  @Output() paramOutputEvent : EventEmitter<Number> = new EventEmitter<Number>();

  constructor() { }

  ngOnInit(): void {

    this.someFunc();
  }

  someFunc() {
    this.paramOutputEvent.emit(55555)
}
}
