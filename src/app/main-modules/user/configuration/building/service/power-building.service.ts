import { Injectable } from '@angular/core';
import {GeneralService} from '../../../../../_base/service/_service/general.service';
import {HttpClient} from '@angular/common/http';
import {GATEWAY_URL} from '../../../../../_base/service/model/rest-constants';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PowerBuildingService extends GeneralService {

  constructor(public http: HttpClient) {
    super(http);
    this.prefixPath = GATEWAY_URL + '/api/power-sharing';
  }

  getListPowerSharing(param, body, errorSelector?: string): Observable<any> {
    return super.postCheckService('get-list-pageable-by-term-and-not-building', body, errorSelector, param);
  }

  addPowerAllocation(param: {id: string}, body: any,  errorSelector?: string): Observable<any> {
    return super.postCheckService('add-building-allocation', body, errorSelector, param);
  }

  deletePowerAllocation(param: {id: string, allocationId: string}, errorSelector?: string): Observable<any> {
    return super.deleteCheckService('delete-building-allocation', errorSelector, param);
  }
}
