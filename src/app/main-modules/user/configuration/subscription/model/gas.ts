import {GroupGasEnum, UseTypeGasEnum} from './gasEnum';
import {UseTypeBuildingEnum} from '../../building/model/useTypeEnum';

export class GasDto {
  name: string;
  address: string;
  billingId: string;
  city: string;
  domainCode: string;
  addressCode: string;
  numberShare: string;
  fileNumber: string;
  serialShare: string;
  useType: UseTypeGasEnum;
  group: GroupGasEnum;
  capacity: string;
  coefficient: string;
  buildingList: GasBuildingAllocation[] = [];
}

export class GasBuildingAllocation {
  allocationPercentage: string;
  buildingId: string;
  createdAt: any;
  id: string;
  name: string;
  postalCode: string;
  updatedAt: any;
  useType: UseTypeBuildingEnum;
}

export class GasList {
  id: string;
  name: string;
  billingId: string;
  addressCode: string;
  useType: UseTypeGasEnum;
  createdAt: any;
  buildingNum: string;
}


export class GasBillList {
  id: string;
  BillId: string;
  StartDate: string;
  EndDate: string;
  Days: string;
  Masraf: string;
  Mablagh: string;
}


export class GazBillDto {
  billingId: string; // شناسه اشتراک
  paymentCode: string; // شناسه پرداخت
  fromDate: string; // تاریخ شروع 
  toDate: string; // تاریخ اتمام
  numberDays: string; // تعداد روز دوره
  previousCounter: string; // رقم پیشین شماشگر
  currentCounter: string; //  رقم فعلی شماشگر
  totalCounter: string; //  کارکرد شمارشگر
  estandardConsumption: string; //مصرف استاندارد  
  gasPrice: string; // بهای گاز مصرفی  
  subscription: string; //  آبونمان   
  gasTolls: string; //  عوارض گاز 
  insurance: string; //  بیمه   
  payableAmount: string; //    مبلغ قابل پرداخت      
}
//      payableAmount: {type: Number, required: true}, // مبلغ قابل پرداخت









