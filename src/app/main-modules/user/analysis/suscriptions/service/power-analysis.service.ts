import { Injectable } from '@angular/core';
import {GeneralService} from '../../../../../_base/service/_service/general.service';
import {HttpClient} from '@angular/common/http';
import {GATEWAY_URL} from '../../../../../_base/service/model/rest-constants';
import {Observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PowerAnalysisService extends GeneralService  {
 
  constructor(public http: HttpClient) {
    super(http);
    this.prefixPath = GATEWAY_URL + '/analysis/suscriptions';
   }

  getDemandPenaltyAnalysis(param: {regionId: string}, errorSelector?: string): Observable<any> {
    return super.getCheckService('get-power-demandPenalty', errorSelector, param);
  }
  getDemandAnalysis(param: {regionId: string}, errorSelector?: string): Observable<any> {
    return super.getCheckService('get-power-demand', errorSelector, param);
  }
  getDemandSumAnalysis(param: {regionId: string}, errorSelector?: string): Observable<any> {
    return super.getCheckService('get-power-demandSum', errorSelector, param);
  }
  getReactiveAnalysis(param: {regionId: string}, errorSelector?: string): Observable<any> {
    return super.getCheckService('get-power-reactive', errorSelector, param);
  }
  getTariffAnalysis(param: {regionId: string}, errorSelector?: string): Observable<any> {
    return super.getCheckService( 'get-power-tariff', errorSelector, param);
  }
  getVoltageAnalysis(param: {regionId: string}, errorSelector?: string): Observable<any> {
    return super.getCheckService( 'get-power-voltage', errorSelector, param);
  }
}
