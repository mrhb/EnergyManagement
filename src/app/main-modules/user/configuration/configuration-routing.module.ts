import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RegionComponent} from './region/feature/index/region.component';
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
import { GazBillAddComponent } from './subscription/feature/create/gas/gaz-bill-add/gaz-bill-add.component';
import { GazBillListComponent } from './subscription/feature/create/gas/gaz-bill-list/gaz-bill-list.component';
import { PowerBillAddComponent } from './subscription/feature/create/power/power-bill-add/power-bill-add.component';
import { PowerBillListComponent } from './subscription/feature/create/power/power-bill-list/power-bill-list.component';
import { EnergyBillAddComponent } from './subscription/feature/create/energy/energy-bill-add/energy-bill-add.component';
import { EnergyBillListComponent } from './subscription/feature/create/energy/energy-bill-list/energy-bill-list.component';
import { WaterBillAddComponent } from './subscription/feature/create/water/water-bill-add/water-bill-add.component';
import { WaterBillListComponent } from './subscription/feature/create/water/water-bill-list/water-bill-list.component';
import { CreateInstrumentComponent } from './instrument/feature/add/create-instrument.component';
import { InstrumentListComponent } from './instrument/feature/list/instrument-list.component';

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
    path: 'createInstrument',
    component: CreateInstrumentComponent,
  },
  {
    path: 'instrumentList',
    component: InstrumentListComponent,
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
  {
    path: 'createGas',
    component: GasCreateComponent,
  },
  {
    path: 'editGas',
    component: GasCreateComponent,
  },
  {
    path: 'gasList',
    component: GasListComponent,
  },
  {
    path: 'createWater',
    component: CreateWaterComponent,
  },
  {
    path: 'editWater',
    component: CreateWaterComponent,
  },
  {
    path: 'waterList',
    component: WaterListComponent,
  },
  {
    path: 'createEnergy',
    component: CreateEnergyComponent,
  },
  {
    path: 'editEnergy',
    component: CreateEnergyComponent,
  },
  {
    path: 'energyList',
    component: EnergyListComponent,
  },
  {
    path: 'createClimate',
    component: CreateClimateComponent,
  },
  {
    path: 'climateList',
    component: ClimateListComponent,
  },
  {
    path: 'gazBillAdd',
    component: GazBillAddComponent,
  },
  {
    path: 'gasBillList',
    component: GazBillListComponent,
  },
  {
    path: 'powerBillAdd',
    component: PowerBillAddComponent,
  },
  {
    path: 'powerBillList',
    component: PowerBillListComponent,
  },
  {
    path: 'energyBillAdd',
    component: EnergyBillAddComponent,
  },
  {
    path: 'energyBillList',
    component: EnergyBillListComponent,
  },
  {
    path: 'waterBillAdd',
    component: WaterBillAddComponent,
  },
  {
    path: 'waterBillList',
    component: WaterBillListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfigurationRoutingModule { }
