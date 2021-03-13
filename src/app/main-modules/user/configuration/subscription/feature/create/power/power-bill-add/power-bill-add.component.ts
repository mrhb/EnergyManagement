import { Component, OnInit } from '@angular/core';
import {PowerBillDto} from '../../../../model/power';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MyPattern } from 'src/app/shared/tools/myPattern';

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
  myPattern = MyPattern;

  form: FormGroup;
  powerBillDto = new PowerBillDto();

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form=this.formBuilder.group({
      billId: ['', [Validators.minLength(3), Validators.pattern(this.myPattern.nameAndFamily)]],
      pardakhtId: ['', [Validators.minLength(3), Validators.pattern(this.myPattern.nameAndFamily)]],
      duration:[], // دوره
      startDate:[], // تاریخ شروع 
      endDate:[], // تاریخ اتمام
      Days:[], // روزها
      ghodratGharar:[], // قدرت قراردادی
      ghodratMohasebeh:[], // قدرت محاسبه شده
    }

    );
  }

}


