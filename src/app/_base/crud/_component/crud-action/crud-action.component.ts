import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-crud-action',
  templateUrl: './crud-action.component.html',
  styleUrls: ['./crud-action.component.sass']
})
export class CrudActionComponent implements OnInit {

  @Input() public title: string;
  @Input() public routerLink?: string;
  @Input() public createTitle?: string;
  @Input() public queryParams?: object;


  constructor() {
  }

  ngOnInit(): void {
  }

}
