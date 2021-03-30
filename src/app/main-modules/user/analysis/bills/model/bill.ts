import { BillAnalysisParamEnum, BillTypeEnum } from "./billEnum";

export class BillAnalysisDto {
  regionId:string
  billAnalysisType: BillTypeEnum; //  نوع قبض 
  billAnalysisParam: BillAnalysisParamEnum; //  نوع پارامتر 
  fromDate: string; // تاریخ شروع 
  toDate: string; // تاریخ اتمام
  }