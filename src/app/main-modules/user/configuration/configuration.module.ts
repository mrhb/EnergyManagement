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
import { PowerBillAddComponent } from './subscription/feature/create/power/power-bill-add/power-bill-add.component';
import { PowerBillListComponent } from './subscription/feature/create/power/power-bill-list/power-bill-list.component';
import { EnergyBillListComponent } from './subscription/feature/create/energy/energy-bill-list/energy-bill-list.component';
import { EnergyBillAddComponent } from './subscription/feature/create/energy/energy-bill-add/energy-bill-add.component';
import { WaterBillAddComponent } from './subscription/feature/create/water/water-bill-add/water-bill-add.component';
import { WaterBillListComponent } from './subscription/feature/create/water/water-bill-list/water-bill-list.component';
import { PowerReceiptService } from './subscription/service/power-receipt.service';
import { WaterReceiptService } from './subscription/service/water-receipt.service';
import { EnergyReceiptService } from './subscription/service/energy-receipt.service';
import { CreateInstrumentComponent } from './instrument/feature/add/create-instrument.component';
import { InstrumentListComponent } from './instrument/feature/list/instrument-list.component';
import { InstrumentService } from './instrument/service/instrument.service';
import { FacilityService } from './facility/service/facility.service';
import { FacilityListComponent } from './facility/feature/list/facility-list.component';
import { AddFacilityComponent } from './facility/feature/create/add-facility/add-facility.component';
import { GenerationBillListComponent } from './generation/feature/generation-bill-list/generation-bill-list.component';
import { GenerationBillAddComponent } from './generation/feature/generation-bill-add/generation-bill-add.component';
import { CreateGenerationComponent } from './generation/feature/add/create-generation.component';
import { GenerationService } from './generation/service/generation.service';
import { GenerationReceiptService } from './generation/service/generation-receipt.service';
import { GenerationListComponent } from './generation/feature/list/generation-list.component';
import { RegionModule } from 'src/app/base-modules/region/region.module';


@NgModule({
  declarations: [
    CreateBuildingComponent,
    AddBuildingComponent,
    AreaComponent,
    SpaceComponent,
    MapComponent,
    WallInformationComponent,
    BuildingListComponent,
    //********GENERATION********** */
    GenerationBillAddComponent,
    GenerationBillListComponent,
    CreateGenerationComponent,
    GenerationListComponent,
    //************* */

    FacilityListComponent,
    AddFacilityComponent,
    CreateInstrumentComponent,
    InstrumentListComponent,
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
    GazBillListComponent,
    PowerBillAddComponent,
    PowerBillListComponent,
    EnergyBillListComponent,
    EnergyBillAddComponent,
    WaterBillAddComponent,
    WaterBillListComponent,
    GenerationListComponent
  ],
    imports: [
        CommonModule,
        ConfigurationRoutingModule,
        RegionModule,
        ReactiveFormsModule,
        AlertErrorModule,
        FormsModule,
        UploadFileModule,
        PaginatorModule,
        PipeModule,
        ChartModule,
        NgxEchartsModule
    ],
  providers: [RegionService, BuildingService,FacilityService, EnergyBuildingService, PowerBuildingService,GenerationService,GenerationReceiptService,InstrumentService, PowerService,PowerReceiptService, EnergyService,WaterReceiptService,EnergyReceiptService],
})
export class ConfigurationModule {
}
