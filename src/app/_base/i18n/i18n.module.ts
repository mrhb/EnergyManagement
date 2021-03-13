import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {I18nPipe} from './_pipe/i18n.pipe';
import {I18NService} from './_service/i18n.service';
import {I18nDirPipe} from './_pipe/i18n-dir.pipe';


@NgModule({
  declarations: [I18nPipe, I18nDirPipe],
  imports: [
    CommonModule
  ],
  exports: [
    I18nPipe, I18nDirPipe
  ],
  providers: [I18NService]
})
export class I18nModule {
}
