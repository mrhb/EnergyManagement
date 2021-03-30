import { BillAnalysisParamEnum, BillAnalysisTypeEnum } from "./billEnum";

export class BillAnalysisDto {
  regionId:string
  billAnalysisType: BillAnalysisTypeEnum; //  نوع قبض 
  billAnalysisParam: BillAnalysisParamEnum; //  نوع پارامتر 
  fromDate: string; // تاریخ شروع 
  toDate: string; // تاریخ اتمام
  }