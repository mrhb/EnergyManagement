import { Component, OnInit } from '@angular/core';
import { StateService } from '../../../../state.service';

@Component({
  selector: 'app-damandPenalty',
  templateUrl: './damandPenalty.component.html',
  styleUrls: ['./damandPenalty.component.scss']
})
export class DamandPenaltyComponent implements OnInit {
  region: string;

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
