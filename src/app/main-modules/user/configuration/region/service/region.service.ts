import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { GeneralService } from 'src/app/_base/service/_service/general.service';
import { GATEWAY_URL } from 'src/app/_base/service/model/rest-constants';

@Injectable({
  providedIn: 'root'
})
export class RegionService extends GeneralService {
    public region: BehaviorSubject<string>=new BehaviorSubject<string>("خراسان");
    public regionId: BehaviorSubject<string>=new BehaviorSubject<string>("000000000000000000000000");
    
    constructor(public http: HttpClient) {
      super(http);
      this.prefixPath = GATEWAY_URL + '/api/region';
    }
  
    getOne(parentId, errorSelector?: string): Observable<any> {
      return super.getCheckService('get-list-by-parent-id/' + parentId, errorSelector);
    }
  
  }
  