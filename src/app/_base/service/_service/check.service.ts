import {BaseService} from './base.service';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
// @ts-ignore
import Notiflix from 'notiflix';
import {Tools} from '../../../shared/tools/tools';

// declare var Notiflix: any;
export class CheckService extends BaseService {
  constructor(public http: HttpClient) {

    super(http);
  }

  // getCheckService(params?: {
  //   [param: string]: any | ReadonlyArray<string>;
  // }): Observable<any> {
  //   const result = new BehaviorSubject<any>(null);
  //   super.get('/get-list', {
  //     params,
  //     needToken: true,
  //   }).subscribe((res: any) => {
  //     if (!res.flag) {
  //       console.log(res.massage);
  //     } else {
  //       result.next(res);
  //     }
  //   });
  //   return result.asObservable();
  // }

  postCheckService(suffixPath: string, body: any, errorSelector?: string, params?: {
    [param: string]: string | ReadonlyArray<string>;
  }): Observable<any> {
    const result = new BehaviorSubject<any>(null);
    super.post('/' + suffixPath, body, {
      params,
      needToken: true,
    }).subscribe((res: any) => {
      console.log('res.type', res.type);
      if (!res.flag) {
        console.log(res.message);

        Notiflix.Notify.Failure(res.message);
        if (errorSelector && errorSelector !== '') {
          Notiflix.Block.Remove(errorSelector);
        }
        result.next(res);
      } else {
        result.next(res);
      }
    }, error => {
      if (errorSelector && errorSelector !== '') {
        Notiflix.Block.Remove(errorSelector);
      }
      this.showErrorMessage(error);
    });
    return result.asObservable();
  }

  putCheckService(suffixPath: string, body: any, errorSelector?: string, params?: {
    [param: string]: string | boolean| boolean | ReadonlyArray<string>;
  }): Observable<any> {
    const result = new BehaviorSubject<any>(null);
    super.put('/' + suffixPath, body, {
      params,
      needToken: true,
    }).subscribe((res: any) => {
      if (!res.flag) {
        console.log(res.message);

        Notiflix.Notify.Failure(res.message);
        if (errorSelector && errorSelector !== '') {
          Notiflix.Block.Remove(errorSelector);
        }
        result.next(res);
      } else {
        result.next(res);
      }
    }, error => {
      console.log('', error);
      this.showErrorMessage(error);
    });
    return result.asObservable();
  }

  getCheckService(suffixPath: string, errorSelector?: string, params?: {
    [param: string]: string | ReadonlyArray<string>;
  }): Observable<any> {
    const result = new BehaviorSubject<any>(null);
    super.get('/' + suffixPath, {
      params,
      needToken: true,
    }).subscribe((res: any) => {
      if (!res.flag) {
        console.log(res.message);

        Notiflix.Notify.Failure(res.message);
        if (errorSelector && errorSelector !== '') {
          Notiflix.Block.Remove(errorSelector);
        }
        result.next(res);
      } else {
        result.next(res);
      }
    }, error => {
      if (errorSelector && errorSelector !== '') {
        Notiflix.Block.Remove(errorSelector);
      }
      this.showErrorMessage(error);
    });
    return result.asObservable();
  }

  deleteCheckService(suffixPath: string, errorSelector?: string, params?: {
    [param: string]: string | ReadonlyArray<string>;
  }): Observable<any> {
    const result = new BehaviorSubject<any>(null);
    super.delete('/' + suffixPath, {
      params,
      needToken: true,
    }).subscribe((res: any) => {
      if (!res.flag) {
        console.log(res.message);

        Notiflix.Notify.Failure(res.message);
        if (errorSelector && errorSelector !== '') {
          Notiflix.Block.Remove(errorSelector);
        }
        result.next(res);
      } else {
        result.next(res);
      }
    }, error => {
      if (errorSelector && errorSelector !== '') {
        Notiflix.Block.Remove(errorSelector);
      }
      this.showErrorMessage(error);
    });
    return result.asObservable();
  }

  showErrorMessage(error: { status: any; error: { type: string; message: any; }; }) {
    console.log('', error);
    switch (error.status) {
      case 500:
        Notiflix.Notify.Failure('اتصال اینترنتی خود را بررسی نموده و دوباره تلاش کنید.');
        break;
      case 0:
        Notiflix.Notify.Failure('اتصال اینترنتی خود را بررسی نمایید.');
        break;
      case 404:
        Notiflix.Notify.Failure('خطا در دسترسی به سرور(۴۰۴)');
        break;
      case 400:
        console.log('errrrroor', error.error);
        if (Tools.isNullOrUndefined(error.error) || error.error.type !== 'CUSTOM_EX') {
          Notiflix.Notify.Failure('اطلاعات وارد شده صحیح نمی باشد، لطفا بررسی و اصلاح نمائید.');
        } else {
          Notiflix.Notify.Failure(error.error.message);
        }
        break;
      case 401:
        setTimeout(() => {
          localStorage.clear();
          sessionStorage.clear();
          // this.router.navigate(['/']);
          // location.href = '//' + location.hostname + ':' + location.port + '#/signin';
          location.href = '//' + location.hostname + ':' + location.port;
          Notiflix.Notify.Failure('برای استفاده از امکانات سایت مجددا وارد حساب کاربری خود شوید.');
        }, 20);
        break;
      case 403:
        Notiflix.Notify.Failure('دسترسی شما به این سرویس محدود می باشد.');
        setTimeout(() => {
          localStorage.clear();
          sessionStorage.clear();
          // this.router.navigate(['/']);
          // location.href = '//' + location.hostname + ':' + location.port + '#/signin';
          location.href = '//' + location.hostname + ':' + location.port;
          Notiflix.Notify.Failure('برای استفاده از امکانات سایت مجددا وارد حساب کاربری خود شوید.');
        }, 20);
        break;
      case 405:
        Notiflix.Notify.Failure('<strong>خطا ۴۰۵</strong> متد غیر مجاز.');
        break;
    }
  }
}
