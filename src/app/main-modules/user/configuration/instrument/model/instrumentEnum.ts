//کاربری تجهیز
export enum UseTypeInstrumentEnum {
  CENTERALAIRCONDITION = <any>'تاسیسات مرکزی تهویه مطبوع',
  LOCALAIRCONDITION = <any>'تاسیسات موضعی تهویه مطبوع',
  OFICE = <any>' تجهیزات اداری پر کاربرد',
  LIGHTING = <any>'تجهیزات روشنایی',
  SERVER = <any>'تجهیزات سروری',
  KITCHEN = <any>'تجهیزات آبدارخانه و آشپزخانه',
  OTHERS = <any>' تجهیزات متفرقه',
}

export enum  CenteralairConditionEnum {
  HOT_WATER_BOILER = <any> 'دیگ آب گرم',
  BOILER = <any> 'دیگ بخار',
  COLD_WATER_COMPRESSION_CHILLER = <any> 'چیلر تراکمی آب خنک ',
  COOL_AIR_COMPRESSION_CHILLER = <any> 'چیلر تراکمی هوا خنک ',
  ABSORPTION_CHILLER_= <any> 'چیلر جذبی ',
  COOLING_TOWER = <any> 'برج خنک کننده',
  AIR_CONDITIONER = <any> 'هواساز ',
  AIRWASHER = <any> 'ایرواشر ',
  PUMP = <any> 'پمپ ',
  OTHER1 = <any> 'سایر تجهیزات ',
  OTHER11 = <any> '  ',
  
}//  'تاسیسات موضعی تهویه مطبوع

export enum LocalairConditionEnum {
  WINDOW_AIR_CONDITIONER = <any> 'کولر گازی پنجره ای ',
  SPLIT = <any> 'اسپلیت',
  FAN_COIL = <any> 'فن کویل ',
  WATER_COOLER = <any> 'کولر آبی ',
  RADIATOR = <any> 'رادیاتور ',
  PACKAGE = <any> 'پکیج ',
  WATER_HEATER = <any> 'آبگرمکن ',
  OTHER2 = <any> 'سایر ',
  OTHER21 = <any> '  ',
} // تاسیسات موضعی تهویه مطبوع

export enum OficeEnum {
  COMPUTER = <any> 'کامپیوتر ',
  LAPTOP = <any> 'لپ تاپ ',
  ALL_IN_ONE = <any> 'all in one ',
  LASER_PRINTER = <any> 'پرینتر لیزری ',
  INKJET_PRINTER = <any> 'پرینتر جوهرافشان',
  THREE_WORKS = <any> 'سه کاره',
  SCANNER = <any> 'اسکنر',
  FAX = <any> 'فکس ',
  PHOTOCOPY = <any> 'فتوکپی ',
  OTHER3 = <any> 'سایر ',
  OTHER31 = <any> '  ',
}// تجهیزات اداری پر کاربرد

export enum LightingEnum {
  LOW_CONSUMPTION = <any> 'کم مصرف ',
  LED = <any> 'LED ',
  MOONLIGHT = <any> 'مهتابی ',
  FPL = <any> 'FPL ',
  SODIUM_VAPOR = <any> 'بخار سدیم ',
  METAL_HALLIDAY = <any> 'متال هالید ',
  MERCURY_VAPOR = <any> 'بخار جیوه ',
  STRING = <any> 'رشته ای ',
  HALOGEN = <any> 'هالوژن ',
  OTHER4 = <any> 'سایر ',
  OTHER41 = <any> '  ',
} //تجهیزات روشنایی

export enum ServerEnum {
  SERVER = <any> 'سرور',
  SWITCH = <any> 'سوئیچ',
  OTHER5 = <any> 'سایر',
  OTHER51 = <any> '  ',
   } //تجهیزات سروری
      
export enum KitchrnEnum {
  REFRIGERATOR = <any> 'یخچال',
  MICROWAVE = <any> 'مایکرویو',
  DESKTOP_GAS = <any> 'گاز رومیزی ',
  KETTLE_AND_SAMOVAR = <any> 'کتری و سماور  ',
  TEA_MAKER = <any> 'چای ساز',
  INDUSTRIAL_GAS = <any> 'گاز صنعتی ',
  BARBECUE = <any> 'کباب پز',
  HOOD = <any> 'هود',
  AIR_DISCHARGE_FAN = <any> 'فن تخلیه هوا',
  OTHER6 = <any> 'سایر',
  OTHER61 = <any> '  ',
} //تجهیزات آبدارخانه و آشپزخانه

export enum OthersEnum {
  TELEVISION = <any> 'تلویزیون',
  FAN = <any> 'پنکه',
  WATER_COOLING = <any> 'آب سردکن',
  PAPER_EATER = <any> 'کاغذ خوردکن ',
  VIDEO_PROJECTOR = <any> 'ویدئو پرژکتور',
  DRY_YOUR_HANDS = <any> 'دست خشک کن',
  ELEVATOR = <any> 'آسانسور',
  WASHING_MACHINE = <any> 'ماشین لباسشویی',
  VACUUM_CLEANER = <any> 'جاروبرقی',
  OTHER7 = <any> 'سایر',
  OTHER71 = <any> '  ',
   } //تجهیزات  متفرقه',

export enum NameEnum {
  HOT_WATER_BOILER = <any> 'دیگ آب گرم',
  BOILER = <any> 'دیگ بخار',
  COLD_WATER_COMPRESSION_CHILLER = <any> 'چیلر تراکمی آب خنک ',
  COOL_AIR_COMPRESSION_CHILLER = <any> 'چیلر تراکمی هوا خنک ',
  ABSORPTION_CHILLER_= <any> 'چیلر جذبی ',
  COOLING_TOWER = <any> 'برج خنک کننده',
  AIR_CONDITIONER = <any> 'هواساز ',
  AIRWASHER = <any> 'ایرواشر ',
  PUMP = <any> 'پمپ ',
  OTHER1 = <any> 'سایر تجهیزات ',
  WINDOW_AIR_CONDITIONER = <any> 'کولر گازی پنجره ای ',
  SPLIT = <any> 'اسپلیت',
  FAN_COIL = <any> 'فن کویل ',
  WATER_COOLER = <any> 'کولر آبی ',
  RADIATOR = <any> 'رادیاتور ',
  PACKAGE = <any> 'پکیج ',
  WATER_HEATER = <any> 'آبگرمکن ',
  OTHER2 = <any> 'سایر ',
  COMPUTER = <any> 'کامپیوتر ',
  LAPTOP = <any> 'لپ تاپ ',
  ALL_IN_ONE = <any> 'all in one ',
  LASER_PRINTER = <any> 'پرینتر لیزری ',
  INKJET_PRINTER = <any> 'پرینتر جوهرافشان',
  THREE_WORKS = <any> 'سه کاره',
  SCANNER = <any> 'اسکنر',
  FAX = <any> 'فکس ',
  PHOTOCOPY = <any> 'فتوکپی ',
  OTHER3 = <any> 'سایر ',
  LOW_CONSUMPTION = <any> 'کم مصرف ',
  LED = <any> 'LED ',
  MOONLIGHT = <any> 'مهتابی ',
  FPL = <any> 'FPL ',
  SODIUM_VAPOR = <any> 'بخار سدیم ',
  METAL_HALLIDAY = <any> 'متال هالید ',
  MERCURY_VAPOR = <any> 'بخار جیوه ',
  STRING = <any> 'رشته ای ',
  HALOGEN = <any> 'هالوژن ',
  OTHER4 = <any> 'سایر ',
  SERVER = <any> 'سرور',
  SWITCH = <any> 'سوئیچ',
  OTHER5 = <any> 'سایر',
  REFRIGERATOR = <any> 'یخچال',
  MICROWAVE = <any> 'مایکرویو',
  DESKTOP_GAS = <any> 'گاز رومیزی ',
  KETTLE_AND_SAMOVAR = <any> 'کتری و سماور  ',
  TEA_MAKER = <any> 'چای ساز',
  INDUSTRIAL_GAS = <any> 'گاز صنعتی ',
  BARBECUE = <any> 'کباب پز',
  HOOD = <any> 'هود',
  AIR_DISCHARGE_FAN = <any> 'فن تخلیه هوا',
  OTHER6 = <any> 'سایر',
  TELEVISION = <any> 'تلویزیون',
  FAN = <any> 'پنکه',
  WATER_COOLING = <any> 'آب سردکن',
  PAPER_EATER = <any> 'کاغذ خوردکن ',
  VIDEO_PROJECTOR = <any> 'ویدئو پرژکتور',
  DRY_YOUR_HANDS = <any> 'دست خشک کن',
  ELEVATOR = <any> 'آسانسور',
  WASHING_MACHINE = <any> 'ماشین لباسشویی',
  VACUUM_CLEANER = <any> 'جاروبرقی',
  OTHER7 = <any> 'سایر',

  }

//حامل انرژی
export enum EnergyCarierEnum {
  ELECTRICITY = <any> 'برق',
  GAS = <any> 'گاز',
  GASOLIN = <any> 'گازوئیل',
  BENZIN = <any> 'بنزین',
}
// واحد
export enum UnitInstrumentEnum {
  LITER = <any> 'لیتر',
  KWATT = <any> 'کیلووات ساعت',
  METER3 = <any> 'مترمکعب',
}