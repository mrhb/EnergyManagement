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

export class Consumption {
  preCounter          :  {type: String, required: true};//شمارنده قبلی
  currentCounter      :  {type: String, required: true};//شمارنده کنونی
  coefficient         :  {type: String, required: true};//ضریب
  totalConsumption      :  {type: String, required: true};//مصرف کل
  consumptionAfterLastChange      :  {type: String, required: true};//مصرف بعد از آخرین تغییرات
  nerkh               :  {type: String, required: true};//نرخ
  mablagh             :  {type: String, required: true}//مبلغ
};


export class PowerBillDto {
  billId: string;
  powerSharingId:string;// شناسه اشتراک
  paymentCode: string; // شناسه پرداخت
  period: string; // دوره
  fromDate: string; // تاریخ شروع 
  toDate: string; // تاریخ اتمام
  numberDays: string; // روزها

    //*******Consumptions******* */
    intermediate: {type: Consumption}; // میان باری
    peakLoad: {type: Consumption}; // اوج بار
    lowLoad: {type: Consumption}; // کم بار
    peakTimesFriday: {type: Consumption}; // اوج بار جمعه
    reactive: {type: Consumption}; // راکتیو
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
  powerSharingId: String; // شناسه اشتراک برق
  numberShare: String; // شماره اشتراک
  nameShare: String;// نام اشتراک
  fromDate: Date; // از تاریخ
  toDate:Date; // تا تاریخ
  numberDays:Number;//تعداد روزها
  consumptionAmount: Number; // مبلغ مصرف
  totalConsumption:string;   // مصرف کل
  id: string;
  BillId: string;
  StartDate: string;
  EndDate: string;
  Days: string;
  Masraf: string;
  Mablagh: string;
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
 
}
// export class BuildingList {
//   buildingId: string;
//   allocationPercentage: string;
// }
