import { Component, OnInit } from '@angular/core';
import { SeriesInfo } from '../../../model/chart';
import { StateService } from '../../../state.service';

@Component({
  selector: 'app-power-subscription-analysis',
  templateUrl: './power-subscription-analysis.component.html',
  styleUrls: ['./power-subscription-analysis.component.scss']
})
export class PowerSubscriptionAnalysisComponent implements OnInit {
  region: string;

  series: SeriesInfo= {
    series:[
      { data: [85, 12, 78, 75], name: 'ظرفیت 100' },
      { data: [67, 23, 96, 13], name: 'ظرفیت 200' }
    ],
    labels:["مشهد", "کاشمر","بردسکن","جاجرم"]
    
  }

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
