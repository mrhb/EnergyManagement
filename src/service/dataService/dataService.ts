import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DataService {
////////////   account ////////////
  public static account = new BehaviorSubject<any>('');
  public static getAccount = DataService.account.asObservable();

  public static setAccount(value: any) {
    DataService.account.next(value);
  }
}
