import { Injectable } from '@angular/core';
import {GeneralService} from '../../../../../_base/service/_service/general.service';
import {HttpClient} from '@angular/common/http';
import {GATEWAY_URL} from '../../../../../_base/service/model/rest-constants';
import {Observable} from 'rxjs';

@Injectable()
export class InstrumentService  extends GeneralService {

  constructor(public http: HttpClient) {
    super(http);
    this.prefixPath = GATEWAY_URL + '/api/instrument';
  }

  createInstrument(body: any, errorSelector?: string): Observable<any> {
    return super.postCheckService('create', body, errorSelector);
  }

  updateInstrument(param: {id: string}, body: any, errorSelector?: string): Observable<any> {
    return super.putCheckService('update', body, errorSelector, param);
  }

  getOneInstrument(param: {id: string}, errorSelector?: string): Observable<any> {
    return super.getCheckService('get-one', errorSelector, param);
  }

  addBuildingAllocation(param: {id: string}, body: any,  errorSelector?: string): Observable<any> {
    return super.postCheckService('add-building-allocation', body, errorSelector, param);
  }

  updateBuildingAllocation(param: {id: string}, body: any,  errorSelector?: string): Observable<any> {
    return super.putCheckService('update-building-allocation', body, errorSelector, param);
  }

  deleteInstrumentBuildingAllocation(param: {id: string, allocationId: string}, errorSelector?: string): Observable<any> {
    return super.deleteCheckService('delete-building-allocation', errorSelector, param);
  }

  getInstrumentList(param: any, body: any,  errorSelector?: string): Observable<any> {
    return super.postCheckService('get-list-pageable-by-filter', body, errorSelector, param);
  }

  deleteInstrument(param: {id: string}, errorSelector?: string): Observable<any> {
    return super.deleteCheckService('delete', errorSelector, param);
  }
}
