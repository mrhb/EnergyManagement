import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PipeModule} from '../../shared/tools/pipe-module';

import { UserRoutingModule } from './user-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AlertErrorModule} from '../../shared/tools/alert-error/alert-error.module';
import {ProfileComponent} from './profile/feature/profile.component';
import {UploadFileModule} from '../../shared/tools/upload-file/upload-file.module';

@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UserRoutingModule,
    AlertErrorModule,
    UploadFileModule,
    PipeModule
  ],
})
export class UserModule { }
