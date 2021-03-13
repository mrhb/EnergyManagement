import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CrudModel} from '../../model/crud-model';

@Component({
  selector: 'app-crud-upsert',
  templateUrl: './crud-upsert.component.html',
  styleUrls: ['./crud-upsert.component.sass']
})
export class CrudUpsertComponent implements OnInit {

  @Input() public mode: CrudModel.UpsertMode;
  upsertMode = CrudModel.UpsertMode;

  constructor() {
  }

  ngOnInit(): void {
  }

  back(): void {
    window.history.back();
  }


}
