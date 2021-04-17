import { Component, OnInit,  EventEmitter, Output, ViewContainerRef, } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Power1Params } from '../../model/tariff';

@Component({
  selector: 'app-tariff-power-param1',
  templateUrl: './tariff-power-param1.component.html',
  styleUrls: ['./tariff-power-param1.component.scss']
})
export class TariffPowerParam1Component implements  OnInit {
  @Output() paramOutputEvent : EventEmitter<Power1Params> = new EventEmitter<Power1Params>();

  pageSize = 20;
  pageIndex = 0;
  length = -1;
  touched = false;
  edited = false;
  form: FormGroup;

  powerParams=new Power1Params();
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.form = this.formBuilder.group({
      paramY1: [''],// قیمت پایه از 0 تا 100 
      paramY2: [''],// قیمت پایه از 0 تا 100 
      paramY3: [''],// قیمت پایه از 0 تا 100 
      paramY4: [''],// قیمت پایه از 0 تا 100 
      paramY5: [''],// قیمت پایه از 0 تا 100 
      paramY6: [''],// قیمت پایه از 0 تا 100 
      paramY7: [''],// قیمت پایه از 0 تا 100 
    });
  
    this.someFunc();
  }

  someFunc() {
    this.powerParams.garmsMonth=[true,true,true,true,true,true,true,true,true,true,true,true];
    this.powerParams.demandPrice=132423;
    this.powerParams.x=[100,200,300,400,500,600];
    this.powerParams.y=[234,35,34,345,344,345];
    this.powerParams.xGarm=[234,35,34,345,344,345];
    this.powerParams.yGarm=[234,35,34,345,344,345];

    this.paramOutputEvent.emit(this.powerParams)


}

}
