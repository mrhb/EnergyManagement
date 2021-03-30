import { Component, OnInit } from '@angular/core';
import { Region } from 'src/app/base-modules/region/model/region';
import { StateService } from '../state.service';

@Component({
  selector: 'analysis-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {

  constructor(
      public stateService:StateService
  ) { }

  ngOnInit(): void {
  }

  getRegion($event: any): void {
   var str=$event.regionTitle.split('&').join('>');
   this.stateService.region.next(str);
   this.stateService.regionId.next($event.regionId);
  }

}
