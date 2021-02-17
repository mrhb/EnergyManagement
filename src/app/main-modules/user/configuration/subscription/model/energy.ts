import {UseTypeBuildingEnum} from '../../building/model/useTypeEnum';
import {UseTypeWater} from './waterEnum';

export class EnergyDto {
  name: string;
  address: string;
  energyCarrier: string;
  energyUnit: string;
  shareNumber: string;
  creatorId: string;
  ownerId: string;
  buildingList: EnergyBuildingAllocation[] = [];
}

export class EnergyBuildingAllocation {
  allocationPercentage: string;
  buildingId: string;
  createdAt: any;
  id: string;
  name: string;
  postalCode: string;
  updatedAt: any;
  useType: UseTypeBuildingEnum;
}

export class EnergyList {
  id: string;
  name: string;
  billingId: string;
  addressCode: string;
  useType: UseTypeWater;
  createdAt: any;
  buildingNum: string;
}

export class EnergyBillList {
  id: string;
  EnergyType: string;
  StartDate: string;
  EndDate: string;
  Days: string;
  Masraf: string;
  Hazineh: string;
  Mablagh: string;
  
}
