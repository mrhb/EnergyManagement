import { Injectable } from '@angular/core';
import {GeneralService} from '../../../../../_base/service/_service/general.service';
import {HttpClient} from '@angular/common/http';
import {GATEWAY_URL} from '../../../../../_base/service/model/rest-constants';
import {Observable} from 'rxjs';

@Injectable()
export class ClimateListService extends GeneralService {

  constructor(public http: HttpClient) {
    super(http);
    this.prefixPath = GATEWAY_URL + '/api/climate-list';
  }

  createList(body: any, errorSelector?: string): Observable<any> {
    return super.postCheckService('create', body, errorSelector);
  }

  getOneList(param: {id: string}, errorSelector?: string): Observable<any> {
    return super.getCheckService('get-one', errorSelector, param);
  }

  updateList(param: {id: string}, body: any, errorSelector?: string): Observable<any> {
    return super.putCheckService('update', body, errorSelector, param);
  }

  getListList(param: any, body: any,  errorSelector?: string): Observable<any> {
    return super.postCheckService('get-list-pageable-by-filter', body, errorSelector, param);
  }

  deleteList(param: {id: string}, errorSelector?: string): Observable<any> {
    return super.deleteCheckService('delete', errorSelector, param);
  }
}
