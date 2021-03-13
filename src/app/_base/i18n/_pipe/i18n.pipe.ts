import {Pipe, PipeTransform} from '@angular/core';
import {I18NService} from '../_service/i18n.service';

@Pipe({
  name: 'i18n'
})
export class I18nPipe implements PipeTransform {

  constructor(private i18nService: I18NService) {
  }

  transform(key: string): string {
    return this.i18nService.get(key);
  }

}
