import {Injectable} from '@angular/core';
import {CacheModel} from '../model/cache-model';
import {Observable} from 'rxjs';
import CacheType = CacheModel.CacheType;


@Injectable({
  providedIn: 'root'
})
export class CacheService {

  /*
   * Simple
   */
  private static inmemory: Array<CacheModel.KeyValue> = new Array<CacheModel.KeyValue>();

  private static sessionStorage: Array<CacheModel.KeyValue> = new Array<CacheModel.KeyValue>();
  private static sessionStorageKeyList: Array<string> = new Array<string>();

  private static localStorage: Array<CacheModel.KeyValue> = new Array<CacheModel.KeyValue>();
  private static localStorageKeyList: Array<string> = new Array<string>();

  /*
   * Observable
   */
  private static inmemoryObservable: Array<CacheModel.KeyValueObservable> = new Array<CacheModel.KeyValueObservable>();

  private static sessionStorageObservable: Array<CacheModel.KeyValueObservable> = new Array<CacheModel.KeyValueObservable>();
  private static sessionStorageObservableKeyList: Array<string> = new Array<string>();


  private static localStorageObservable: Array<CacheModel.KeyValueObservable> = new Array<CacheModel.KeyValueObservable>();
  private static localStorageObservableKeyList: Array<string> = new Array<string>();


  constructor() {
    CacheService.init();
  }

  // tslint:disable-next-line:typedef
  public static init() {
    /**
     * Local Storage Loading
     */
    CacheService.localStorageKeyList = JSON.parse(localStorage.getItem(CacheModel.Key.CACHE_KEY_LIST.toString())|| '[]');
    if (CacheService.localStorageKeyList === null || CacheService.localStorageKeyList === undefined) {
      CacheService.localStorageKeyList = new Array<string>();
    }
    CacheService.localStorageKeyList.forEach(key => {
      CacheService.localStorage.push(new CacheModel.KeyValue(key, JSON.parse(localStorage.getItem(key) || '[]')));
    });


    // @ts-ignore
    /**
     * Session Storage Loading
     */
    CacheService.sessionStorageKeyList = JSON.parse(sessionStorage.getItem(CacheModel.Key.CACHE_KEY_LIST.toString()) || '[]');
    if (CacheService.sessionStorageKeyList === null || CacheService.sessionStorageKeyList === undefined) {
      CacheService.sessionStorageKeyList = new Array<string>();
    }
    CacheService.sessionStorageKeyList.forEach(key => {
      // @ts-ignore
      return CacheService.sessionStorage.push(new CacheModel.KeyValue(key, JSON.parse(sessionStorage.getItem(key))));
    });

    /**
     * In Memory Loading
     */
    CacheService.inmemory = new Array<CacheModel.KeyValue>();


    /**
     * Local Storage Observable Loading
     */
    CacheService.localStorageObservableKeyList = JSON.parse(localStorage.getItem(CacheModel.Key.CACHE_OBSERVABLE_KEY_LIST.toString()) || '[]');
    if (CacheService.localStorageObservableKeyList === null || CacheService.localStorageObservableKeyList === undefined) {
      CacheService.localStorageObservableKeyList = new Array<string>();
    }
    CacheService.localStorageObservableKeyList.forEach(key => {
      return CacheService.localStorageObservable.push(new CacheModel.KeyValueObservable(key, JSON.parse(localStorage.getItem(key) || '[]')));
    });


    /**
     * Session Storage Observable Loading
     */
    CacheService.sessionStorageObservableKeyList = JSON.parse(sessionStorage.getItem(CacheModel.Key.CACHE_OBSERVABLE_KEY_LIST.toString()) || '[]');
    if (CacheService.sessionStorageObservableKeyList === null || CacheService.sessionStorageObservableKeyList === undefined) {
      CacheService.sessionStorageObservableKeyList = new Array<string>();
    }
    CacheService.sessionStorageObservableKeyList.forEach(key => {
      return CacheService.sessionStorageObservable.push(new CacheModel.KeyValueObservable(key, JSON.parse(sessionStorage.getItem(key) || '[]')));
    });

    /**
     * In Memory Observable Loading
     */
    CacheService.inmemoryObservable = new Array<CacheModel.KeyValueObservable>();
  }

  /**
   * Set key list
   *
   */
  private static setLocalStorageKeyList(key: string): void {
    CacheService.localStorageKeyList.push(key);
    localStorage.setItem(CacheModel.Key.CACHE_KEY_LIST.toString(), JSON.stringify(CacheService.localStorageKeyList));
  }

  private static setSessionStorageKeyList(key: string): void {
    CacheService.sessionStorageKeyList.push(key);
    sessionStorage.setItem(CacheModel.Key.CACHE_KEY_LIST.toString(), JSON.stringify(CacheService.sessionStorageKeyList));
  }

  private static setLocalStorageObservableKeyList(key: string): void {
    CacheService.localStorageObservableKeyList.push(key);
    localStorage.setItem(CacheModel.Key.CACHE_OBSERVABLE_KEY_LIST.toString(), JSON.stringify(CacheService.localStorageObservableKeyList));
  }

  private static setSessionStorageObservableKeyList(key: string): void {
    CacheService.sessionStorageObservableKeyList.push(key);
    sessionStorage.setItem(CacheModel.Key.CACHE_OBSERVABLE_KEY_LIST.toString(), JSON.stringify(CacheService.sessionStorageObservableKeyList));
  }

  /**
   * All Getter and Setter
   */
  public static get(key: string, cacheType: CacheType): any {
    if (cacheType === CacheType.IN_MEMORY) {
      return CacheService.getInMemory(key);
    } else if (cacheType === CacheType.SESSION_STORAGE) {
      return CacheService.getSessionStorage(key);
    } else if (cacheType === CacheType.LOCAL_STORAGE) {
      return CacheService.getLocalStorage(key);
    }
  }

  public static set(key: string, value: any, cacheType: CacheType): void {
    if (cacheType === CacheType.IN_MEMORY) {
      CacheService.setInMemory(key, value);
    } else if (cacheType === CacheType.SESSION_STORAGE) {
      CacheService.setSessionStorage(key, value);
    } else if (cacheType === CacheType.LOCAL_STORAGE) {
      CacheService.setLocalStorage(key, value);
    }
  }

  public static remove(key: string, cacheType: CacheType): void {
    if (cacheType === CacheType.IN_MEMORY) {
      CacheService.removeInMemory(key);
    } else if (cacheType === CacheType.SESSION_STORAGE) {
      CacheService.removeSessionStorage(key);
    } else if (cacheType === CacheType.LOCAL_STORAGE) {
      CacheService.removeLocalStorage(key);
    }
  }

  // @ts-ignore
  public static exist(key: string, cacheType: CacheType): boolean {
    if (cacheType === CacheType.IN_MEMORY) {
      return CacheService.existInMemory(key);
    } else if (cacheType === CacheType.SESSION_STORAGE) {
      return CacheService.existSessionStorage(key);
    } else if (cacheType === CacheType.LOCAL_STORAGE) {
      return CacheService.existLocalStorage(key);
    }
  }

  // @ts-ignore
  public static getObservable(key: string, cacheType: CacheType): Observable<any> {
    if (cacheType === CacheType.IN_MEMORY) {
      return CacheService.getInMemoryObservable(key);
    } else if (cacheType === CacheType.SESSION_STORAGE) {
      return CacheService.getSessionStorageObservable(key);
    } else if (cacheType === CacheType.LOCAL_STORAGE) {
      return CacheService.getLocalStorageObservable(key);
    }
  }

  public static setObservable(key: string, value: any, cacheType: CacheType): void {
    if (cacheType === CacheType.IN_MEMORY) {
      CacheService.setInMemoryObservable(key, value);
    } else if (cacheType === CacheType.SESSION_STORAGE) {
      CacheService.setSessionStorageObservable(key, value);
    } else if (cacheType === CacheType.LOCAL_STORAGE) {
      CacheService.setLocalStorageObservable(key, value);
    }
  }

  // @ts-ignore
  public static existObservable(key: string, cacheType: CacheType): boolean {
    if (cacheType === CacheType.IN_MEMORY) {
      return CacheService.existInMemoryObservable(key);
    } else if (cacheType === CacheType.SESSION_STORAGE) {
      return CacheService.existSessionStorageObservable(key);
    } else if (cacheType === CacheType.LOCAL_STORAGE) {
      return CacheService.existLocalStorageObservable(key);
    }
  }

  /**
   * Local Storage Getter and Setter
   */
  public static getLocalStorage(key: string): any {
    for (const item of CacheService.localStorage) {
      if (item.key === key) {
        return item.value;
      }
    }
    CacheService.setLocalStorage(key, null);
    return CacheService.getLocalStorage(key);
  }

  public static setLocalStorage(key: string, value: any): void {
    if (CacheService.existArray(CacheService.localStorageKeyList, key)) {
      for (let i = 0; i < CacheService.localStorage.length; i++) {
        if (CacheService.localStorage[i].key === key) {
          CacheService.localStorage[i].value = value;
          break;
        }
      }
    } else {
      CacheService.setLocalStorageKeyList(key);
      CacheService.localStorage.push(new CacheModel.KeyValue(key, value));
    }
    localStorage.setItem(key, JSON.stringify(value));
  }

  public static removeLocalStorage(key: string): void {
    for (let i = 0; i < CacheService.localStorageKeyList.length; i++) {
      if (CacheService.localStorageKeyList[i] === key) {
        CacheService.localStorageKeyList.splice(i, 1);
        break;
      }
    }

    for (let i = 0; i < CacheService.localStorage.length; i++) {
      if (CacheService.localStorage[i].key === key) {
        CacheService.localStorage.splice(i, 1);
        break;
      }
    }

    localStorage.removeItem(key);
  }

  public static existLocalStorage(key: string): boolean {
    return CacheService.existArray(CacheService.localStorageKeyList, key);
  }


  /**
   * Session Storage Setter And Getter
   */
  public static getSessionStorage(key: string): any {
    for (const item of CacheService.sessionStorage) {
      if (item.key === key) {
        return item.value;
      }
    }
    CacheService.setSessionStorage(key, null);
    return CacheService.getSessionStorage(key);
  }

  public static setSessionStorage(key: string, value: any): void {
    if (CacheService.existArray(CacheService.sessionStorageKeyList, key)) {
      for (let i = 0; i < CacheService.sessionStorage.length; i++) {
        if (CacheService.sessionStorage[i].key === key) {
          CacheService.sessionStorage[i].value = value;
          break;
        }
      }
    } else {
      CacheService.setSessionStorageKeyList(key);
      CacheService.sessionStorage.push(new CacheModel.KeyValue(key, value));
    }
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  public static removeSessionStorage(key: string): void {
    for (let i = 0; i < CacheService.sessionStorageKeyList.length; i++) {
      if (CacheService.sessionStorageKeyList[i] === key) {
        CacheService.sessionStorageKeyList.splice(i, 1);
        break;
      }
    }

    for (let i = 0; i < CacheService.sessionStorage.length; i++) {
      if (CacheService.sessionStorage[i].key === key) {
        CacheService.sessionStorage.splice(i, 1);
        break;
      }
    }

    sessionStorage.removeItem(key);
  }

  public static existSessionStorage(key: string): boolean {
    return CacheService.existArray(CacheService.sessionStorageKeyList, key);
  }

  /**
   * In Memory Setter And Getter
   */
  public static getInMemory(key: string): any {
    for (const item of CacheService.inmemory) {
      if (item.key === key) {
        return item.value;
      }
    }
    CacheService.setInMemory(key, null);
    return CacheService.getInMemory(key);
  }

  public static setInMemory(key: string, value: any): void {
    for (let i = 0; i < CacheService.inmemory.length; i++) {
      if (CacheService.inmemory[i].key === key) {
        CacheService.inmemory[i].value = value;
        return;
      }
    }
    CacheService.inmemory.push(new CacheModel.KeyValue(key, value));
  }

  public static removeInMemory(key: string): void {
    for (let i = 0; i < CacheService.inmemory.length; i++) {
      if (CacheService.inmemory[i].key === key) {
        CacheService.inmemory.splice(i, 1);
        break;
      }
    }
  }

  public static existInMemory(key: string): boolean {
    for (let i = 0; i < CacheService.inmemory.length; i++) {
      if (CacheService.inmemory[i].key === key) {
        return true;
      }
    }
    return false;
  }


  /**
   * Local Storage Observable Setter And Getter
   */
  public static getLocalStorageObservable(key: string): Observable<any> {
    for (const item of CacheService.localStorageObservable) {
      if (item.key === key) {
        return item.value;
      }
    }
    CacheService.setLocalStorageObservable(key, null);
    return CacheService.getLocalStorageObservable(key);
  }

  public static setLocalStorageObservable(key: string, value: any): void {
    if (CacheService.existArray(CacheService.localStorageObservableKeyList, key)) {
      for (let i = 0; i < CacheService.localStorageObservable.length; i++) {
        if (CacheService.localStorageObservable[i].key === key) {
          CacheService.localStorageObservable[i].value.next(value);
          break;
        }
      }
    } else {
      CacheService.setLocalStorageObservableKeyList(key);
      CacheService.localStorageObservable.push(new CacheModel.KeyValueObservable(key, value));
    }
    localStorage.setItem(key, JSON.stringify(value));
  }

  public static existLocalStorageObservable(key: string): boolean {
    return CacheService.existArray(CacheService.localStorageObservableKeyList, key);
  }

  /**
   * Session Storage Observable Setter And Getter
   */
  public static getSessionStorageObservable(key: string): Observable<any> {
    for (const item of CacheService.sessionStorageObservable) {
      if (item.key === key) {
        return item.value;
      }
    }
    CacheService.setSessionStorageObservable(key, null);
    return CacheService.getSessionStorageObservable(key);
  }

  public static setSessionStorageObservable(key: string, value: any): void {
    if (CacheService.existArray(CacheService.sessionStorageObservableKeyList, key)) {
      for (let i = 0; i < CacheService.sessionStorageObservable.length; i++) {
        if (CacheService.sessionStorageObservable[i].key === key) {
          CacheService.sessionStorageObservable[i].value.next(value);
          break;
        }
      }
    } else {
      CacheService.setSessionStorageObservableKeyList(key);
      CacheService.sessionStorageObservable.push(new CacheModel.KeyValueObservable(key, value));
    }
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  public static existSessionStorageObservable(key: string): boolean {
    return CacheService.existArray(CacheService.sessionStorageObservableKeyList, key);
  }

  /**
   * In Memory Observable Setter And Getter
   */
  public static getInMemoryObservable(key: string): Observable<any> {
    for (const item of CacheService.inmemoryObservable) {
      if (item.key === key) {
        return item.value;
      }
    }
    CacheService.setInMemoryObservable(key, null);
    return CacheService.getInMemoryObservable(key);
  }

  public static setInMemoryObservable(key: string, value: any): void {
    for (let i = 0; i < CacheService.inmemoryObservable.length; i++) {
      if (CacheService.inmemoryObservable[i].key === key) {
        CacheService.inmemoryObservable[i].value.next(value);
        return;
      }
    }
    CacheService.inmemoryObservable.push(new CacheModel.KeyValueObservable(key, value));
  }

  public static existInMemoryObservable(key: string): boolean {
    for (let i = 0; i < CacheService.inmemoryObservable.length; i++) {
      if (CacheService.inmemoryObservable[i].key === key) {
        return true;
      }
    }
    return false;
  }

  private static existArray(list: Array<string>, key: string): boolean {
    for (const item of list) {
      if (item === key) {
        return true;
      }
    }
    return false;
  }
}
