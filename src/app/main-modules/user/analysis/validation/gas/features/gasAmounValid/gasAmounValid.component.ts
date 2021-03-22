import { Component, OnInit } from '@angular/core';
import { StateService } from '../../../../state.service';

@Component({
  selector: 'app-gasAmounValid',
  templateUrl: './gasAmounValid.component.html',
  styleUrls: ['./gasAmounValid.component.scss']
})
export class GasAmounValidComponent implements OnInit {
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
