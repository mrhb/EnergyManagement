import { Component, OnInit } from '@angular/core';
import { StateService } from '../../../../state.service';

@Component({
  selector: 'app-demandSum',
  templateUrl: './demandSum.component.html',
  styleUrls: ['./demandSum.component.scss']
})
export class DemandSumComponent implements OnInit {
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
