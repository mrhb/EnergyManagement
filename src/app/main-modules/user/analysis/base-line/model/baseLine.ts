import { BaseLineParamEnum, EnergyTypeEnum } from "./baseLineEnum";

export class BaseLineDto {
  regionId:string
  energyType: EnergyTypeEnum; //  نوع قبض 
  baseLineParam: BaseLineParamEnum; //  نوع پارامتر 
  fromDate: string; // تاریخ شروع 
  toDate: string; // تاریخ اتمام
  }