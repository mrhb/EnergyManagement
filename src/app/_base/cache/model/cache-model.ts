import {BehaviorSubject} from 'rxjs';
// tslint:disable-next-line:no-namespace
export namespace CacheModel {
  export class KeyValue {
    constructor(key: string, value: any) {
      this.key = key;
      this.value = value;
    }

    key: string;
    value: any;
  }

  export class KeyValueObservable {
    constructor(key: string, value: any) {
      this.key = key;
      // this.value = of<any>(value);
      this.value = new BehaviorSubject<any>(value);
    }

    key: string;
    value = new BehaviorSubject<any>(null);
  }

  export enum CacheType {
    IN_MEMORY = 'IN_MEMORY', LOCAL_STORAGE = 'LOCAL_STORAGE', SESSION_STORAGE = 'SESSION_STORAGE'
  }

  export enum Key {
    CACHE_KEY_LIST = 'CACHE_KEY_LIST', CACHE_OBSERVABLE_KEY_LIST = 'CACHE_OBSERVABLE_KEY_LIST'
  }
}
