import { Component, OnInit } from '@angular/core';
import {PowerBillDto} from '../../../../model/power';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-power-bill-add',
  templateUrl: './power-bill-add.component.html',
  styleUrls: ['./power-bill-add.component.scss']
})
export class PowerBillAddComponent implements OnInit {

  pageSize = 20;
  pageIndex = 0;
  length = -1;
  touched = false;
  edited = false;
  powerId = '';
  form: FormGroup;
  powerBillDto = new PowerBillDto();

  constructor() { }

  ngOnInit(): void {
  }

}


