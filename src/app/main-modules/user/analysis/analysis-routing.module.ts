import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SideBarComponent } from './side-bar/side-bar.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'main',
  },
  {
    path: 'main',
    component: SideBarComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnalysisRoutingModule { }
