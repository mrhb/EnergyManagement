import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CreateBuildingComponent} from './building/feature/create/create-building.component';
import {BuildingListComponent} from './building/feature/list/building-list.component';
import {PowerCreateComponent} from './subscription/feature/create/power/create/power-create.component';
import {PowerListComponent} from './subscription/feature/create/power/list/power-list.component';
import {GasCreateComponent} from './subscription/feature/create/gas/add/gas-create.component';
import {GasListComponent} from './subscription/feature/create/gas/list/gas-list.component';
import {WaterListComponent} from './subscription/feature/create/water/list/water-list.component';
import {CreateWaterComponent} from './subscription/feature/create/water/add/create-water.component';
import {CreateEnergyComponent} from './subscription/feature/create/energy/add/create-energy.component';
import {EnergyListComponent} from './subscription/feature/create/energy/list/energy-list.component';
import {CreateClimateComponent} from './climate/feature/creat-climate/creat-climate.component';
import {ClimateListComponent} from './climate/feature/climate-list/climate-list.component';
import { GasBillAddComponent } from './subscription/feature/create/gas/gas-bill-add/gas-bill-add.component';
import { GasBillListComponent } from './subscription/feature/create/gas/gas-bill-list/gas-bill-list.component';
import { PowerBillAddComponent } from './subscription/feature/create/power/power-bill-add/power-bill-add.component';
import { PowerBillListComponent } from './subscription/feature/create/power/power-bill-list/power-bill-list.component';
import { EnergyBillAddComponent } from './subscription/feature/create/energy/energy-bill-add/energy-bill-add.component';
import { EnergyBillListComponent } from './subscription/feature/create/energy/energy-bill-list/energy-bill-list.component';
import { WaterBillAddComponent } from './subscription/feature/create/water/water-bill-add/water-bill-add.component';
import { WaterBillListComponent } from './subscription/feature/create/water/water-bill-list/water-bill-list.component';
import { CreateInstrumentComponent } from './instrument/feature/add/create-instrument.component';
import { InstrumentListComponent } from './instrument/feature/list/instrument-list.component';
import { FacilityListComponent } from './facility/feature/list/facility-list.component';
import { AddFacilityComponent } from './facility/feature/add-facility/add-facility.component';
import { GenerationBillAddComponent } from './generation/feature/generation-bill-add/generation-bill-add.component';
import { GenerationBillListComponent } from './generation/feature/generation-bill-list/generation-bill-list.component';
import { CreateGenerationComponent } from './generation/feature/add/create-generation.component';
import { GenerationListComponent } from './generation/feature/list/generation-list.component';
import { RegionComponent } from 'src/app/base-modules/region/feature/index/region.component';
import { RegionEditeComponent } from './region/feature/region-edite/region-edite.component';
import { ConfigurationMainPanelComponent } from './configuration-main-panel/configuration-main-panel.component';
import { TariffCreateComponent } from './tariff/feature/tariff-create/tariff-create.component';
import { TariffListComponent } from './tariff/feature/tariff-list/tariff-list.component';

const routes: Routes = [
  {
    path: '',component: ConfigurationMainPanelComponent,
    children: [
      {path: 'region',component: RegionComponent,},
      {path: 'createTariff',component: TariffCreateComponent,},
      {path: 'listTariff',component:TariffListComponent ,},
      {path: 'regionEdit',component: RegionEditeComponent,},
      {path: 'createBuilding',component: CreateBuildingComponent,},
      {path: 'editBuilding',component: CreateBuildingComponent,},
      {path: 'buildingList',component: BuildingListComponent,},
      //*****GENERATION******** */
      {path: 'generationBillAdd',component: GenerationBillAddComponent,},
      {path: 'generationBillList',component: GenerationBillListComponent,},
      {path: 'createGeneration',component: CreateGenerationComponent,},
      {path: 'editGeneration',component: CreateGenerationComponent,},
      {path: 'generationList',component: GenerationListComponent,},
      //*******FACILITY */
      {path: 'facilityList',component: FacilityListComponent,},
      {path: 'createFacility',component: AddFacilityComponent,},
      {path: 'createInstrument',component: CreateInstrumentComponent,},
      {path: 'instrumentList',component: InstrumentListComponent,},
      {path: 'createPower',component: PowerCreateComponent,},
      {path: 'editPower',component: PowerCreateComponent,},
      {path: 'powerList',component: PowerListComponent,},
      {path: 'createGas',component: GasCreateComponent,},
      {path: 'editGas',component: GasCreateComponent,},
      {path: 'gasList',component: GasListComponent,},
      {path: 'createWater',component: CreateWaterComponent,},
      {path: 'editWater',component: CreateWaterComponent,},
      {path: 'waterList',component: WaterListComponent,},
      {path: 'createEnergy',component: CreateEnergyComponent,},
      {path: 'editEnergy',component: CreateEnergyComponent,},
      {path: 'energyList',component: EnergyListComponent,},
      {path: 'createClimate',component: CreateClimateComponent,},
      {path: 'climateList',component: ClimateListComponent,},
      {path: 'gazBillAdd',component: GasBillAddComponent,},
      {path: 'gasBillList',component: GasBillListComponent,},
      {path: 'powerBillAdd',component: PowerBillAddComponent,},
      {path: 'powerBillList',component: PowerBillListComponent,},
      {path: 'energyBillAdd',component: EnergyBillAddComponent,},
      {path: 'energyBillList',component: EnergyBillListComponent,},
      {path: 'waterBillAdd',component: WaterBillAddComponent,},
      {path: 'waterBillList',component: WaterBillListComponent,},
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfigurationRoutingModule { }
