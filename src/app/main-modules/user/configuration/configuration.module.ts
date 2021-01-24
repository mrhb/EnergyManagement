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
import { AreaComponent } from './building/feature/create/area/area.component';
import { SpaceComponent } from './building/feature/create/space/space.component';
import { MapComponent } from './building/feature/create/map/map.component';
import {UploadFileModule} from "../../../shared/tools/upload-file/upload-file.module";
import { WallInformationComponent } from './building/feature/create/wall-information/wall-information.component';


@NgModule({
  declarations: [RegionComponent, CreateBuildingComponent, TreeViewComponent, AddBuildingComponent, AreaComponent, SpaceComponent, MapComponent, WallInformationComponent],
    imports: [
        CommonModule,
        ConfigurationRoutingModule,
        ReactiveFormsModule,
        AlertErrorModule,
        FormsModule,
        UploadFileModule,
    ],
  providers: [RegionService, BuildingService],
})
export class ConfigurationModule { }
