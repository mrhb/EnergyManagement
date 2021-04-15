import {UseCodeEnum,  GroupEnum, PowerUseTypeEnum,} from './tariffEnum';

export class TariffDto {

  group: GroupEnum; // نوع تعرفه
  useType: PowerUseTypeEnum; // عنوان تعرفه
  useCode: UseCodeEnum;// کد تعرفه
  approvalDate: string;  //  تاریخ تصویب
  fromDate: string; // تاریخ شروع اعتبار 
  toDate: string; //  تاریخ اتمام اعتبار 
  params:Power1Params|Power2Params;
}


export class Power1Params {
    garmsMonth: Boolean[];
    x: Number[] ;//validate: [paramlengh, '{PATH} must be contain 6 number']
    y:Number[] ;//validate: [paramlengh, '{PATH} must be contain 6 number']
    xGarm:Number[] ;//validate: [paramlengh, '{PATH} must be contain 6 number']
    yGarm:Number[] ;//validate: [paramlengh, '{PATH} must be contain 6 number']
    demandPrice  : Number;//قیمت دیماند
}

export class Power2Params {
  garmsMonth: Boolean[];
  x: Number[] ;//validate: [paramlengh, '{PATH} must be contain 6 number']
  y:Number[] ;//validate: [paramlengh, '{PATH} must be contain 6 number']
  xGarm:Number[] ;//validate: [paramlengh, '{PATH} must be contain 6 number']
  yGarm:Number[] ;//validate: [paramlengh, '{PATH} must be contain 6 number']
  demandPrice  : Number;//قیمت دیماند
}



export class TariffList {
 
}


