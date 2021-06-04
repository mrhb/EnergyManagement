import { EnergyLabelTypeEnum } from "./EnergyLabelType";

export class EnergyLabel {
  powerReceipt: number;
  gasReceipt: number;
  GASOLIN: number;
  BENZIN: number;
  GAS: number;

  ratio: string;
  consumptionIndex: string;
  label: string;
  labelType: EnergyLabelTypeEnum;
}

export class EnergyLableDto {
  year: number=1397;
  buildingId:string;
  energyLabelType:EnergyLabelTypeEnum;
}

