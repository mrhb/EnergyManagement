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


export class WeatherReqDto {
  regionId:string;
  fromDate: string; // تاریخ شروع 
  toDate: string; // تاریخ اتمام
}