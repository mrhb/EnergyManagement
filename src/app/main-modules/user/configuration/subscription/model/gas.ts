import {GroupGasEnum, UseTypeGasEnum} from './gasEnum';
import {UseTypeBuildingEnum} from '../../building/model/useTypeEnum';

export class GasDto {
  name: string;  // نام مشترک
  address: string; // آدرس
  billingId: string;
  city: string;
  domainCode: string;
  addressCode: string;
  numberUnits:string;//تعداد واحدها
  numberShare: string; // شماره اشتراک

  fileNumber: string;
  serialShare: string;
  useType: UseTypeGasEnum;
  group: GroupGasEnum; // گروه
  capacity: string; // ظرفیت
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
  name: string;  // نام مشترک
  billingId: string;  // شناسه قبض
  addressCode: string;  // کد آدرس
  useType: UseTypeGasEnum; 
  createdAt: any;
  group: GroupGasEnum; // گروه
  numberShare: string; // شماره اشتراک
  capacity: string; // ظرفیت
  buildingNum: string;// تعداد ساختمانها
}

export class GasBillList {
  paymentCode: string; // شناسه پرداخت
  fromDate: string; // تاریخ شروع 
  toDate: string; // تاریخ اتمام
  numberDays: string; // تعداد روز دوره
  consumptionDurat: string; // مصرف دوره
  payableAmount: string; //    مبلغ قابل پرداخت      

}

export class GasBillDto {
  gasSharingId:string // (id)شناسه اشتراک
  billingId: string; // شناسه قبض
  paymentCode: string; // شناسه پرداخت
  fromDate: string; // تاریخ شروع 
  toDate: string; // تاریخ اتمام
  numberDays: string; // تعداد روز دوره
  previousCounter: string; // رقم پیشین شماشگر
  currentCounter: string; //  رقم فعلی شماشگر
  consumptionDurat: string; // مصرف دوره
  totalCounter: string; //  کارکرد شمارشگر
  estandardConsumption: string; //مصرف دوره  
  consumptionAmount: string; // بهای گاز مصرفی  
  subscription: string; //  آبونمان   
  gasTolls: string; //  عوارض گاز 
  insurance: string; //  بیمه   
  payableAmount: string; //    مبلغ قابل پرداخت      
}
//      payableAmount: {type: Number, required: true}, // مبلغ قابل پرداخت
export class GasAllocation {
  name: string;
  billingId: string;
  gasSharingId: string;

}









