import { Component, OnInit } from '@angular/core';
import { StateService } from '../../../../state.service';

@Component({
  selector: 'app-powerConsValid',
  templateUrl: './powerConsValid.component.html',
  styleUrls: ['./powerConsValid.component.scss']
})
export class PowerConsValidComponent implements OnInit {
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
