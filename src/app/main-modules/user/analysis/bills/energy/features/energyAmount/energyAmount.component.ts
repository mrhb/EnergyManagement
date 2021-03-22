import { Component, OnInit } from '@angular/core';
import { StateService } from '../../../../state.service';

@Component({
  selector: 'app-energyAmount',
  templateUrl: './energyAmount.component.html',
  styleUrls: ['./energyAmount.component.scss']
})
export class EnergyAmountComponent implements OnInit {
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
