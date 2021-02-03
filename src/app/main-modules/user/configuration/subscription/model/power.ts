import {GroupEnum, powerSupplyVoltage, UseCodeEnum, UseTypePowerEnum, VoltageTypeEnum} from './powerEnum';
import {UseTypeBuildingEnum} from '../../building/model/useTypeEnum';

export class PowerDto {
  name: string;
  billingId: string;
  systemPass: string;
  city: string;
  domainCode: string;
  addressCode: string;
  numberShare: string;
  fileNumber: string;
  serialShare: string;
  address: string;
  useType: UseTypePowerEnum;
  useCode: UseCodeEnum;
  group: GroupEnum;
  capacity: string;
  coefficient: string;
  voltageType: VoltageTypeEnum;
  powerSupplyVoltage: powerSupplyVoltage;
  buildingList: BuildingAllocation[] = [];
  // buildingNum: string;
}

export class BuildingAllocation {
  allocationPercentage: string;
  buildingId: string;
  createdAt: any;
  id: string;
  name: string;
  postalCode: string;
  updatedAt: any;
  useType: UseTypeBuildingEnum;
}

export class PowerList {
  id: string;
  name: string;
  billingId: string;
  addressCode: string;
  useType: UseTypePowerEnum;
  createdAt: any;
  buildingNum: string;
}

export class PowerBuildingAllocation {
  id: string;
  name: string;
  buildingId: string;
  allocationPercentage: string;
}

// export class BuildingList {
//   buildingId: string;
//   allocationPercentage: string;
// }
