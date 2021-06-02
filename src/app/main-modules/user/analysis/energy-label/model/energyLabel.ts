import { EnergyLabelType } from "./EnergyLabelType";

export class EnergyLabel {
  ratio: string;
  consumptionIndex: string;
  label: string;
  labelType: EnergyLabelType;
}

export class EnergyLableDto {
  year: number;
  buildingId:string;
}
