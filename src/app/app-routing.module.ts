import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: async () => await import ('../app/base-modules/auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'index',
    loadChildren: async () => await import ('../app/base-modules/panel/panel.module').then(m => m.PanelModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
