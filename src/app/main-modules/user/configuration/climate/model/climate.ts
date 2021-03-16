import {ProvinceEnum, ClimateTypeEnum} from './climateEnum';

export class ClimateDto {
  province: ProvinceEnum;// استان  
  climateType: ClimateTypeEnum; // نوع اقلیم 
  city: string; // شهر
  village: string;//روستا
  longitude: string; // طول جغرافیایی
  latitude: string;// عرض جغرافیایی 
  height: string; // ارتفاع از سطح دریا
  dominantThermalReq: string; // نیاز غالب حرارتی
  energyDegree: string;  // درجه انرژی
}

export class WeatherList {
  month: string; // ماه
  highDegMean: string;// میانگین حداکثر دما
  lowDegMean: string;// میانگین حداقل دما
  DegMean: string; //میانگین دما
  highHumidMean: string;// میانگین حداکثر رطوبت
  lowHumidMean: string;// میانگین حداقل رطوبت
  HumidMean: string; // میانگین رطوبت
  sunRadMean: string; //میانگین تابش خورشید
  windMean: string;// میانگین سرعت باد 
}

export class ClimateList {
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
  highDegMean: string;// میانگین حداکثر دما
  lowDegMean: string;// میانگین حداقل دما
  highHumidMean: string;// میانگین حداکثر رطوبت
  lowHumidMean: string;// میانگین حداقل رطوبت
  windMean: string;// میانگین سرعت باد 
}

