import { Injectable } from '@angular/core';
import {GeneralService} from '../../../../../_base/service/_service/general.service';
import {HttpClient} from '@angular/common/http';
import {GATEWAY_URL} from '../../../../../_base/service/model/rest-constants';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class EnergyLabelService  extends GeneralService{

  constructor(public http: HttpClient) {
    super(http);
    this.prefixPath = GATEWAY_URL + '/api/building';
  }

  getBuildingList(param: any, regionId: any, errorSelector?: string): Observable<any> {
    return super.postCheckService('get-building-list-pageable-by-filter', regionId, errorSelector, param);
  }


  getOneBuilding(param: {id: string}, errorSelector?: string): Observable<any> {
    return super.getCheckService('get-one', errorSelector, param);
  }

  getListBuilding(param, errorSelector?: string): Observable<any> {
    return super.getCheckService('get-list-pageable-by-term', errorSelector, param);
  }

  getListBuildingForSelection(param, errorSelector?: string): Observable<any> {
    return super.getCheckService('get-list-pageable-by-term-for-selection', errorSelector, param);
  }
}
