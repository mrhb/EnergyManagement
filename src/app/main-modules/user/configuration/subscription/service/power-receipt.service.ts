import { Injectable } from '@angular/core';
import {GeneralService} from '../../../../../_base/service/_service/general.service';
import {HttpClient} from '@angular/common/http';
import {GATEWAY_URL} from '../../../../../_base/service/model/rest-constants';
import {Observable} from 'rxjs';

@Injectable()
export class PowerReceiptService extends GeneralService {

  constructor(public http: HttpClient) {
    super(http);
    this.prefixPath = GATEWAY_URL + '/api/power-receipt';
  }
  getPowerBillList_onLine(): Observable<any> {

    const headers = { 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IntcIlVzZXJJcFwiOm51bGwsXCJVc2VySWRcIjo0MjkyMzgwLFwiU2Vzc2lvbktleVwiOm51bGx9IiwiZXhwIjoxNjQyMDAyODA3LCJpYXQiOjE2MjYxMDE2MDcsIm5iZiI6MTYyNjEwMTYwN30.7wRER5UDqIk4gLNCYKu8ENIlUMHAq4aq_JlbV-Nmvt4'
     };
    const bodyy = { FromYear: "1396",bill_identifier:"9651334204123"};
    return this.http.post('https://uiapi2.saapa.ir/api/sale/SaleEnergyHistory', bodyy, { headers });
  }
  createReceipt(body: any, errorSelector?: string): Observable<any> {
    return super.postCheckService('create', body, errorSelector);
  }

  createMultiReceipt(body: any, errorSelector?: string): Observable<any> {
    return super.postCheckService('create-multi', body, errorSelector);
  }

  getOneReceipt(param: {id: string}, errorSelector?: string): Observable<any> {
    return super.getCheckService('get-one', errorSelector, param);
  }

  updateReceipt(param: {id: string}, body: any, errorSelector?: string): Observable<any> {
    return super.putCheckService('update', body, errorSelector, param);
  }

  getReceiptList(param: any, body: any,  errorSelector?: string): Observable<any> {
    return super.postCheckService('get-list-pageable-by-filter', body, errorSelector, param);
  }

  deleteReceipt(param: {id: string}, errorSelector?: string): Observable<any> {
    return super.deleteCheckService('delete', errorSelector, param);
  }
}
