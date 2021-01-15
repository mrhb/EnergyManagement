import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-crud-search',
  templateUrl: './crud-search.component.html',
  styleUrls: ['./crud-search.component.scss']
})
export class CrudSearchComponent implements OnInit {

  @Input() public title?: string;
  @Input() public searchTitle?: string;
  @Output() public searchFunc: EventEmitter<any> = new EventEmitter();

  term = '';

  constructor() {
  }

  ngOnInit(): void {
  }


  search(): void {
    this.searchFunc.emit(this.term);
  }
}
