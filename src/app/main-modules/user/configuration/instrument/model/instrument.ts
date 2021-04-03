import {UseTypeBuildingEnum} from '../../building/model/useTypeEnum';
import { UseTypeInstrumentEnum, UnitInstrumentEnum, EnergyCarierEnum } from './instrumentEnum';

export class InstrumentDto {
  buildingId: string;

  name: string; //نام تجهیز 
  instrumentCarrier: EnergyCarierEnum; // حامل انرژی 
  instrumentNum: string; //تعداد
  instrumentUsage: UseTypeInstrumentEnum; //کاربری تجهیر
  consumptionPower: string; //توان مصرفی 
  dailyOperatHours: string; // ساعت کارکرد روز 
  AnnualWorkDayNum: string; //  تعداد روز کارکرد در سال 
  fromDate: string; //  تاریخ شروع کار تجهیز
  toDate: string; //  تاریخ خاتمه کار تجهیز
  coincidenceCoefficient: string; //   ضریب همزمانی  
}

export class InstrumentBuildingAllocation {
  allocationPercentage: string;
  buildingId: string;
  createdAt: any;
  id: string;
  name: string; //نام تجهیز 
  postalCode: string;
  updatedAt: any;
  useType: UseTypeBuildingEnum;
}

export class InstrumentList {
  id: string;
  name: string; //نام تجهیز 
  instrumentCarrier: string; //نام حامل انرژی 
  instrumentUsage: UseTypeInstrumentEnum; //کاربری تجهیر
  instrumentNum: string; //تعداد
  consumptionPower: string; //توان مصرفی 
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
