import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserGuardService} from '../../../service/guard/user-guard.service';
import {AdminGuardService} from '../../../service/guard/adminGuard.service';
import {PanelComponent} from './_index/panel.component';
import {CustomGuardService} from '../../../service/guard/custumGuard.service';
import {ROLE_ADMIN, ROLE_USER} from '../../shared/constants/role.constants';

const routes: Routes = [
  {
    path: '',
    component: PanelComponent,
    canActivate: [CustomGuardService],
    data: {
      guards: [
        ROLE_USER,
        ROLE_ADMIN,
      ],
    },
    children: [
      {
        path: 'user',
        loadChildren: () => import('../../main-modules/user/user.module').then(m => m.UserModule)
        // ,canActivate: [UserGuardService,AdminGuardService]
      },
      // {
      //   path: 'admin',
      //   loadChildren: () => import('../../main-modules/user/user.module').then(m => m.UserModule)
      //   // ,canActivate: [AdminGuardService]
      // }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PanelRoutingModule { }
