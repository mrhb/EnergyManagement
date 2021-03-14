// نوع نیروگاه
export enum GenerationTypeEnum {
  DISELGEN = <any> 'دیزل ژنراتور',
  PHOTOVOLTA = <any> 'فتوولتائیک',
  GHP = <any> 'تولید همزمان برق و برودت',
}

// نوع مصرف
export enum ConsumptionTypeEnum {
  SEND2NET = <any> 'فروش به شبکه',
  GOVERNMENT = <any> 'استفاده در محل',
}
