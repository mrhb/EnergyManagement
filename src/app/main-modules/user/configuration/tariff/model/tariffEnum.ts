
export enum GroupEnum {
  POWER = <any> 'برق',
  GAS = <any> 'گاز',
  WATER = <any> 'آب',
}

export enum PowerUseTypeEnum {
  HOME = <any> 'مصارف خانگی',
  GENERAL = <any> 'مصارف عمومی',
  WATER_PRODUCTS = <any> 'مصارف تولیدات آب و کشاورزی',
  INDUSTRY_PRODUCTS = <any> 'مصارف تولید (صنعت و معدن)',
  OTHER = <any> 'سایر مصارف',
}

export enum HomeEnum {
  NORMAL_REGION_NON_WARM_TROPICAL = <any> 'مناطق عادی و ماه های غیر گرم مناطق گرمسیر',
  WARM_TROPICAL_4 = <any> 'ماه های گرم در مناطق گرمسیر 4',
  WARM_TROPICAL_3 = <any> 'ماه های گرم در مناطق گرمسیر 3',
  WARM_TROPICAL_2 = <any> 'ماه های گرم در مناطق گرمسیر 2',
  WARM_TROPICAL_1 = <any> 'ماه های گرم در مناطق گرمسیر 1',
}

export enum GeneralEnum {
  TWO_A_1 = <any> '2-الف-1',
  TWO_A_2 = <any> '2-الف-2',
  TWO_B = <any> '2-ب',
}

export enum Water_productsEnum {
  THREE_A = <any> '3-الف',
  THREE_B = <any> '3-ب',
  THREE_J_1 = <any> '3-ج-1',
  THREE_J_2 = <any> '3-ج-2',
}

export enum Industry_productsEnum {
  FOUR_A_1 = <any> '4-الف-1',
  FOUR_A_2 = <any> '4-الف-2',
  FOUR_A_3 = <any> '4-الف-3',
  FOUR_B_1 = <any> '4-ب-1',
  FOUR_B_2 = <any> '4-ب-2',
  FOUR_B_3 = <any> '4-ب-3',
}

export enum OtherEnum {
  MORE_THAN_30_KW = <any> 'با قدرت بیش از 30 کیلووات',
  LESS_THAN_30_KW_NON_WARM = <any> 'با قدرت 30 کیلووات و کمتر برای مناطق غیر گرمسیر و ماه های غیر گرم مناطق گرمسیر',
  LESS_THAN_30_KW_WARM = <any> 'با قدرت 30 کیلووات و کمتر برای ماه های گرم مناطق گرمسیر',
}

export enum UseCodeEnum {
  NORMAL_REGION_NON_WARM_TROPICAL = <any> 'مناطق عادی و ماه های غیر گرم مناطق گرمسیر',
  WARM_TROPICAL_4 = <any> 'ماه های گرم در مناطق گرمسیر 4',
  WARM_TROPICAL_3 = <any> 'ماه های گرم در مناطق گرمسیر 3',
  WARM_TROPICAL_2 = <any> 'ماه های گرم در مناطق گرمسیر 2',
  WARM_TROPICAL_1 = <any> 'ماه های گرم در مناطق گرمسیر 1',
  TWO_A_1 = <any> '2-الف-1',
  TWO_A_2 = <any> '2-الف-2',
  TWO_B = <any> '2-ب',
  THREE_A = <any> '3-الف',
  THREE_B = <any> '3-ب',
  THREE_J_1 = <any> '3-ج-1',
  THREE_J_2 = <any> '3-ج-2',
  FOUR_A_1 = <any> '4-الف-1',
  FOUR_A_2 = <any> '4-الف-2',
  FOUR_A_3 = <any> '4-الف-3',
  FOUR_B_1 = <any> '4-ب-1',
  FOUR_B_2 = <any> '4-ب-2',
  FOUR_B_3 = <any> '4-ب-3',
  MORE_THAN_30_KW = <any> 'با قدرت بیش از 30 کیلووات',
  LESS_THAN_30_KW_NON_WARM = <any> 'با قدرت 30 کیلووات و کمتر برای مناطق غیر گرمسیر و ماه های غیر گرم مناطق گرمسیر',
  LESS_THAN_30_KW_WARM = <any> 'با قدرت 30 کیلووات و کمتر برای ماه های گرم مناطق گرمسیر',
}

export enum GasUseTypeEnum {
  HOME_CLIMATE_1 = <any> 'خانگی اقلیم 1',
  HOME_CLIMATE_2 = <any> 'خانگی اقلیم 2',
  HOME_CLIMATE_3 = <any> 'خانگی اقلیم 3',
  HOME_CLIMATE_4 = <any> 'خانگی اقلیم 4',
  HOME_CLIMATE_5 = <any> 'خانگی اقلیم 5',
  HOTEL = <any> 'هتل، مسافرخانه',
  COMMERCIAL = <any> 'تجاری (کسب و خدمت)',
  GOVERNMENT_PUBLIC = <any> 'اماکن و تاسیسات دولتی (عمومی)',
  SPORT = <any> 'اماکن ورزشی',
  EDUCATIONAL = <any> 'آموزشی',
  GOVERNMENT_EDUCATIONAL = <any> 'آموزشی و پرورشی دولتی',
  NON_GOVERNMENT_EDUCATIONAL = <any> 'آموزشی و پرورشی غیر دولتی',
}

export enum WaterUseTypeEnum {
  DOMESTIC = <any> 'آب و فاضلاب خانگی',
  COMMUNAL = <any> 'آب و فاضلاب مصارف اشتراکی',
  GENERAL = <any> 'مصارف عمومی',
  FREE = <any> 'آب فاضلاب آزاد',
  GREEN = <any> 'فضای سبز',
  PRODUCTION = <any> 'تولیدی',
  COMMERCIAL = <any> 'مصارف تجاری',
}

export enum UseCodeWaterEnum {
  RESIDENTIAL = <any> 'مسکونی',
  PUBLIC_GOVERNMENTAL = <any> 'عمومی و دولتی',
  EDUCATIONAL_RELIGIOUS_PLACES = <any> 'آموزشی و اماکن مذهبی',
  COMMERCIAL = <any> 'تجاری',
  INDUSTRIAL = <any> 'صنعتی',
  FREE_BUILT = <any> 'آزاد و بنایی',
  FREE_INDUSTRIAL_CONSTRUCTION = <any> 'آزاد و بنایی صنعتی',
  FREE_COMMERCIAL_BUILDING = <any> 'آزاد و بنایی تجاری',
  FREE_PUBLIC_CONSTRUCTION = <any> 'آزاد و بنایی عمومی',
  OTHER = <any> 'سایر',
}
