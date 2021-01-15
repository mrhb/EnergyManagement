import {Injectable} from '@angular/core';
import {GeneralService} from '../../../_base/service/_service/general.service';
import {HttpClient} from '@angular/common/http';
import {GATEWAY_URL} from '../../../_base/service/model/rest-constants';
import {Observable} from 'rxjs';
import {Auth} from '../model/auth';

@Injectable()
export class CheckUserService extends GeneralService {

  constructor(public http: HttpClient) {
    super(http);
    this.prefixPath = GATEWAY_URL + '/api/user';
  }

  getCheckPhone(phone: string, errorSelector?: string): Observable<any> {
    return super.getCheckService('is-mobile-exists/' + phone, errorSelector, );
  }

  getCheckEmail(email: string, errorSelector?: string): Observable<any> {
    return super.getCheckService('is-email-exists/' + email, errorSelector, );
  }

  userSignUp(body: Auth.SignUp, errorSelector?: string): Observable<any> {
    return super.postCheckService('signup', body, errorSelector);
  }

  reqForgetPass( body: any, errorSelector?: string): Observable<any> {
    return super.postCheckService('req-forget-password', body, errorSelector);
  }

  resetPassword( body: any, errorSelector?: string): Observable<any> {
    return super.postCheckService('reset-password', body, errorSelector);
  }

}
