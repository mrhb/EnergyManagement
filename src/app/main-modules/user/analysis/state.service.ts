import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  public region: BehaviorSubject<string>=new BehaviorSubject<string>("منطقه را انتخاب کنید");
  public regionId: BehaviorSubject<string>=new BehaviorSubject<string>("000000000000000000000000");

  constructor() { 
  }
}
