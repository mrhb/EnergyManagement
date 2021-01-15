import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PaginatorComponent} from './paginator.component';
import {MatPaginatorIntlGerman} from './matPaginatorIntlGerman';
import {MatPaginatorIntl, MatPaginatorModule} from '@angular/material/paginator';

@NgModule({
  declarations: [PaginatorComponent],
  imports: [
    CommonModule,
    MatPaginatorModule,
  ],
  exports: [
    PaginatorComponent
  ],
  providers: [
    {
      provide: MatPaginatorIntl,
      useClass: MatPaginatorIntlGerman
    }
  ]
})
export class PaginatorModule {
}
