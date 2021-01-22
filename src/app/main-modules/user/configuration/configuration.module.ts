import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfigurationRoutingModule } from './configuration-routing.module';
import {RegionService} from './region/service/region.service';
import {RegionComponent} from './region/feature/index/region.component';
import { CreateBuildingComponent } from './building/feature/create/create-building.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AlertErrorModule} from '../../../shared/tools/alert-error/alert-error.module';
import {TreeViewComponent} from './region/feature/treeView/tree-view.component';
import { AddBuildingComponent } from './building/feature/create/add-building/add-building.component';
import {BuildingService} from './building/service/building.service';


@NgModule({
  declarations: [RegionComponent, CreateBuildingComponent, TreeViewComponent, AddBuildingComponent],
  imports: [
    CommonModule,
    ConfigurationRoutingModule,
    ReactiveFormsModule,
    AlertErrorModule,
    FormsModule,
  ],
  providers: [RegionService, BuildingService],
})
export class ConfigurationModule { }
