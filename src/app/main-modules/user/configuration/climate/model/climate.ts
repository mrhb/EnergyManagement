import {OstanEnum, powerSupplyVoltage, UseCodeEnum, UseTypePowerEnum, VoltageTypeEnum} from './climateEnum';

export class ClimateDto {
  ostan: OstanEnum;
  useType: UseTypePowerEnum;
  shahr: string;
  roosta: string;
  lat: string;
  long: string;
  ertefa: string;
  climateKind: string;
  ghalebHararati: string;
  energyDegree: string;
  // fileNumber: string;
  // serialShare: string;
  // address: string;
  // useType: UseTypePowerEnum;
  // useCode: UseCodeEnum;
  // group: GroupEnum;
  // capacity: string;
  // coefficient: string;
  // voltageType: VoltageTypeEnum;
  // powerSupplyVoltage: powerSupplyVoltage;
  // buildingList: BuildingAllocation[] = [];
  // buildingNum: string;
}

