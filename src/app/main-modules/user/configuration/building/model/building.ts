import {UseTypeBuildingEnum, UtilityTypeEnum} from './useTypeEnum';
import {CoolingSystemType,HeatingSystemType, Ownership} from './buildingEnum';
import {EnergyLabelType} from './EnergyLabelType';

export class CompleteStep {
  zero: boolean;
  one: boolean;
  two: boolean;
  three: boolean;
  four: boolean;
  five: boolean;
}

export class Region {
  regionTitle: string;
  regionId: string;
}

export class Building {
  regionId: string;
  regionTitle: string;
  name: string; // نام ساختمان
  utilityType: UtilityTypeEnum; //نوع کاربری
  useType: UseTypeBuildingEnum; //نوع کاربری
  constructionYear: string;
  floorNum: string; // تعداد طبقات
  exploitationPersonnelNum: string; // تعداد نفرات بهره بردار 
  address: string; // آدرس 
  postalCode: string; // کد پستی
  ownership: Ownership;
  heatingSystemType: HeatingSystemType; //نوع سیستم گرمایش
  coolingSystemType: CoolingSystemType; //نوع سیستم سرمایش 
  powerSharingNum: string;  //تعداد انشعاب برق
  gasSharingNum: string;  //تعداد انشعاب گاز
  waterSharingNum: string;  //تعداد انشعاب آب
  nonEnergyCarrierSharingNum: string;  // تعداد حامل های انرژی غیر 
  arenaArea: number;  //مساحت عرصه
  ayanArea: number; //مساحت اعیان
  useFullArea: number; //مساحت مفید
  externalWallsTotalArea: number; // مساحت کل جداره های خارجی 
  externalGlassTotalArea: number;// مساحت کل شیشه های خارجی 

}

export class Area {
  arenaArea: number;  //مساحت عرصه
  ayanArea: number; //مساحت اعیان
  useFullArea: number; //مساحت مفید
  externalWallsTotalArea: number;
  externalGlassTotalArea: number;
}

export class Space {
  id: string;
  name: string;
  number: number;
  floorNum: number;
  useType: string;
  area: number;
}

export class MapInformation {
  id: string;
  title: string;
  category: string;
  number: number;
  createdAt: any;
  fileLink: string;
}

export class WallInformation {
  exWallAdjOutSpaceArea: string;
  exFloorAdjOutSpaceArea: string;
  exWallAdjNotControlledSpaceArea: string;
  exFloorAdjNotControlledSpaceArea: string;
  exRoofAdjOutSpaceArea: string;
  outWindowAdjOutSpaceArea: string;
  exRoofAdjNotControlledSpaceArea: string;
  windowAdjNotControlledSpaceArea: string;
}

export class BuildingList {
  name: string; // نام ساختمان
  useType: UseTypeBuildingEnum; //نوع کاربری
  floorNum: string; // تعداد طبقات
  arenaArea: number; //مساحت عرصه
  ayanArea: number; //مساحت اعیان
  useFullArea: number; //مساحت مفید
  id: string;//تعداد انشعابها
  heatingSystemType: HeatingSystemType; //نوع سیستم گرمایش
  coolingSystemType: CoolingSystemType; //نوع سیستم سرمایش 
  postalCode: string; // کد پستی
  powerSharingNum: string;  //تعداد انشعاب برق
  gasSharingNum: string;  //تعداد انشعاب گاز
  waterSharingNum: string;  //تعداد انشعاب آب
  nonEnergyCarrierSharingNum: string;  // تعداد حامل های انرژی غیر 
}

export class EnergyLabel {
  ratio: string;
  consumptionIndex: string;
  label: string;
  labelType: EnergyLabelType;
}

