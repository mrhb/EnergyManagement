import { EnergyLabelTypeEnum } from "./EnergyLabelType";

export class EnergyLabel {
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
