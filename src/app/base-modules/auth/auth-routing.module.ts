import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SignupComponent} from './feature/sign-up/signup.component';
import {LoginComponent} from './feature/login/login.component';
import {ForgotPasswordComponent} from './feature/forgot-password/forgot-password.component';
/**
 * create By reza mollaei reza_yki@yahoo.com
 */
const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'signUp',
    component: SignupComponent
  },
  {
    path: 'forgetPassword',
    component: ForgotPasswordComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
