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

export class PowerBillDto {
  billId: string;
  powerSharingId:string;// شناسه اشتراک
  pardakhtId: string; // شناسه پرداخت
  duration: string; // دوره
  fromDate: string; // تاریخ شروع 
  toDate: string; // تاریخ اتمام
  numberDays: string; // روزها
  explanationExpenses: string; // روزها
  contractualPower: string; // قدرت قراردادی
  calculatedPower: string; // قدرت محاسبه شده
  maximeterNumber: string; //       عدد ماکسیمتر
  powerConsumption: string; //     قدرت مصرفی
  badConsumptionLossRatio: string; //      ضریب زیان بدی مصرف 
  paymentDeadLine: string; //  مهلت پرداخت
  consumptionAmount: string; //   مبلغ مصرف
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
