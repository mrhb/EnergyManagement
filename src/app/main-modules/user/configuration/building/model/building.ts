import {UseTypeEnum} from './useTypeEnum';

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
  name: string;
  useType: UseTypeEnum;
  constructionYear: string;
  floorNum: string;
  exploitationPersonnelNum: string;
  postalCode: string;
  address: string;
  ownership: string;
  coolingHeatingSystemType: string;
}

export class Area {
  arenaArea: number;
  ayanArea: number;
  useFullArea: number;
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
  constructionYear: number;
  createdAt: any;
  id: string;
  name: string;
  postalCode: string;
  regionId: string;
  useType: UseTypeEnum;
}
