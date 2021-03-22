import { Component, OnInit } from '@angular/core';
import { StateService } from '../../../../state.service';

@Component({
  selector: 'app-powerConsumption',
  templateUrl: './powerConsumption.component.html',
  styleUrls: ['./powerConsumption.component.scss']
})
export class PowerConsumptionComponent implements OnInit {
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
