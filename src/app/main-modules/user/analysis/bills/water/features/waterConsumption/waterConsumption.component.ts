import { Component, OnInit } from '@angular/core';
import { StateService } from '../../../../state.service';

@Component({
  selector: 'app-waterConsumption',
  templateUrl: './waterConsumption.component.html',
  styleUrls: ['./waterConsumption.component.scss']
})
export class WaterConsumptionComponent implements OnInit {
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
