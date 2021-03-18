import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class StateService {
  public region: BehaviorSubject<string>=new BehaviorSubject<string>("خراسان");

  constructor() { 
  }
}
