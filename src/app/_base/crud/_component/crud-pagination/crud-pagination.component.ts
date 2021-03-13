import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CrudModel} from '../../model/crud-model';
import {QueryParamService} from '../../_service/query-param.service';

@Component({
  selector: 'app-crud-pagination',
  templateUrl: './crud-pagination.component.html',
  styleUrls: ['./crud-pagination.component.sass']
})
export class CrudPaginationComponent implements OnInit {
  pagination: CrudModel.Pagination = new CrudModel.Pagination();
  @Output() public paginationChanged: EventEmitter<any> = new EventEmitter();
  @Output() public getParams: EventEmitter<any> = new EventEmitter();
  sizeListKeyValue: Array<any> = new Array<any>();

  constructor(private queryParamService: QueryParamService) {
    this.pagination.sizeList.forEach(size => {
      this.sizeListKeyValue.push({
        key: size,
        value: size
      });
    });
    this.queryParamService.get().subscribe(params => {
      this.pagination.totalElements = params.totalElements ? Number(params.totalElements) : this.pagination.totalElements;
      this.pagination.page = params.page ? Number(params.page) : this.pagination.page;
      this.pagination.size = params.size ? Number(params.size) : this.pagination.size;
    });
    this.navigate();
  }


  ngOnInit(): void {
    // this.queryParamService.get().subscribe(params => {
    //   this.pagination.totalElements = params.totalElements ? Number(params.totalElements) : this.pagination.totalElements;
    //   this.pagination.page = params.page ? Number(params.page) : this.pagination.page;
    //   this.pagination.size = params.size ? Number(params.size) : this.pagination.size;
    //   this.paginationChanged.emit(this.pagination);
    // });
    // this.getParams.emit('.');

  }

  navigate(): void {
    this.queryParamService.set({
      totalElements: this.pagination.totalElements,
      page: this.pagination.page,
      size: this.pagination.size
    });
  }

  changePage(event: any): void {
    this.pagination.page = event.page;
    this.navigate();
    console.log('changePagechangePage', this.pagination);
    this.paginationChanged.emit(this.pagination);
  }

  // onSelect(size: number): void {
  //   this.pagination.size = size;
  //   this.navigate();
  //   // this.paginationChanged.emit(this.pagination);
  // }

  setSizeKey(event: any): void {
    this.pagination.size = event.key;
    console.log('this.pagination', this.pagination);

    this.navigate();
    this.paginationChanged.emit(this.pagination);
  }
}
