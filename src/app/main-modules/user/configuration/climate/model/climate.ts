import {ProvinceEnum, ClimateTypeEnum} from './climateEnum';

export class ClimateDto {
  province: ProvinceEnum;// استان  
  climateType: ClimateTypeEnum; // نوع اقلیم 
  city: string; // شهر
  rusta: string;//
  longitude: string;
  latitude: string;
  ertefa: string;
  ghaleb: string;
  energyDegree: string;  
  climateKind: string;
  highDegMean: string;
  lowDegMean: string;
  highHumidMean: string;
  lowHumidMean: string;
  windMean: string;
}

export class ClimateList {
  id: string;
  province: ProvinceEnum; // استان
  city: string;// شهر
  longitude: string;
  latitude: string;
  climateKind: string;
  highDegMean: string;
  lowDegMean: string;
  highHumidMean: string;
  lowHumidMean: string;
  windMean: string;
}

