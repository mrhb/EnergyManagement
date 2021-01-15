import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GATEWAY_URL} from '../../../_base/service/model/rest-constants';
import {Observable} from 'rxjs';
import {GeneralService} from '../../../_base/service/_service/general.service';

@Injectable()
export class AuthService extends GeneralService {

  constructor(public http: HttpClient) {
    super(http);
    this.prefixPath = GATEWAY_URL + '/api/auth';
  }

  login( body: any, errorSelector?: string): Observable<any> {
    return super.postCheckService('login', body, errorSelector);
  }



}
