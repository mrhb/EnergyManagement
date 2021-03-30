import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class StateService {
  public region: BehaviorSubject<string>=new BehaviorSubject<string>("خراسان");
  public regionId: BehaviorSubject<string>=new BehaviorSubject<string>("000000000000000000000000");

  constructor() { 
  }
}
