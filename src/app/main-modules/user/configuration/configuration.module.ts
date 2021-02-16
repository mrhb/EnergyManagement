import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ConfigurationRoutingModule} from './configuration-routing.module';
import {RegionService} from './region/service/region.service';
import {RegionComponent} from './region/feature/index/region.component';
import {CreateBuildingComponent} from './building/feature/create/create-building.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AlertErrorModule} from '../../../shared/tools/alert-error/alert-error.module';
import {TreeViewComponent} from './region/feature/treeView/tree-view.component';
import {AddBuildingComponent} from './building/feature/create/add-building/add-building.component';
import {BuildingService} from './building/service/building.service';
import {AreaComponent} from './building/feature/create/area/area.component';
import {SpaceComponent} from './building/feature/create/space/space.component';
import {MapComponent} from './building/feature/create/map/map.component';
import {UploadFileModule} from '../../../shared/tools/upload-file/upload-file.module';
import {WallInformationComponent} from './building/feature/create/wall-information/wall-information.component';
import {BuildingListComponent} from './building/feature/list/building-list.component';
import {PaginatorModule} from '../../../shared/paginator/paginator.module';
import {SubscriptionComponent} from './subscription/feature/create/subscription.component';

import {PowerCreateComponent} from './subscription/feature/create/power/create/power-create.component';
import {PipeModule} from '../../../shared/tools/pipe-module';
import {PowerService} from './subscription/service/power.service';
import {PowerListComponent} from './subscription/feature/create/power/list/power-list.component';
import {GasCreateComponent} from './subscription/feature/create/gas/add/gas-create.component';
import {GasListComponent} from './subscription/feature/create/gas/list/gas-list.component';
import {CreateWaterComponent} from './subscription/feature/create/water/add/create-water.component';
import {WaterListComponent} from './subscription/feature/create/water/list/water-list.component';
import {CreateEnergyComponent} from './subscription/feature/create/energy/add/create-energy.component';
import {EnergyListComponent} from './subscription/feature/create/energy/list/energy-list.component';
import {EnergyService} from './subscription/service/energy.service';
import {EnergyBuildingService} from './building/service/energy-building.service';
import {PowerBuildingService} from './building/service/power-building.service';
import {AppModule} from '../../../app.module';
import {ChartModule} from '../../../shared/tools/chart/chart.module';
import {NgxEchartsModule} from 'ngx-echarts';
import { CreateClimateComponent } from './climate/feature/creat-climate/creat-climate.component';
import { ClimateListComponent } from './climate/feature/climate-list/climate-list.component';
import { GazBillAddComponent } from './subscription/feature/create/gas/gaz-bill-add/gaz-bill-add.component';
import { GazBillListComponent } from './subscription/feature/create/gas/gaz-bill-list/gaz-bill-list.component';


@NgModule({
  declarations: [
    RegionComponent,
    CreateBuildingComponent,
    TreeViewComponent,
    AddBuildingComponent,
    AreaComponent,
    SpaceComponent,
    MapComponent,
    WallInformationComponent,
    BuildingListComponent,
    SubscriptionComponent,
    PowerCreateComponent,
    PowerListComponent,
    GasCreateComponent,
    GasListComponent,
    CreateWaterComponent,
    WaterListComponent,
    CreateEnergyComponent,
    EnergyListComponent,
    CreateClimateComponent,
    ClimateListComponent,
    GazBillAddComponent,
    GazBillListComponent
  ],
    imports: [
        CommonModule,
        ConfigurationRoutingModule,
        ReactiveFormsModule,
        AlertErrorModule,
        FormsModule,
        UploadFileModule,
        PaginatorModule,
        PipeModule,
        ChartModule,
        NgxEchartsModule
    ],
  providers: [RegionService, BuildingService, EnergyBuildingService, PowerBuildingService, PowerService, EnergyService],
})
export class ConfigurationModule {
}
