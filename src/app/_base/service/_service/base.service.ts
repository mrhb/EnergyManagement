import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import {RestOptions} from '../model/rest-options';
import {observable, Observable, of, PartialObserver, Subscription, throwError} from 'rxjs';
import {CacheService} from '../../cache/_service/cache.service';
import {DEFAULT_HTTP_HEADERS, TOKEN_CACHE_KEY, TOKEN_HEADER_NAME, TOKEN_PREFIX} from '../model/rest-constants';
import {catchError, map, tap} from "rxjs/operators";

export class BaseService {
  prefixPath: string | undefined;
  private token: string | undefined;

  constructor(public http: HttpClient) {
  }


  get(suffixPath: string, options?: RestOptions): Observable<any> {
    return this.http.get(this.prefixPath + suffixPath, this.getOption(options));
  }

  post(suffixPath: string, body: any, options?: RestOptions): Observable<any> {
    return this.http.post(this.prefixPath + suffixPath, body, this.getOption(options)).pipe(
      catchError(this.handleError)
    );
  }


  postFile(suffixPath: string, body: any, options?: RestOptions): Observable<any> {
    return this.http.post( suffixPath, body, this.getOption(options)).pipe(
      catchError(this.handleError)
    );
  }

  put(suffixPath: string, body: any, options?: RestOptions): Observable<any> {
    return this.http.put(this.prefixPath + suffixPath, body, this.getOption(options));
  }

  delete(suffixPath: string, options?: RestOptions): Observable<any> {
    return this.http.delete(this.prefixPath + suffixPath, this.getOption(options));
  }

  /**
   * Generate http service options
   * @param options
   * @private
   */
  private getOption(options?: RestOptions): any {
    // Default values
    if (options === null || options === undefined) {
      options = RestOptions.newInstance();
    }
    if (options.needToken === null || options.needToken === undefined) {
      options.needToken = true;
    }

    // @ts-ignore
    const httpParams: HttpParams = new HttpParams({fromObject: options.params});
    const httpHeaders: HttpHeaders = this.getHeader(options);
    return {
      headers: httpHeaders ? httpHeaders : null,
      params: httpParams ? httpParams : null
    };
  }

  /**
   *
   * @param needToken
   * @param headers
   * @param replaceHeader: true replace, false is append
   * @private
   */
  private getHeader(options: RestOptions): HttpHeaders {

    // this.token = CacheService.getLocalStorage(TOKEN_CACHE_KEY);
    this.token = localStorage.getItem(TOKEN_CACHE_KEY);
    let result = new HttpHeaders();
    console.log(' options.headers', options.headers);
    if (options.headers === null || options.headers === undefined) {
      result = DEFAULT_HTTP_HEADERS;
    } else {
      if (options.replaceOrAppendHeader === null || options.replaceOrAppendHeader === undefined) {
        result = DEFAULT_HTTP_HEADERS;
      } else if (options.replaceOrAppendHeader) {
        result = new HttpHeaders(options.headers);
      } else if (!options.replaceOrAppendHeader) {
        result = DEFAULT_HTTP_HEADERS;
        for (const key of new HttpHeaders(options.headers).keys()) {
          const h = new HttpHeaders(options.headers).getAll(key);
          if (h !== null) {
            result = result.append(key, h);
          }
        }
      }
    }
    if (options.needToken !== null && options.needToken !== undefined && options.needToken) {

      if (options.tokenKey !== null && options.tokenKey !== undefined && options.tokenKey.length > 1) {
        result = result.append(TOKEN_HEADER_NAME, TOKEN_PREFIX + CacheService.getLocalStorage(options.tokenKey));
        result.set(TOKEN_HEADER_NAME, TOKEN_PREFIX + CacheService.getLocalStorage(options.tokenKey));
      } else {
        result = result.append(TOKEN_HEADER_NAME, TOKEN_PREFIX + this.token);
      }
    }
    return result;
  }



  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';

    // console.log(errorMessage);
    console.log(error);
    // if (error.error instanceof ErrorEvent) {
    //   // Client-side errors
    //   errorMessage = `Error: ${error.error.message}`;
    // } else {
    //   // Server-side errors
    //   errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    // }
    // window.alert(errorMessage);
    return throwError(error);
  }


}
