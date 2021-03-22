import { Component, OnInit } from '@angular/core';
import { StateService } from '../../../../state.service';

@Component({
  selector: 'app-energyConsumption',
  templateUrl: './energyConsumption.component.html',
  styleUrls: ['./energyConsumption.component.scss']
})
export class EnergyConsumptionComponent implements OnInit {
  region="";

  constructor(
    public stateService:StateService
  ) {
    stateService.region.subscribe(reg=>{
      this.region=reg;
    });
   }

  ngOnInit(): void {
  }

}
