import { Component, OnInit } from '@angular/core';
import { SeriesInfo } from '../../../../model/chart';
import { StateService } from '../../../../state.service';
import { GasService } from '../../service/gas.service';

@Component({
  selector: 'app-capacity',
  templateUrl: './capacity.component.html',
  styleUrls: ['./capacity.component.scss']
})
export class CapacityComponent implements OnInit {
  region="";
  series: SeriesInfo= {
    series:[
      { data: [85, 12, 78, 75], name: 'ظرفیت 100' },
      { data: [67, 23, 96, 13], name: 'ظرفیت 200' }
    ],
    labels:["مشهد", "کاشمر","بردسکن","جاجرم"]
      
  }


  constructor(
    public stateService:StateService,
    gasService:GasService
  ) {
    stateService.region.subscribe(reg=>{
      this.region=reg;
    });
   }

  ngOnInit(): void {
  }

}
