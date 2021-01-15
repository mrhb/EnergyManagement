import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserGuardService} from '../../../service/guard/user-guard.service';
import {AdminGuardService} from '../../../service/guard/adminGuard.service';

const routes: Routes = [
  {
    path: 'user',
    loadChildren: () => import('../../main-modules/user/user.module').then(m => m.UserModule),
    canActivate: [UserGuardService]
  },
  {
    path: 'admin',
    loadChildren: () => import('../../main-modules/user/user.module').then(m => m.UserModule),
    canActivate: [AdminGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PanelRoutingModule { }
