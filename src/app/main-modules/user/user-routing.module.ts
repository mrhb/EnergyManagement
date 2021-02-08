import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProfileComponent} from './profile/feature/profile.component';

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: 'configuration',
    loadChildren: async () => await import ('../user/configuration/configuration.module').then(m => m.ConfigurationModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
