import { Component, OnInit } from '@angular/core';
import { StateService } from '../../../../state.service';

@Component({
  selector: 'app-voltag',
  templateUrl: './voltag.component.html',
  styleUrls: ['./voltag.component.scss']
})
export class VoltagComponent implements OnInit {
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
