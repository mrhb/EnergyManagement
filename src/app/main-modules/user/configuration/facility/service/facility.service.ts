import { Injectable } from '@angular/core';
import {GeneralService} from '../../../../../_base/service/_service/general.service';
import {HttpClient} from '@angular/common/http';
import {GATEWAY_URL} from '../../../../../_base/service/model/rest-constants';
import {Observable} from 'rxjs';

@Injectable()
export class FacilityService extends GeneralService {

  constructor(public http: HttpClient) {
    super(http);
    this.prefixPath = GATEWAY_URL + '/api/building';
  }

  createFacility(body: any, errorSelector?: string): Observable<any> {
    return super.postCheckService('create-facility', body, errorSelector);
  }

  updateFacility(param: {id: string}, body: any, errorSelector?: string): Observable<any> {
    return super.putCheckService('update', body, errorSelector, param);
  }
  getFacilityList(param: any, facilitySharingId: any, errorSelector?: string): Observable<any> {
    return super.postCheckService('get-facility-list-pageable-by-filter', facilitySharingId, errorSelector, param);
  }

  deleteFacility(param: {id: string}, errorSelector?: string): Observable<any> {
    return super.deleteCheckService('delete', errorSelector, param);
  }

  getOneFacility(param: {id: string}, errorSelector?: string): Observable<any> {
    return super.getCheckService('get-one', errorSelector, param);
  }

  getListFacility(param, errorSelector?: string): Observable<any> {
    return super.getCheckService('get-list-pageable-by-term', errorSelector, param);
  }
}
