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
  forDate: string|false; // از تاریخ 
  tempMax: number; // حداکثر دما روزانه
  tempMin: number; // حداقل دما روزانه
  tempAvg: number; // میانگین دما روزانه
  humidityMin: number; // حداقل رطوبت روزانه
  humidityMax: number; //حداکثر رطوبت روزانه
  humidityAvg: number; //میانگین رطوبت روزانه
  sunRad: number; //تابش
  wind: number;//سرعت باد
}


export class WeatherReqDto {
  regionId:string;
  fromDate: string; // تاریخ شروع 
  toDate: string; // تاریخ اتمام
}