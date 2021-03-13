import {Pipe, PipeTransform} from '@angular/core';
import {I18NService} from '../_service/i18n.service';

@Pipe({
  name: 'i18ndir'
})
export class I18nDirPipe implements PipeTransform {

  constructor(private i18nService: I18NService) {
  }

  transform(key?: string): string {
    return this.i18nService.getDir();
  }

}
