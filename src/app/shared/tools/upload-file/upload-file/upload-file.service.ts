/**
 * create By reza mollaei
 * Email: reza_yki@yahoo.com
 * telegram: reza_yki
 */

import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {GATEWAY_URL, TOKEN_CACHE_KEY, TOKEN_PREFIX} from '../../../../_base/service/model/rest-constants';

@Injectable()
export class UploadFileService {
  prefixPath;

  constructor(public http: HttpClient) {
    this.prefixPath = GATEWAY_URL + '/api/file/';
  }

  postFile(fileList): Observable<any> {
    const url = this.prefixPath + 'upload';
    console.log('url', url);
    const file: File = fileList[0];
    const formData: FormData = new FormData();
    formData.append('file', file);

    let header = new HttpHeaders();
    header = header.append('Authorization', TOKEN_PREFIX + localStorage.getItem(TOKEN_CACHE_KEY));
    return this.http.post(url, formData, {headers: header});
  }


  // postFile(formData): Observable<any> {
  //   const url = 'api/file/upload';
  //   const headers = new HttpHeaders();
  //   // const headers = new Headers();
  //
  //   // headers.append('Content-Type', 'application/json');
  //   headers.append('Content-Type', 'multipart/form-data');
  //   // return super.postCheckService('login', formData, '', {headers});
  //   // return super.post('login', formData, {headers: headers})
  //   return this.http.post(url, formData, { headers});
  //   // return this.http
  //   //   .post(endpoint, formData, { headers })
  //   //   .map(() => true)
  //   //   .catch((e) => this.handleError(e));
  // }
}
