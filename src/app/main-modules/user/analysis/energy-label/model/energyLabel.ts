import { EnergyLabelTypeEnum } from "./EnergyLabelType";

export class EnergyLabel {
  ratio: string;
  consumptionIndex: string;
  label: string;
  labelType: EnergyLabelTypeEnum;
}

export class EnergyLableDto {
  year: number;
  buildingId:string;
  energyLabelType:string;
  energyLabelTypeEnum: EnergyLabelTypeEnum;
}
