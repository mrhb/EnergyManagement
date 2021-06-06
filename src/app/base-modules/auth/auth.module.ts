import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PipeModule} from '../../shared/tools/pipe-module';

import { AuthRoutingModule } from './auth-routing.module';
import { ForgotPasswordComponent } from './feature/forgot-password/forgot-password.component';
import { SignupComponent } from './feature/sign-up/signup.component';
import {LoginComponent} from './feature/login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AlertErrorModule} from '../../shared/tools/alert-error/alert-error.module';
import {AuthService} from './service/auth.service';
import {CheckUserService} from './service/checkUserService';

/**
 * create By reza mollaei reza_yki@yahoo.com
 */
@NgModule({
  declarations: [ForgotPasswordComponent, SignupComponent, LoginComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    AlertErrorModule,
    ReactiveFormsModule,
    PipeModule

  ],
  providers: [AuthService, CheckUserService]
})
export class AuthModule { }
