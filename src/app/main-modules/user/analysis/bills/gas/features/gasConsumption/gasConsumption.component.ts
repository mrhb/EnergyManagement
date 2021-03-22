import { Component, OnInit } from '@angular/core';
import { StateService } from '../../../../state.service';

@Component({
  selector: 'app-gasConsumption',
  templateUrl: './gasConsumption.component.html',
  styleUrls: ['./gasConsumption.component.scss']
})
export class GasConsumptionComponent implements OnInit {
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
