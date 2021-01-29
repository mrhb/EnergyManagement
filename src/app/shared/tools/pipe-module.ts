import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EnumKeyValue} from './enumKeyValue';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    EnumKeyValue

  ],
  exports: [
    EnumKeyValue,
  ]

})
export class PipeModule { }
