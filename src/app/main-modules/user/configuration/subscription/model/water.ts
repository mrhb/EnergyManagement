import {UseCodeWaterEnum, UseTypeWater} from './waterEnum';
import {UseTypeBuildingEnum} from '../../building/model/useTypeEnum';

export class WaterDto {
  name: string;
  billingId: string;
  numberShare: string;
  fileNumber: string;
  serialShare: string;
  useType: UseTypeWater;
  sewageBranchDiameter: string;
  capacity: string;
  buildingList: WaterBuildingAllocation[] = [];
  useCode: UseCodeWaterEnum;
}

export class WaterBuildingAllocation {
  allocationPercentage: string;
  buildingId: string;
  createdAt: any;
  id: string;
  name: string;
  postalCode: string;
  updatedAt: any;
  useType: UseTypeBuildingEnum;
}

export class WaterList {
  id: string;
  name: string;
  billingId: string;
  addressCode: string;
  useType: UseTypeWater;
  createdAt: any;
  buildingNum: string;
}


export class WaterBillList {

  waterSharingId: String; // شناسه شاشتراک آب
  numberShare: String; // شماره اشتراک
  nameShare: String;// نام اشتراک

  paymentCode: {type: String, required: true}; // شناسه پرداخت
  fromDate: {type: Date, required: true}; // از تاریخ
  toDate: {type: Date, required: true}; // تا تاریخ
  numberDays: {type: Number, required: true}; // تعداد روز دوره
  previousCounter: {type: String, required: true}; // شمارنده قبلی
  currentCounter: {type: String, required: true}; // شمارنده کنونی
  consumptionDurat: {type: String, required: true}; // مصرف دوره
  consumptionAmount: {type: Number, required: true}; // مبلغ مصرف
  payableAmount: {type: Number, required: true}; // مبلغ قابل پرداخت



  id: string;
  Duration: string;
  BillId: string;
  StartDate: string;
  EndDate: string;
  Days: string;
  Masraf: string;
  Mablagh: string;
}



export class WaterBillDto {
  billId: string;
  pardakhtId: string; // شناسه پرداخت
  duration: string; // دوره
  startDate: string; // تاریخ شروع 
  endDate: string; // تاریخ اتمام
  Days: string; // روزها
  ghodratGharar: string; // قدرت قراردادی
  ghodratMohasebeh: string; // قدرت محاسبه شده
}