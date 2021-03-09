import {UseTypeBuildingEnum} from '../../building/model/useTypeEnum';

export class EnergyDto {
  name: string; //نام مشترک 
  address: string; //آدرس
  energyCarrier: string; //حامل انرژی
  energyUnit: string; //واحد انرژی
  shareNumber: string; //شماره کنتور
  capacity: string; //ظرفیت
  kiloWatConvert: string; // ضریب تبدیل به کیلووات
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
  energyCarrier: string; //حامل انرژی 
  energyUnit: string; //واحد انرژی
  shareNumber: string; //شماره کنتور
  capacity: string; //ظرفیت
  kiloWatConvert: string; // ضریب تبدیل به کیلووات
  buildingNum: string;//تعداد ساختمان
  billingId: string;
  addressCode: string;
  // useType: UseTypeWater;
  createdAt: any;
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
  energyCarrier: string; //حامل انرژی 
}
