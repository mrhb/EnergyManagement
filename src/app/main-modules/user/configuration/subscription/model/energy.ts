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


export class EnergyBillDto {
  energyCarrier: string; //حامل انرژی 
  fromDate: string; // تاریخ شروع 
  toDate: string; // تاریخ اتمام
  numberDays: string; // روزها
  consumptionAmount: string; // میزان مصرف
  energyCost: string; // هزینه انرژی
  otherCost: string; // سایر هزینه ها
  payableAmount: string; //  مبلغ قابل پرداخت  
}
// otherCost: {type: Number, required: true}, // سایر هزینه ها


// name: {type: String, required: true}, // نام مشترک
// address: {type: String, required: true}, // نشانی محل مصرف
// energyCarrier: {type: String, required: true}, //  انرژی
// energyUnit: {type: String}, // واحد انرژی
// shareNumber: {type: String}, // شماره کنتور