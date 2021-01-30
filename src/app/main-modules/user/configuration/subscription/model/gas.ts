import {GroupGasEnum, UseTypeGasEnum} from './gasEnum';

export class GasDto {
  name: string;
  address: string;
  billingId: string;
  city: string;
  domainCode: string;
  addressCode: string;
  numberShare: string;
  fileNumber: string;
  serialShare: string;
  useType: UseTypeGasEnum;
  group: GroupGasEnum;
  capacity: string;
  coefficient: string;
}
