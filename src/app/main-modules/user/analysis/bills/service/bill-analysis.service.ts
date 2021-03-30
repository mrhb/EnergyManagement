import { Injectable } from '@angular/core';
import {GeneralService} from '../../../../../_base/service/_service/general.service';
import {HttpClient} from '@angular/common/http';
import {GATEWAY_URL} from '../../../../../_base/service/model/rest-constants';
import {Observable} from 'rxjs';
import { BillAnalysisDto } from '../model/bill';

@Injectable({
  providedIn: 'root'
})
export class BillAnalysisService extends GeneralService  {

  constructor(public http: HttpClient) {
    super(http);
    this.prefixPath = GATEWAY_URL + '/analysis/bills';
   }

   getRawBillCostAnalysis(param: any, body: any,  errorSelector?: string): Observable<any> {
    return super.postCheckService('get-raw-bill-cost',body, errorSelector, param);
  }

  getRawBillConsumptionAnalysis(param: {regionId: string}, errorSelector?: string): Observable<any> {
    return super.getCheckService('get-raw-bill-consumption', errorSelector, param);
  }
  


  getNormalizedBillCostAnalysis(param: {regionId: string}, errorSelector?: string): Observable<any> {
    return super.getCheckService('get-raw-bill-cost', errorSelector, param);
  }
  getNormalizedBillAmountAnalysis(param: {regionId: string}, errorSelector?: string): Observable<any> {
    return super.getCheckService('get-raw-bill-consumption', errorSelector, param);
  }

}
