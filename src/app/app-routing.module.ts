import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';

import {FirstPageComponent} from './first-page/first-page.component';
import {LoginComponent} from './component/user/login/login.component';
import {SignupComponent} from './component/user/registration/signup.component';
import { ForgotPasswordComponent } from './component/user/forgot-password/forgot-password.component';
import { ProfileComponent } from './component/user/profile/profile.component';
import {ManagementModule} from './management/management.module';
import {MonitoredComponent} from './monitored/monitored.component';
import {AuthGuard} from './_helpers/auth.guard';


const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  { path: 'forgotPassword', component: ForgotPasswordComponent },
  { path: 'profile', component: ProfileComponent },
  {path: 'first-page', component: FirstPageComponent, canActivate: [AuthGuard]},
  {path: 'monitored-units', component: MonitoredComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'management', component: ManagementModule}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
