import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CrudActionComponent} from './_component/crud-action/crud-action.component';
import {CrudPaginationComponent} from './_component/crud-pagination/crud-pagination.component';
import {CrudSearchComponent} from './_component/crud-search/crud-search.component';
import {CrudUpsertComponent} from './_component/crud-upsert/crud-upsert.component';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {I18nModule} from '../i18n/i18n.module';
import {NgSelectModule} from '@ng-select/ng-select';
import {PaginationModule} from 'ngx-bootstrap/pagination';
import {QueryParamService} from './_service/query-param.service';


@NgModule({
  declarations: [CrudActionComponent,  CrudPaginationComponent, CrudSearchComponent, CrudUpsertComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    I18nModule,
    NgSelectModule,
    PaginationModule
  ],
  exports: [CrudActionComponent,  CrudPaginationComponent, CrudSearchComponent, CrudUpsertComponent],
  providers: [QueryParamService]

})
export class CrudModule {
}
