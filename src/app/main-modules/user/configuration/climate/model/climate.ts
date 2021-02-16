import {OstanEnum, powerSupplyVoltage, UseCodeEnum, UseTypePowerEnum, VoltageTypeEnum} from './climateEnum';

export class ClimateDto {
  ostan: OstanEnum;
  useType: UseTypePowerEnum;
  shahr: string;
  rusta: string;
  longitude: string;
  latitude: string;
  ertefa: string;
  ghaleb: string;
  energyDegree: string;  
  climateKind: string;
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

export class ClimateList {
  id: string;
  ostan: OstanEnum;
  shahr: string;
  longitude: string;
  latitude: string;
  climateKind: string;
  highDegMean: string;
  lowDegMean: string;
  highHumidMean: string;
  lowHumidMean: string;
  windMean: string;
}

