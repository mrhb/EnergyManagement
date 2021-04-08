import { Injectable } from '@angular/core';
import {GeneralService} from '../../../../../_base/service/_service/general.service';
import {HttpClient} from '@angular/common/http';
import {GATEWAY_URL} from '../../../../../_base/service/model/rest-constants';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClimateService extends GeneralService {

  constructor(public http: HttpClient) {
    super(http);
    this.prefixPath = GATEWAY_URL + '/api/climate';
  }


  updateClimate(param: {id: string}, body: any, errorSelector?: string): Observable<any> {
    return super.putCheckService('update-climate', body, errorSelector, param);
  }
  updateweather(param: {id: string}, body: any, errorSelector?: string): Observable<any> {
    return super.putCheckService('update-weather', body, errorSelector, param);
  }

  getClimateList(param: any, body: any,  errorSelector?: string): Observable<any> {
    return super.postCheckService('get-climate-list-pageable-by-filter', body, errorSelector, param);
  }

  getOneClimate(param: {id: string}, errorSelector?: string): Observable<any> {
    return super.getCheckService('get-one', errorSelector, param);
  }


  getWeatherList(param: any, body: any,  errorSelector?: string): Observable<any> {
    return super.postCheckService('get-weather-list-by-yaer', body, errorSelector, param);
  }

  addBuildingAllocation(param: {id: string}, body: any,  errorSelector?: string): Observable<any> {
    return super.postCheckService('add-building-allocation', body, errorSelector, param);
  }

  updateBuildingAllocation(param: {id: string}, body: any,  errorSelector?: string): Observable<any> {
    return super.putCheckService('update-building-allocation', body, errorSelector, param);
  }

  deleteClimateBuildingAllocation(param: {id: string, allocationId: string}, errorSelector?: string): Observable<any> {
    return super.deleteCheckService('delete-building-allocation', errorSelector, param);
  }



  getClimateBillList(param: any, body: any,  errorSelector?: string): Observable<any> {
    return super.postCheckService('get-bill-list-pageable-by-filter', body, errorSelector, param);
  }

  deleteClimate(param: {id: string}, errorSelector?: string): Observable<any> {
    return super.deleteCheckService('delete', errorSelector, param);
  }
}
