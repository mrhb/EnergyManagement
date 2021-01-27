import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RegionComponent} from './region/feature/index/region.component';
import {CreateBuildingComponent} from './building/feature/create/create-building.component';
import {BuildingListComponent} from "./building/feature/list/building-list.component";

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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfigurationRoutingModule { }
