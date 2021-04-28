import { EnergyTypeEnum } from "../../base-line/model/baseLineEnum";
import { ReportTypeEnum } from "../model/instrumConsumtionEnum";

export class InstrumConsumptionDto {
  buildingId:string;
  reportType: ReportTypeEnum;
  energyType: EnergyTypeEnum; //  نوع حامل 
  fromDate: string; // تاریخ شروع 
  toDate: string; // تاریخ اتمام
}
