import {GroupEnum, powerSupplyVoltage, UseCodeEnum, UseTypePowerEnum, VoltageTypeEnum} from './powerEnum';
import {UseTypeBuildingEnum} from '../../building/model/useTypeEnum';

export class PowerDto {
  name: string;
  billingId: string;
  systemPass: string;
  city: string; // دیماند قراردادی
  domainCode: string;
  addressCode: string; //شماره بدنه کنتور
  numberShare: string;
  fileNumber: string;
  serialShare: string;
  address: string;
  useType: UseTypePowerEnum;
  useCode: UseCodeEnum;
  group: GroupEnum; // نوع کنتور
  capacity: string;
  coefficient: string; //ضریب کنتور
  voltageType: VoltageTypeEnum;
  powerSupplyVoltage: powerSupplyVoltage;
  buildingList: BuildingAllocation[] = [];
  // buildingNum: string;
}

export class Consumption {
  preCounter          : String;//شمارنده قبلی
  currentCounter      : String;//شمارنده کنونی
  coefficient         : String;//ضریب
  totalConsumption      : String;//مصرف کل
  consumptionAfterLastChange      : String;//مصرف بعد از آخرین تغییرات
  nerkh               : String;//نرخ
  mablagh             : String//مبلغ
};


export class PowerBillDto {
  powerSharingId: string;//شناسه اشتراک(id)
  billId: string;
  numberShare:string;// شماره اشتراک
  paymentCode: string; // شناسه پرداخت
  period: string; // دوره
  fromDate: string; // تاریخ شروع 
  toDate: string; // تاریخ اتمام
  numberDays: string; // روزها

    //*******Consumptions******* */
    intermediate:  Consumption=new Consumption(); // میان باری
    peakLoad:  Consumption=new Consumption();; // اوج بار
    lowLoad:  Consumption=new Consumption();; // کم بار
    peakTimesFriday: Consumption=new Consumption();; // اوج بار جمعه
    reactive: Consumption=new Consumption();; // راکتیو
    //*************** */

  explanationExpenses: string; // روزها
  contractualPower: string; // قدرت قراردادی
  calculatedPower: string; // قدرت محاسبه شده
  maximeterNumber: string; //       عدد ماکسیمتر
  powerConsumption: string; //     قدرت مصرفی
  badConsumptionLossRatio: string; //      ضریب زیان بدی مصرف 
  paymentDeadLine: string; //  مهلت پرداخت
  consumptionAmount: string; //   مبلغ مصرف
  subscription: string; //   آبونمان 
  powerPrice: string; //   بهای قدرت 
  seasonPrice: string; //   بهای فصل 
  payableAmount: string; //   بهای فصل 

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

export class PowerBillList {
  billingId: String; // شناسه اشتراک برق
  numberShare: String; // شماره اشتراک
  nameShare: String;// نام اشتراک
  fromDate: Date; // از تاریخ
  toDate:Date; // تا تاریخ
  numberDays:Number;//تعداد روزها
  consumptionAmount: Number; // مبلغ مصرف
  totalConsumption:string;   // مصرف کل
}

export class PowerBuildingAllocation {
  allocationPercentage: string;
  buildingId: string;
  createdAt: any;
  id: string;
  name: string;
  postalCode: string;
  updatedAt: any;
  useType: UseTypeBuildingEnum;
}

export class PowerSharingAllocation {
  allocationPercentage: string;
  buildingId: string;
  createdAt: any;
  id: string;
  name: string;
  postalCode: string;
  updatedAt: any;
  useType: UseTypeBuildingEnum;
}

export class PowerAllocation {
  name: string;
  billingId: string;
  powerSharingId: string;

}
// export class BuildingList {
//   buildingId: string;
//   allocationPercentage: string;
// }
