import {Injectable} from '@angular/core';
import {GeneralService} from '../../../../../_base/service/_service/general.service';
import {HttpClient} from '@angular/common/http';
import {GATEWAY_URL} from '../../../../../_base/service/model/rest-constants';
import {Observable} from 'rxjs';

@Injectable()
export class RegionService extends GeneralService {

  constructor(public http: HttpClient) {
    super(http);
    this.prefixPath = GATEWAY_URL + '/api/region';
  }

  getOne(parentId, errorSelector?: string): Observable<any> {
    return super.getCheckService('get-list-by-parent-id/' + parentId, errorSelector);
  }

}
