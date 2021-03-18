import { Component, OnInit } from '@angular/core';
import { StateService } from '../../../../state.service';

@Component({
  selector: 'app-demand',
  templateUrl: './demand.component.html',
  styleUrls: ['./demand.component.scss']
})
export class DemandComponent implements OnInit {
  region

  constructor(
    public stateService:StateService
  ) {
this.region=stateService.region.value;
   }

  ngOnInit(): void {
  }

}
