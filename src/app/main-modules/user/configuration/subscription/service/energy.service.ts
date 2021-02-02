import { Injectable } from '@angular/core';
import {GeneralService} from '../../../../../_base/service/_service/general.service';
import {HttpClient} from '@angular/common/http';
import {GATEWAY_URL} from '../../../../../_base/service/model/rest-constants';
import {Observable} from 'rxjs';

@Injectable()
export class EnergyService  extends GeneralService {

  constructor(public http: HttpClient) {
    super(http);
    this.prefixPath = GATEWAY_URL + '/api/energy-sharing';
  }

  createEnergy(body: any, errorSelector?: string): Observable<any> {
    return super.postCheckService('create', body, errorSelector);
  }

  updateEnergy(param: {id: string}, body: any, errorSelector?: string): Observable<any> {
    return super.putCheckService('update', body, errorSelector, param);
  }

  getOneEnergy(param: {id: string}, errorSelector?: string): Observable<any> {
    return super.getCheckService('get-one', errorSelector, param);
  }

  addBuildingAllocation(param: {id: string}, body: any,  errorSelector?: string): Observable<any> {
    return super.postCheckService('add-building-allocation', body, errorSelector, param);
  }

  deleteEnergyBuildingAllocation(param: {id: string, allocationId: string}, errorSelector?: string): Observable<any> {
    return super.deleteCheckService('delete-building-allocation', errorSelector, param);
  }

  getEnergyList(param: any, body: any,  errorSelector?: string): Observable<any> {
    return super.postCheckService('get-list-pageable-by-filter', body, errorSelector, param);
  }

  deleteEnergy(param: {id: string}, errorSelector?: string): Observable<any> {
    return super.deleteCheckService('delete', errorSelector, param);
  }
}
