import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminPanelComponent } from './profile/feature/admin-panel/admin-panel.component';
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
    path: 'adminPanel',
    component: AdminPanelComponent,
  },
  {
    path: 'configuration',
    loadChildren: async () => await import ('../user/configuration/configuration.module').then(m => m.ConfigurationModule),
  },
  {
    path: 'analysis',
    loadChildren: async () => await import ('../user/analysis/analysis.module').then(m => m.AnalysisModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
