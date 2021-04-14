import {UseCodeEnum,  GroupEnum, PowerUseTypeEnum,} from './tariffEnum';

export class TariffDto {

  group: GroupEnum; // نوع تعرفه
  useType: PowerUseTypeEnum; // عنوان تعرفه
  useCode: UseCodeEnum;// کد تعرفه
  approvalDate: string;  //  تاریخ تصویب
  fromDate: string; // تاریخ شروع اعتبار 
  toDate: string; //  تاریخ اتمام اعتبار 
}




export class TariffList {
 
}


