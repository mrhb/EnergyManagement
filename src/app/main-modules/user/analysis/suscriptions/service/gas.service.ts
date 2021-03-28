import { Injectable } from '@angular/core';
import {GeneralService} from '../../../../../_base/service/_service/general.service';
import {HttpClient} from '@angular/common/http';
import {GATEWAY_URL} from '../../../../../_base/service/model/rest-constants';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GasService extends GeneralService  {
 

  constructor(public http: HttpClient) {
    super(http);
    this.prefixPath = GATEWAY_URL + '/analysis/suscriptions';
   }

  getCapacityAnalysis(param: {regionId: string}, errorSelector?: string): Observable<any> {
    return super.getCheckService('get-gas-capacity', errorSelector, param);
  }
  gasConsuptionAnalysis(param: {regionId: string}, errorSelector?: string): Observable<any> {
    return super.getCheckService('get-gas-consuption', errorSelector, param);
  }
  getContorAnalysis(param: {regionId: string}, errorSelector?: string): Observable<any> {
    return super.getCheckService('get-gas-contor', errorSelector, param);
  }
  getShirAnalysis(param: {regionId: string}, errorSelector?: string): Observable<any> {
    return super.getCheckService('get-gas-shir', errorSelector, param);
  }
}
