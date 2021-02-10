import { Injectable } from '@angular/core';
import {GeneralService} from '../../../../_base/service/_service/general.service';
import {HttpClient} from '@angular/common/http';
import {GATEWAY_URL} from '../../../../_base/service/model/rest-constants';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService extends GeneralService {

  constructor(public http: HttpClient) {
    super(http);
    this.prefixPath = GATEWAY_URL + '/api/user';
  }

  getOne(errorSelector?: string): Observable<any> {
    return super.getCheckService('get-profile', errorSelector);
  }

  updateProfile( body: any, errorSelector?: string): Observable<any> {
    return super.putCheckService('update-profile', body, errorSelector);
  }

  updatePassword( body: any, errorSelector?: string): Observable<any> {
    return super.putCheckService('update-password', body, errorSelector);
  }

  updateEmail( email: string, errorSelector?: string): Observable<any> {
    return super.putCheckService('update-email/' + email, '', errorSelector);
  }
  updatePhoto( photo: {photo: string}, errorSelector?: string): Observable<any> {
    return super.putCheckService('update-profile-photo' , photo, errorSelector);
  }


}
