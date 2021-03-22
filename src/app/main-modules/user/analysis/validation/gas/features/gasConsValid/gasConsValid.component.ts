import { Component, OnInit } from '@angular/core';
import { StateService } from '../../../../state.service';

@Component({
  selector: 'app-gasConsValid',
  templateUrl: './gasConsValid.component.html',
  styleUrls: ['./gasConsValid.component.scss']
})
export class GasConsValidComponent implements OnInit {
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
