import { PeriodEnum } from "../../model/chartEnum";
import { BaseLineParamEnum, EnergyTypeEnum } from "./baseLineEnum";

export class BaseLineDto {
  regionId:string
  energyType: EnergyTypeEnum; //  نوع قبض 
  period:PeriodEnum;
  baseLineParam: BaseLineParamEnum; //  نوع پارامتر 
  fromDate: string; // تاریخ شروع 
  toDate: string; // تاریخ اتمام
  }