import {UseTypeEnum} from './useTypeEnum';
import {CoolingHeatingSystemType, Ownership} from './buildingEnum';
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
  useType: UseTypeEnum; //نوع کاربری
  constructionYear: string;
  floorNum: string; // تعداد طبقات
  exploitationPersonnelNum: string;
  postalCode: string; // کد پستی
  address: string;
  ownership: Ownership;
  coolingHeatingSystemType: CoolingHeatingSystemType; //نوع سیستم سرمایش  و گرمایش
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
  useType: UseTypeEnum; //نوع کاربری
  floorNum: string; // تعداد طبقات
  arenaArea: number; //مساحت عرصه
  ayanArea: number; //مساحت اعیان
  useFullArea: number; //مساحت مفید
  id: string;//تعداد انشعابها
  coolingHeatingSystemType: CoolingHeatingSystemType; //نوع سیستم سرمایش  و گرمایش
  postalCode: string; // کد پستی
}

export class EnergyLabel {
  ratio: string;
  consumptionIndex: string;
  label: string;
  labelType: EnergyLabelType;
}

