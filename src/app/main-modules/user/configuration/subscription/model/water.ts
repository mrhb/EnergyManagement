import {UseCodeWaterEnum, UseTypeWater} from './waterEnum';
import {UseTypeBuildingEnum} from '../../building/model/useTypeEnum';

export class WaterDto {
  name: string;
  address: string; // آدرس
  billingId: string;  // شناسه قبض 
  numberShare: string; //  شماره اشتراک 
  fileNumber: string;
  serialShare: string;
  useType: UseTypeWater; //  کاربری انشعاب 
  waterBranchDiameter: string;// قطر انشعاب اب
  sewageBranchDiameter: string;// قطر انشعاب فاضلاب
  capacity: string;  // ظرفیت قراردادی 
  buildingList: WaterBuildingAllocation[] = [];
  useCode: UseCodeWaterEnum;  //    کد و نوع تعرفه 

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
  billingId: string;// شناسه قبض 
  numberShare: String; // شماره اشتراک
  useType: UseTypeWater; //  کاربری انشعاب 
  useCode: UseCodeWaterEnum;  //    کد و نوع تعرفه 
  capacity: string;  // ظرفیت قراردادی 
  buildingNum: string;
}


export class WaterBillList {
  billingId: string; // شناسه قبض
  sharingId: String; // شناسه اشتراک آب
  numberShare: String; // شماره اشتراک
  nameShare: String;// نام اشتراک
  paymentCode: {type: String, required: true}; // شناسه پرداخت
  fromDate: {type: Date, required: true}; // از تاریخ
  toDate: {type: Date, required: true}; // تا تاریخ
  numberDays: {type: Number}; // تعداد روز دوره
  previousCounter: {type: String}; // شمارنده قبلی
  currentCounter: {type: String}; // شمارنده کنونی
  consumptionDurat: {type: String, required: true}; // مصرف دوره
  consumptionAmount: {type: Number}; // مبلغ مصرف
  payableAmount: {type: Number, required: true}; // مبلغ قابل پرداخت

  id: string;
}


export class WaterBillExcelList {
  billingId: string; // شناسه قبض
  sharingId: String; // شناسه اشتراک آب
  numberShare: String; // شماره اشتراک
  nameShare: String;// نام اشتراک
  paymentCode: {type: String, required: true}; // شناسه پرداخت
  fromDate:String// {type: String, required: true}; // از تاریخ
  toDate:string// // تا تاریخ
  previousCounter: {type: String}; // شمارنده قبلی
  currentCounter: {type: String}; // شمارنده کنونی
  consumptionDurat: {type: String, required: true}; // مصرف دوره
  consumptionAmount: {type: Number}; // مبلغ مصرف
  payableAmount: {type: Number, required: true}; // مبلغ قابل پرداخت

  id: string;
}

export class WaterBillDto {
  sharingId:string //شناسه اشتراک
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
  sharingId: string;
}


