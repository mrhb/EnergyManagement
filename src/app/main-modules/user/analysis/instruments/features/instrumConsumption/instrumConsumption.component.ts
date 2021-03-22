import { Component, OnInit } from '@angular/core';
import { StateService } from '../../../state.service';

@Component({
  selector: 'app-instrumConsumption',
  templateUrl: './instrumConsumption.component.html',
  styleUrls: ['./instrumConsumption.component.scss']
})
export class InstrumConsumptionComponent implements OnInit {
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
