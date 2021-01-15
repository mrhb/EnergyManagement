import {Injectable} from '@angular/core';
import {I18N} from '../model/i18n';

@Injectable({
  providedIn: 'root'
})
export class I18NService {

  constructor() {
  }

  private defaultLng: I18N.Lng = I18N.Lng.FA;

  private i18n: I18N.I18NModel = new I18N.I18NModel(
    new Array<I18N.LngDir>(
      new I18N.LngDir(I18N.Lng.EN, I18N.Dir.ltr),
      new I18N.LngDir(I18N.Lng.FA, I18N.Dir.rtl)
    ),
    new Array<I18N.KeyValue>(
      new I18N.KeyValue('crud.upsert.create.header.title',
        new Array<I18N.LngValue>(
          new I18N.LngValue(I18N.Lng.EN, 'Create'),
          new I18N.LngValue(I18N.Lng.FA, 'ایجاد')
        )
      ),
      new I18N.KeyValue('crud.upsert.create.title',
        new Array<I18N.LngValue>(
          new I18N.LngValue(I18N.Lng.EN, 'Create'),
          new I18N.LngValue(I18N.Lng.FA, 'ایجاد')
        )
      ),
      new I18N.KeyValue('crud.upsert.update.header.title',
        new Array<I18N.LngValue>(
          new I18N.LngValue(I18N.Lng.EN, 'Edit'),
          new I18N.LngValue(I18N.Lng.FA, 'ویرایش')
        )
      ),
      new I18N.KeyValue('crud.upsert.update.title',
        new Array<I18N.LngValue>(
          new I18N.LngValue(I18N.Lng.EN, 'Edit'),
          new I18N.LngValue(I18N.Lng.FA, 'ویرایش')
        )
      ),
      new I18N.KeyValue('crud.upsert.back.title',
        new Array<I18N.LngValue>(
          new I18N.LngValue(I18N.Lng.EN, 'Back'),
          new I18N.LngValue(I18N.Lng.FA, 'برگشت')
        )
      ),
      new I18N.KeyValue('crud.upsert.create.title',
        new Array<I18N.LngValue>(
          new I18N.LngValue(I18N.Lng.EN, 'Create'),
          new I18N.LngValue(I18N.Lng.FA, 'ایجاد')
        )
      ),
      new I18N.KeyValue('crud.search.title',
        new Array<I18N.LngValue>(
          new I18N.LngValue(I18N.Lng.EN, 'Search'),
          new I18N.LngValue(I18N.Lng.FA, 'جستجو')
        )
      ),
      new I18N.KeyValue('crud.search.search.title',
        new Array<I18N.LngValue>(
          new I18N.LngValue(I18N.Lng.EN, 'Search'),
          new I18N.LngValue(I18N.Lng.FA, 'جستجو')
        )
      )
    )
  );

  get(key: string): string {
    for (const kv of this.i18n.keyValueList) {
      if (kv.key === key) {
        for (const lv of kv.lngValueList) {
          if (lv.lng === this.defaultLng) {
            return lv.value;
          }
        }
      }
    }
    return null;
  }

  getDir(): string {
    for (const ld of this.i18n.lngDirList) {
      if (ld.lng === this.defaultLng) {
        return ld.dir.toString();
      }
    }
    return null;
  }
}
