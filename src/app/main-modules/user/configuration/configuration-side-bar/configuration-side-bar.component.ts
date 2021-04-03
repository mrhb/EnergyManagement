import { Component, OnInit } from '@angular/core';
import { RegionService } from '../region/service/region.service';

@Component({
  selector: 'configuration-side-bar',
  templateUrl: './configuration-side-bar.component.html',
  styleUrls: ['./configuration-side-bar.component.scss']
})
export class ConfigurationSideBarComponent implements OnInit {

  constructor(
    public stateService:RegionService
  ) { }

  ngOnInit(): void {
  }
  getRegion($event: any): void {
    var str=$event.regionTitle.split('&').join('>');
    this.stateService.region.next(str);
    this.stateService.regionId.next($event.regionId);
   }

}
