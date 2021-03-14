import {UseCodeGenerationEnum, UseTypeGeneration} from './generationEnum';
import {UseTypeBuildingEnum} from '../../building/model/useTypeEnum';

export class GenerationDto {
  name: string; // نام نیروگاه
  useType: UseTypeGeneration; //  نوع نیروگاه 
  capacity: string;  // ظرفیت 
  useCode: UseCodeGenerationEnum;  //    نوع مصرف 
  billingId: string;// شناسه نیروگاه 
  address: string; // آدرس
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
  // billingId: string;// شناسه نیروگاه 
  // numberShare: String; // شماره اشتراک
  // buildingNum: string;
}


export class GenerationBillList {
  id: string;
  name: string; // نام نیروگاه
  billingId: string;// شناسه نیروگاه 
  useType: UseTypeGeneration; //  نوع نیروگاه 
  useCode: UseCodeGenerationEnum;  //    نوع مصرف 
  capacity: string;  // ظرفیت 
  fromDate: {type: Date, required: true}; // از تاریخ
  toDate: {type: Date, required: true}; // تا تاریخ
  numberDays: {type: Number, required: true}; // تعداد روز دوره
  generationValue: {type: String, required: true}; // مقدار تولید
  generationSharingId: String; // شناسه نیروگاه
  // consumptionDurat: {type: String, required: true}; // مصرف دوره
  // consumptionAmount: {type: Number, required: true}; // مبلغ مصرف
  // payableAmount: {type: Number, required: true}; // مبلغ قابل پرداخت
}
export class GenerationBillDto {
  name: string; // نام نیروگاه
  billingId: string;// شناسه نیروگاه 
  fromDate: string; // تاریخ شروع 
  toDate: string; // تاریخ اتمام
  generationValue: string; // مقدار تولید
  generationSharingId:string //شناسه اشتراک
  // paymentCode: string; // شناسه پرداخت
  // numberDays: string; // تعداد روز دوره
  // currentCounter: string; // رقم فعلی
  // consumptionDurat: string; // مصرف دوره
  // consumptionAmount: string; //  بهای آب مصرفی
  // payableAmount: string; //  مبلغ قابل پرداخت
}

export class GenerationAllocation {
  name: string;
  billingId: string;
  generationSharingId: string;
}


