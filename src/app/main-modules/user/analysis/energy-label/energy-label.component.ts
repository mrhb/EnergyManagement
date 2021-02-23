import { Component, OnInit } from '@angular/core';
import { EnergyLabel } from './model/energyLabel';
import { EnergyLabelType } from './model/EnergyLabelType';

@Component({
  selector: 'app-energy-label',
  templateUrl: './energy-label.component.html',
  styleUrls: ['./energy-label.component.scss']
})
export class EnergyLabelComponent implements OnInit {
  energyLabel:EnergyLabel = {
    consumptionIndex: '1277',
    label: 'A',
    labelType: EnergyLabelType.NON_RESIDENTIAL,
    ratio: '10.98'
  };
  constructor() { }

  ngOnInit(): void {
  }

}
