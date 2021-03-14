import {UseCodeGenerationEnum, UseTypeGeneration} from './generationEnum';
import {UseTypeBuildingEnum} from '../../building/model/useTypeEnum';

export class GenerationDto {
  name: string; // نام نیروگاه
  useType: UseTypeGeneration; //  نوع نیروگاه 
  capacity: string;  // ظرفیت 
  useCode: UseCodeGenerationEnum;  //    نوع مصرف 
  address: string; // آدرس
  billingId: string;  // شناسه قبض 
  // numberShare: string; //  شماره نیروگاه 
  fileNumber: string;
  // serialShare: string;
  // generationBranchDiameter: string;// قطر انشعاب اب
  sewageBranchDiameter: string;// قطر انشعاب فاضلاب
  buildingList: GenerationBuildingAllocation[] = [];

}

export class GenerationBuildingAllocation {
  allocationPercentage: string;
  buildingId: string;
  createdAt: any;
  id: string;
  name: string;
  postalCode: string;
  updatedAt: any;
  useType: UseTypeBuildingEnum;
}

export class GenerationList {
  id: string;
  name: string; // نام نیروگاه
  useType: UseTypeGeneration; //  نوع نیروگاه 
  capacity: string;  // ظرفیت 
  useCode: UseCodeGenerationEnum;  //    نوع مصرف 
  // billingId: string;// شناسه قبض 
  // numberShare: String; // شماره اشتراک
  // buildingNum: string;
}


export class GenerationBillList {
  billingId: string; // شناسه قبض
  generationSharingId: String; // شناسه نیروگاه
  // numberShare: String; // شماره اشتراک
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

export class GenerationBillDto {
  generationSharingId:string //شناسه اشتراک
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

export class GenerationAllocation {
  name: string;
  billingId: string;
  generationSharingId: string;
}


