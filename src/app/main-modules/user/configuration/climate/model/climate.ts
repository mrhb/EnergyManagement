import {ProvinceEnum, ClimateTypeEnum} from './climateEnum';
  //  اطلاعات اقلیم    
export class ClimateDto {
  fromDate: string; // تاریخ شروع 
  toDate: string; // تاریخ اتمام
  regionId: string;// شناسه منطقه  
  regionTitle: string; // عنوان منطقه  
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
  _id: string;
  title:string;
  province: ProvinceEnum;// استان  
  climateType: ClimateTypeEnum; // نوع اقلیم 
  city: string; // شهر
  longitude: string; // طول جغرافیایی
  latitude: string;// عرض جغرافیایی 

  tempMaxMean: string;// میانگین حداکثر دما
  tempMinMean: string;// میانگین حداقل دما
  HumidMaxMean: string;// میانگین حداکثر رطوبت
  lowHumidMean: string;// میانگین حداقل رطوبت
  windMean: string;// میانگین سرعت باد 
}

 //  لیست آب و هوا    
 export class ClimateList {
  _id: string;
  title:string;
  province: ProvinceEnum;// استان  
  climateType: ClimateTypeEnum; // نوع اقلیم 
  city: string; // شهر
  longitude: string; // طول جغرافیایی
  latitude: string;// عرض جغرافیایی 

  tempMaxMean: string;// میانگین حداکثر دما
  tempMinMean: string;// میانگین حداقل دما
  HumidMaxMean: string;// میانگین حداکثر رطوبت
  lowHumidMean: string;// میانگین حداقل رطوبت
  windMean: string;// میانگین سرعت باد 
}

