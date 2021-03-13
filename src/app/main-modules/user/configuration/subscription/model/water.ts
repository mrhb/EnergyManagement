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
  numberShare: String; // شماره اشتراک
  addressCode: string;
  useType: UseTypeWater;
  createdAt: any;
  buildingNum: string;
}


export class WaterBillList {
  billingId: string; // شناسه قبض
  waterSharingId: String; // شناسه اشتراک آب
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
}

export class WaterBillDto {
  waterSharingId:string //شناسه اشتراک
  billingId: string; // شناسه قبض
  paymentCode: string; // شناسه پرداخت
  fromDate: string; // تاریخ شروع 
  toDate: string; // تاریخ اتمام
  numberDays: string; // تعداد روز دوره
  previousCounter: string; // رقم قبلی
  currentCounter: string; // رقم فعلی
  consumptionDurat: string; // مصرف دوره
  consumptionAmount: string; //  بهای آب مصرفی
  payableAmount: string; //  مبلغ قابل پرداخت
}

export class WaterAllocation {
  name: string;
  billingId: string;
  waterSharingId: string;
}


