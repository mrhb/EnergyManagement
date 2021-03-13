// tslint:disable-next-line:no-namespace
export namespace I18N {
  export class I18NModel {
    constructor(lngDirList: Array<LngDir>, keyValueList: Array<KeyValue>) {
      this.lngDirList = lngDirList;
      this.keyValueList = keyValueList;
    }

    lngDirList: Array<LngDir> = new Array<I18N.LngDir>();
    keyValueList: Array<KeyValue> = new Array<I18N.KeyValue>();
  }

  export class LngDir {
    constructor(lng: Lng, dir: Dir) {
      this.lng = lng;
      this.dir = dir;
    }

    lng: Lng;
    dir: Dir;
  }

  export class LngValue {
    constructor(lng: Lng, value: string) {
      this.lng = lng;
      this.value = value;
    }

    lng: Lng;
    value: string;
  }

  export class KeyValue {
    constructor(key: string, lngValueList: Array<LngValue>) {
      this.key = key;
      this.lngValueList = lngValueList;
    }

    key: string;
    lngValueList: Array<LngValue> = new Array<I18N.LngValue>();
  }

  export enum Lng {
    EN, FA
  }

  export enum Dir {
    ltr = 'ltr', rtl = 'rtl'
  }
}
