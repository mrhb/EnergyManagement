import { Injectable } from '@angular/core';
import {GeneralService} from '../../../../../_base/service/_service/general.service';
import {HttpClient} from '@angular/common/http';
import {GATEWAY_URL} from '../../../../../_base/service/model/rest-constants';
import {Observable} from 'rxjs';

@Injectable()
  export class EnergyReceiptService extends GeneralService {

    constructor(public http: HttpClient) {
      super(http);
      this.prefixPath = GATEWAY_URL + '/api/energy-receipt';
    }
  
    createReceipt(body: any, errorSelector?: string): Observable<any> {
      return super.postCheckService('create', body, errorSelector);
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
  
