import {UseTypeEnum} from './useTypeEnum';

export class Region {
  rootTitle: string;
  parentTitle: string;
  regId: string;
  regTitle: string;
}

export class Building {
  regionId: string;
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
