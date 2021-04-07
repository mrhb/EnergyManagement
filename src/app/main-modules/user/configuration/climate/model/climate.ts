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
//  اطلاعات آب و هوا (ماهانه)
export class WeatherListDto {
  month: string; // ماه
  tempMaxMean: string;// میانگین حداکثر دما
  tempMinMean: string;// میانگین حداقل دما
  tempMean: string; //میانگین دما
  HumidMaxMean: string;// میانگین حداکثر رطوبت
  lowHumidMean: string;// میانگین حداقل رطوبت
  HumidMean: string; // میانگین رطوبت
  sunRadMean: string; //میانگین تابش خورشید
  windMean: string;// میانگین سرعت باد 
}

  //  اطلاعات آب و هوا (روزانه)    
export class WeatherDto {
  forDate: string; // از تاریخ 
  tempMax: string; // حداکثر دما روزانه
  tempMin: string; // حداقل دما روزانه
  tempAvg: string; // میانگین دما روزانه
  humidityMin: string; // حداقل رطوبت روزانه
  humidityMax: string; //حداکثر رطوبت روزانه
  humidityAvg: string; //میانگین رطوبت روزانه
  sunRad: string; //تابش
  wind: string;//سرعت باد
}
  //  اطلاعات آب و هوا و اقلیم (کلی)    
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
  tempMaxMean: string;// میانگین حداکثر دما
  tempMinMean: string;// میانگین حداقل دما
  HumidMaxMean: string;// میانگین حداکثر رطوبت
  lowHumidMean: string;// میانگین حداقل رطوبت
  windMean: string;// میانگین سرعت باد 
}

