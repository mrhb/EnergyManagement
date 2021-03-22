import { Component, OnInit } from '@angular/core';
import { StateService } from '../../../../state.service';

@Component({
  selector: 'app-powerAmounValid',
  templateUrl: './powerAmounValid.component.html',
  styleUrls: ['./powerAmounValid.component.scss']
})
export class PowerAmounValidComponent implements OnInit {
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
