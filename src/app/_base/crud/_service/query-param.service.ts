import {Injectable} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QueryParamService {

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute) {
  }


  set(params: Params): void {
    // Convert Object to Key Value Array
    const arrayOfParams = Object.keys(params).map((k) => {
      return {key: k, value: params[k]};
    });

    // Convert Key Value Array To Object
    const queryParams = {};
    arrayOfParams.forEach(function(data) {
      if (data.value !== undefined && data.value !== null) {
        queryParams[data.key] = data.value;
      }
    });

    this.router.navigate([window.location.hash.split('#/')[1].split('?')[0]], {
      queryParams,
      queryParamsHandling: 'merge'
    });
  }


  get(): Observable<Params> {
    return this.activatedRoute.queryParams;
  }
}
