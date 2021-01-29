import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RegionComponent} from './region/feature/index/region.component';
import {CreateBuildingComponent} from './building/feature/create/create-building.component';
import {BuildingListComponent} from './building/feature/list/building-list.component';
import {PowerCreateComponent} from './subscription/feature/create/power/create/power-create.component';
import {PowerListComponent} from './subscription/feature/create/power/list/power-list.component';

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
    path: 'createBuilding',
    component: CreateBuildingComponent,
  },
  {
    path: 'editBuilding',
    component: CreateBuildingComponent,
  },
  {
    path: 'buildingList',
    component: BuildingListComponent,
  },
  {
    path: 'createPower',
    component: PowerCreateComponent,
  },
  {
    path: 'editPower',
    component: PowerCreateComponent,
  },
  {
    path: 'powerList',
    component: PowerListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfigurationRoutingModule { }
