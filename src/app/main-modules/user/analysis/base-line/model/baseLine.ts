import { PeriodEnum } from "../../model/chartEnum";
import { BaseLineParamEnum, EnergyTypeEnum } from "./baseLineEnum";

export class BaseLineDto {
  buildingId:string
  energyType: EnergyTypeEnum; //  نوع حامل 
  period:PeriodEnum;
  baseLineParam: BaseLineParamEnum; //  نوع پارامتر 
  fromDate: string; // تاریخ شروع 
  toDate: string; // تاریخ اتمام
  coolingBase: number; //دمای پایه سرمایش
  heatingBase: number; //دمای پایه گرمایش
  }