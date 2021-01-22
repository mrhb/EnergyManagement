import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RegionComponent} from './region/feature/index/region.component';
import {CreateBuildingComponent} from './building/feature/create/create-building.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'region',
  },
  {
    path: 'region',
    component: RegionComponent,
  },
  {
    path: 'building',
    component: CreateBuildingComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfigurationRoutingModule { }
