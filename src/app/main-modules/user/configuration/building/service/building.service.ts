import { Injectable } from '@angular/core';
import {GeneralService} from '../../../../../_base/service/_service/general.service';
import {HttpClient} from '@angular/common/http';
import {GATEWAY_URL} from '../../../../../_base/service/model/rest-constants';
import {Observable} from 'rxjs';

@Injectable()
export class BuildingService extends GeneralService {
  [x: string]: any;

  constructor(public http: HttpClient) {
    super(http);
    this.prefixPath = GATEWAY_URL + '/api/building';
  }

  createBuilding(body: any, errorSelector?: string): Observable<any> {
    return super.postCheckService('create-building', body, errorSelector);
  }

  updateBuilding(param: {id: string}, body: any, errorSelector?: string): Observable<any> {
    return super.putCheckService('update', body, errorSelector, param);
  }

  createArea(param: {id: string}, body: any, errorSelector?: string): Observable<any> {
    return super.putCheckService('update-area', body, errorSelector, param);
  }

  createSpace(param: {id: string}, body: any, errorSelector?: string): Observable<any> {
    return super.postCheckService('create-space', body, errorSelector, param);
  }

  updateSpace(param: {id: string}, body: any, errorSelector?: string): Observable<any> {
    return super.putCheckService('update-space', body, errorSelector, param);
  }

  deleteSpace(param: {id: string, spaceId: string}, errorSelector?: string): Observable<any> {
    return super.deleteCheckService('delete-space', errorSelector, param);
  }

  createMap(param: {id: string}, body: any, errorSelector?: string): Observable<any> {
    return super.postCheckService('create-map-information', body, errorSelector, param);
  }

  deleteMap(param: {id: string, mapId: string}, errorSelector?: string): Observable<any> {
    return super.deleteCheckService('delete-map-information', errorSelector, param);
  }
  updateMap(param: {id: string}, body: any, errorSelector?: string): Observable<any> {
    return super.putCheckService('update-map-information', body, errorSelector, param);
  }

  updateWallInformation(param: {id: string}, body: any, errorSelector?: string): Observable<any> {
    return super.putCheckService('update-wall-information', body, errorSelector, param);
  }

  getBuildingList(param: any, regionId: any, errorSelector?: string): Observable<any> {
    return super.postCheckService('get-building-list-pageable-by-filter', regionId, errorSelector, param);
  }

  deleteBuilding(param: {id: string}, errorSelector?: string): Observable<any> {
    return super.deleteCheckService('delete', errorSelector, param);
  }

  getOneBuilding(param: {id: string}, errorSelector?: string): Observable<any> {
    return super.getCheckService('get-one', errorSelector, param);
  }

  getListBuilding(param, errorSelector?: string): Observable<any> {
    return super.getCheckService('get-list-pageable-by-term', errorSelector, param);
  }

  getListBuildingForSelection(param, errorSelector?: string): Observable<any> {
    return super.getCheckService('get-list-pageable-by-term-for-selection', errorSelector, param);
  }
}
