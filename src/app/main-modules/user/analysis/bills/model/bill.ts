import { BillAnalysisParamEnum, BillTypeEnum } from "./billEnum";

export class BillAnalysisDto {
  regionId:string
  billType: BillTypeEnum; //  نوع قبض 
  billAnalysisParam: BillAnalysisParamEnum; //  نوع پارامتر 
  fromDate: string; // تاریخ شروع 
  toDate: string; // تاریخ اتمام
  }