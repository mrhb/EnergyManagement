import {chartTypeEnum, EffectiveParameterEnum, PeriodEnum} from './chartEnum';

export class ChartFilter {
  fromDate: any;
  toDate: any;
  period: PeriodEnum = PeriodEnum[PeriodEnum.MONTHLY.toString()];
  effectiveParameterList: EffectiveParameterEnum[] = [];
  chartType: chartTypeEnum = chartTypeEnum[chartTypeEnum.LINEAR.toString()];
  buildingId: string;
}
