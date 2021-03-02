import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit, OnChanges {
  @Input('matPaginator') matPaginator = true;
  @Input('totalElements') totalElements: number;
  @Input('totalPages') totalPages: number;
  @Input('pageSize') pageSize: number;
  @Input('pageIndex') pageIndex: number;
  @Input('pageSizeOptions') pageSizeOptions: number[];
  @Input('showFirstLastButtons') showFirstLastButtons: boolean;
  @Output('page') private page = new EventEmitter<any>();

  listPage = [];

  constructor() {

    // this.totalPages = Array(5).fill(0).map((x, i) => i);
  }

  ngOnInit() {
    // console.log('page', this.page);
    console.log('ngOnInit pageIndex', this.pageIndex);
    this.returnTotalPage();
  }

  changePage(event) {
    console.log('event', event);
    this.page.emit(event);
  }

  changePagination(index: number): void {
    if (index === this.pageIndex || index > this.totalPages || index < 0) {
      return;
    }

    const event = {
      length: this.totalElements,
      pageIndex: index,
      pageSize: this.pageSize,
    };
    console.log('index', index);
    this.page.emit(event);
  }

  returnTotalPage(): number[] {
    this.listPage = [];
    for (let i = 1; i <= this.totalPages; i++) {
      this.listPage.push(i);
    }

    return this.listPage;
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('pageIndex', this.pageIndex);
    this.returnTotalPage();
  }
}
