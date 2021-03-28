// نوع تحلیل اشتراک گاز
export enum PowerAnalysisTypeEnum {
  DEMAND_PENALTY = <any> 'جریمه دیماند',
  DEMAND = <any> ' تحلیل دیماند',
  DEMAND_SUM = <any> 'مجموع دیماند قراردادی',
  REACTIVE = <any> 'جریمه بار راکتیو',
  TARIFF = <any> ' تعرفه', //io عنوان تعرفه
  VOLTAGE = <any> 'ولتاژ تغذیه',
  }