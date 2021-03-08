import {UseTypeBuildingEnum} from '../../building/model/useTypeEnum';

export class InstrumentDto {
  name: string; //نام مشترک 
  address: string;
  instrumentCarrier: string;
  instrumentUnit: string;
  shareNumber: string;
  creatorId: string;
  ownerId: string;
  buildingList: InstrumentBuildingAllocation[] = [];
}

export class InstrumentBuildingAllocation {
  allocationPercentage: string;
  buildingId: string;
  createdAt: any;
  id: string;
  name: string; //نام مشترک 
  postalCode: string;
  updatedAt: any;
  useType: UseTypeBuildingEnum;
}

export class InstrumentList {
  id: string;
  name: string; //نام مشترک 
  billingId: string;
  addressCode: string;
  // useType: UseTypeWater;
  createdAt: any;
  buildingNum: string;
}

export class InstrumentBillList {
  instrumentCarrier: string; //حامل انرژی 
  fromDate: string; // تاریخ شروع 
  toDate: string; // تاریخ اتمام
  numberDays: string; // روزها
  consumptionAmount: string; // میزان مصرف
  payableAmount: string; //  مبلغ قابل پرداخت  
}

export class InstrumentBillDto {
  instrumentSharingId:string ;//شناسه اشتراک
  instrumentCarrier: string; //حامل انرژی 
  fromDate: string; // تاریخ شروع 
  toDate: string; // تاریخ اتمام
  numberDays: string; // روزها
  consumptionDurat:string; // مصرف دوره- میزان مصرف 
  consumptionAmount:string; // بهای مصرف-هزینه انرژی
  otherAmount: string; // سایر هزینه ها
  payableAmount: string; //  مبلغ قابل پرداخت 
  }

export class InstrumentAllocation {
  name: string;
  instrumentCarrier: string; //حامل انرژی 
}
