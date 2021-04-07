import {ProvinceEnum, ClimateTypeEnum} from './climateEnum';
  //  اطلاعات اقلیم    
export class ClimateDto {
  regionId: string;// شناسه منطقه  
  province: ProvinceEnum;// استان  
  city: string; // شهر
  village: string;//روستا
  longitude: string; // طول جغرافیایی
  latitude: string;// عرض جغرافیایی 
  height: string; // ارتفاع از سطح دریا
  climateType: ClimateTypeEnum; // نوع اقلیم 
  dominantThermalReq: string; // نیاز غالب حرارتی
  energyDegree: string;  // درجه انرژی
}

  //  اطلاعات آب و هوا و اقلیم (کلی)    
export class ClimateListDto {
  province: ProvinceEnum;// استان  
  climateType: ClimateTypeEnum; // نوع اقلیم 
  city: string; // شهر
  village: string;//روستا
  longitude: string; // طول جغرافیایی
  latitude: string;// عرض جغرافیایی 
  height: string; // ارتفاع از سطح دریا
  dominantThermalReq: string; // نیاز غالب حرارتی
  energyDegree: string;  // درجه انرژی
  year: string;//  انتخاب سال
  tempMaxMean: string;// میانگین حداکثر دما
  tempMinMean: string;// میانگین حداقل دما
  HumidMaxMean: string;// میانگین حداکثر رطوبت
  lowHumidMean: string;// میانگین حداقل رطوبت
  windMean: string;// میانگین سرعت باد 
}

