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





