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
  billId: string;
  pardakhtId: string; // شناسه پرداخت
  startDate: string; // تاریخ شروع 
  endDate: string; // تاریخ اتمام
  Days: string; // روزها
  raghamGhabl: string; // رقم قبلی
  raghamFeely: string; // رقم فعلی
  masrafDoure: string; // مصرف دوره
  bahaAab: string; //  بهای آب مصرفی
  mablaghPardakh: string; //  مبلغ قابل پرداخت
}