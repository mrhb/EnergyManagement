import {ConsumptionTypeEnum, GenerationTypeEnum} from './generationEnum';
import {UseTypeBuildingEnum} from '../../building/model/useTypeEnum';

export class GenerationDto {
  name: string; // نام نیروگاه
  generationType: GenerationTypeEnum; //  نوع نیروگاه 
  capacity: string;  // ظرفیت 
  consumptionType: ConsumptionTypeEnum;  //    نوع مصرف 
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
  generationType: GenerationTypeEnum; //  نوع نیروگاه 
  capacity: string;  // ظرفیت 
  consumptionType: ConsumptionTypeEnum;  //    نوع مصرف 
  // billingId: string;// شناسه نیروگاه 
  // numberShare: String; // شماره اشتراک
  // buildingNum: string;
}


export class GenerationBillList {
  id: string;
  name: string; // نام نیروگاه
  billingId: string;// شناسه نیروگاه 
  generationType: GenerationTypeEnum; //  نوع نیروگاه 
  consumptionType: ConsumptionTypeEnum;  //    نوع مصرف 
  capacity: string;  // ظرفیت 
  fromDate: {type: Date, required: true}; // از تاریخ
  toDate: {type: Date, required: true}; // تا تاریخ
  numberDays: {type: Number, required: true}; // تعداد روز دوره
  consumptionDurat: string; // مقدار تولید
  generationSharingId: String; // شناسه نیروگاه
  // consumptionDurat: {type: String, required: true}; // مصرف دوره
  // consumptionAmount: {type: Number, required: true}; // مبلغ مصرف
  // payableAmount: {type: Number, required: true}; // مبلغ قابل پرداخت
}
export class GenerationBillDto {
  generationSharingId: String; // شناسه نیروگاه
  name: string; // نام نیروگاه
  billingId: string;// شناسه نیروگاه 
  fromDate: string; // تاریخ شروع 
  toDate: string; // تاریخ اتمام
  consumptionDurat: string; // مقدار تولید
}

export class GenerationAllocation {
  name: string;
  billingId: string;
  generationSharingId: string;
}


