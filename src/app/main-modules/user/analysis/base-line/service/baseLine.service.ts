import { Injectable } from '@angular/core';
import {GeneralService} from '../../../../../_base/service/_service/general.service';
import {HttpClient} from '@angular/common/http';
import {GATEWAY_URL} from '../../../../../_base/service/model/rest-constants';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class BaseLineService  extends GeneralService {

  constructor(public http: HttpClient) {
    super(http);
    this.prefixPath = GATEWAY_URL + '/analysis/baseLine';
  }

  getBaseLine(param: any, body: any,  errorSelector?: string): Observable<any> {
    return super.postCheckService('get-building-baseLine',body, errorSelector, param);
  }
  getBaseLineSingleCarier(param: any, body: any,  errorSelector?: string): Observable<any> {
    return super.postCheckService('get-building-baseLine-singleCarier',body, errorSelector, param);
  }
}
