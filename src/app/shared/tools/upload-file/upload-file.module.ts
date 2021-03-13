import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadFileComponent } from './upload-file/upload-file.component';
import {UploadFileService} from './upload-file/upload-file.service';



@NgModule({
  declarations: [UploadFileComponent],
  imports: [
    CommonModule
  ],
  exports: [
    UploadFileComponent
  ],
  providers: [UploadFileService]
})
export class UploadFileModule { }
