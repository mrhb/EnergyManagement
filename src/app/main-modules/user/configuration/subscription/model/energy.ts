import {UseTypeBuildingEnum} from '../../building/model/useTypeEnum';

export class EnergyDto {
  name: string; //نام مشترک 
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
  name: string; //نام مشترک 
  postalCode: string;
  updatedAt: any;
  useType: UseTypeBuildingEnum;
}

export class EnergyList {
  id: string;
  name: string; //نام مشترک 
  billingId: string;
  addressCode: string;
  // useType: UseTypeWater;
  createdAt: any;
  buildingNum: string;
}

export class EnergyBillList {
  energyCarrier: string; //حامل انرژی 
  fromDate: string; // تاریخ شروع 
  toDate: string; // تاریخ اتمام
  numberDays: string; // روزها
  consumptionAmount: string; // میزان مصرف
  payableAmount: string; //  مبلغ قابل پرداخت  
}

export class EnergyBillDto {
  energySharingId:string ;//شناسه اشتراک
  energyCarrier: string; //حامل انرژی 
  fromDate: string; // تاریخ شروع 
  toDate: string; // تاریخ اتمام
  numberDays: string; // روزها
  consumptionDurat:string; // مصرف دوره- میزان مصرف 
  consumptionAmount:string; // بهای مصرف-هزینه انرژی
  otherAmount: string; // سایر هزینه ها
  payableAmount: string; //  مبلغ قابل پرداخت 
  }

export class EnergyAllocation {
  name: string;
}
