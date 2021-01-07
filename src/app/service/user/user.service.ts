import {Injectable} from '@angular/core';

import {HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Login} from '../../model/user/login';
import {map} from 'rxjs/operators';
import {Constants} from '../../model/enum/constants';
import {User} from '../../model/user/user';
import {AbstractControl} from '@angular/forms';
import {environment} from '@environments/environment';
import {UpdateProfile} from '@app/model/user/updateProfile';
import {ChangePassword} from '@app/model/user/changePassword';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private AUTH_API = 'http://127.0.0.1:3600/api/auth/login';
  private USER_API = 'http://127.0.0.1:3600/api/user/';

  public token = localStorage.getItem(Constants.Authorization.toString());


  constructor(private http: HttpClient) {
  }

  // tslint:disable-next-line:typedef
  login(login: Login) {
    console.log('UserService user : ' + login);
    return this.http.post<any>(`${this.AUTH_API}`, login);
  }

  // tslint:disable-next-line:typedef
  getProfile() {
    console.log('UserService token ' + this.token);
    let header = new HttpHeaders();
    header = header.append('Authorization', 'Bearer ' + this.token);
    return this.http.get<any>(`${this.USER_API + 'get-profile'}`, {headers: header});
  }

  // tslint:disable-next-line:typedef
  signup(reqSignup: User) {
    return this.http.post<any>(`${this.USER_API + 'signup'}`, reqSignup);
  }

  // tslint:disable-next-line:typedef
  isMobileExists(mobile: string) {
    return this.http.get<any>(`${this.USER_API + 'is-mobile-exists/' + mobile}`);
  }

  // tslint:disable-next-line:typedef
  isEmailExists(email: string) {
    return this.http.get<any>(`${this.USER_API + 'is-email-exists/' + email}`);
  }

  // tslint:disable-next-line:typedef
  updateProfile(reqUpdateProfile: UpdateProfile) {
    console.log('UserService token ' + this.token);
    let header = new HttpHeaders();
    header = header.append('Authorization', 'Bearer ' + this.token);
    return this.http.put<any>(`${this.USER_API + 'update-profile'}`, reqUpdateProfile, {headers: header});
  }

  // tslint:disable-next-line:typedef
  uploadProfilePhoto(formData: FormData) {
    console.log('UserService token ' + this.token);
    let header = new HttpHeaders();
    header = header.append('Authorization', 'Bearer ' + this.token);
    return this.http.put<any>(`${this.USER_API + 'upload-profile-photo'}`, formData, {headers: header});
  }

  // tslint:disable-next-line:typedef
  updatePassword(reqChangePassword: ChangePassword){
    console.log('UserService token ' + this.token);
    let header = new HttpHeaders();
    header = header.append('Authorization', 'Bearer ' + this.token);
    return this.http.put<any>(`${this.USER_API + 'update-password'}`, reqChangePassword, {headers: header});
  }
}
