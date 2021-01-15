// tslint:disable-next-line:no-namespace
import {CacheModel} from '../../cache/model/cache-model';
import CacheType = CacheModel.CacheType;

export class RestOptions {
  constructor() {
  }

  /**
   * Token
   */
  needToken?: boolean;
  tokenKey?: string;
  /**
   * Params
   */
  params?: {
    [param: string]: string | boolean | ReadonlyArray<string> | ReadonlyArray<boolean>;
  };
  /**
   * Headers
   */
  headers?: string | {
    [name: string]: string | string[];
  };
  replaceOrAppendHeader?: boolean; // true replace, false append

  public static newInstance(): RestOptions {
    const ro = new RestOptions();
    ro.needToken = true;
    return ro;
  }
}
