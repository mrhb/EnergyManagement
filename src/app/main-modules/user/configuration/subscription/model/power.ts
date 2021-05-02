import {GroupEnum,powerSupplyVoltage, UseCodeEnum, UseTypePowerEnum, VoltageTypeEnum} from './powerEnum';
import {UseTypeBuildingEnum} from '../../building/model/useTypeEnum';
import { PeriodEnum } from './sharedEnum';

export class PowerDto {
  name: string;
  billingId: string; //             شناسه قبض  
  city: string; // دیماند قراردادی
  addressCode: string; //شماره بدنه کنتور
  useType: UseTypePowerEnum; // عنوان تعرفه
  useCode: UseCodeEnum;// کد تعرفه
  group: GroupEnum; // نوع کنتور
  coefficient: string; //ضریب کنتور
  contract: string; // دیماند قراردادی
  domainCode: string;
  numberShare: string;
  systemPass: string;
  fileNumber: string;
  serialShare: string;
  address: string;
  voltageType: VoltageTypeEnum;
  powerSupplyVoltage: powerSupplyVoltage;
  buildingList: BuildingAllocation[] = [];
  // capacity: string;
  // buildingNum: string;
}

export class Consumption {
  preCounter          : Number;//شمارنده قبلی
  currentCounter      : Number;//شمارنده کنونی
  coefficient         : Number;//ضریب
  totalConsumption      : Number;//مصرف کل
  consumptionAfterLastChange      : Number;//مصرف بعد از آخرین تغییرات
  nerkh               : Number;//نرخ
  mablagh             : Number//مبلغ
};


export class PowerBillDto {
  sharingId: string;//شناسه اشتراک(id)
  billId: string;
  numberShare:string;// شماره اشتراک
  paymentCode: string; // شناسه پرداخت
  period: PeriodEnum; // دوره
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

  explanationExpenses: String; // روزها
  contractualPower: Number; // قدرت قراردادی
  calculatedPower: Number; // قدرت محاسبه شده
  maximeterNumber: Number; //  عدد ماکسیمتر
  powerConsumption: Number; // قدرت مصرفی
  badConsumptionLossRatio: Number; //   ضریب زیان بدی مصرف 
  paymentDeadLine: String; //  مهلت پرداخت
  consumptionAmount: Number; //   مبلغ مصرف
  consumptionDurat: Number; // میزان مصرف
  subscription: Number; //   آبونمان 
  powerPrice: Number; //   بهای قدرت 
  seasonPrice: Number; //   بهای فصل 
  badPenaltiesForConsuming:Number;// جریمه بدی مصرف 
  payableAmount: Number; //   مبلغ قابل پرداخت

}


export class PowerBillExcelList {
  sharingId: string;//شناسه اشتراک(id)
  billId: string;
  numberShare:string;// شماره اشتراک
  paymentCode: string; // شناسه پرداخت
  period: PeriodEnum; // دوره
  fromDate: string; // تاریخ شروع 
  toDate: string; // تاریخ اتمام
  numberDays: string; // روزها

    //*******Consumptions******* */
    intermediate:  Consumption=new Consumption(); // میان باری
    // peakLoad:  Consumption=new Consumption();; // اوج بار
    // lowLoad:  Consumption=new Consumption();; // کم بار
    // peakTimesFriday: Consumption=new Consumption();; // اوج بار جمعه
    // reactive: Consumption=new Consumption();; // راکتیو
    //*************** */

  // explanationExpenses: String; // روزها
  // contractualPower: Number; // قدرت قراردادی
  // calculatedPower: Number; // قدرت محاسبه شده
  // maximeterNumber: Number; //  عدد ماکسیمتر
  // powerConsumption: Number; // قدرت مصرفی
  // badConsumptionLossRatio: Number; //   ضریب زیان بدی مصرف 
  // paymentDeadLine: String; //  مهلت پرداخت
  consumptionAmount: Number; //   مبلغ مصرف
  consumptionDurat: Number; // میزان مصرف
  // subscription: Number; //   آبونمان 
  // powerPrice: Number; //   بهای قدرت 
  // seasonPrice: Number; //   بهای فصل 
  // badPenaltiesForConsuming:Number;// جریمه بدی مصرف 
  payableAmount: Number; //   مبلغ قابل پرداخت

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
  nameShare: string;// نام مشترک
  billingId: string; // شناسه قبض  
  group: GroupEnum; // نوع کنتور
  useType: UseTypePowerEnum;//  عنوان تعرفه
  useCode: UseCodeEnum;// کد تعرفه
  contract: string; // دیماند قراردادی
  buildingNum: string;// تعداد ساختمانها
}

export class PowerBillList {
  billingId: String; // شناسه اشتراک برق
  numberShare: String; // شماره اشتراک
  nameShare: String;// نام اشتراک
  period: PeriodEnum; // دوره
  fromDate: Date; // از تاریخ
  toDate:Date; // تا تاریخ
  numberDays:Number;//تعداد روزها
  consumptionAmount: Number; // مبلغ مصرف
  ConsumptionSum:string;   //مجموع مصرف
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
  sharingId: string;

}
// export class BuildingList {
//   buildingId: string;
//   allocationPercentage: string;
// }
