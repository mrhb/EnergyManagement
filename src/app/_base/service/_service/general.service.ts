import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CheckService} from './check.service';

export class GeneralService extends CheckService {

  constructor(public http: HttpClient) {
    super(http);
  }

  getListService(params?: {
    [param: string]: any | ReadonlyArray<string>;
  }): Observable<any> {
    return super.get('/get-list', {
      params,
      needToken: true,
    });
  }

  getPageService(params?: {
    [param: string]: any | ReadonlyArray<string>;
  }): Observable<any> {
    return super.get('/get-page', {
      params,
      needToken: true,
    });
  }

  getOneService(params?: {
    [param: string]: string | ReadonlyArray<string>;
  }): Observable<any> {
    return super.get('/get-one', {
      params,
      needToken: true,

    });
  }

  createService(body: any, params?: {
    [param: string]: string | ReadonlyArray<string>;
  }): Observable<any> {
    return super.post('/create', body, {
      params,
      needToken: true,
    });
  }

  updateService(body: any, params?: {
    [param: string]: string | ReadonlyArray<string>;
  }): Observable<any> {
    return super.put('/update', body, {
      params,
      needToken: true,

    });
  }

  deleteService(params?: {
    [param: string]: string | ReadonlyArray<string>;
  }): Observable<any> {
    return super.delete('/delete', {
      params,
      needToken: true,
    });
  }
}

