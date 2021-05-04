/**
 * Created by Jafar Amini in March 2018.
 */

import * as moment from 'jalali-moment';
import {DateConvert} from './date-convert';
import {Tools} from "./tools";

export class Moment {

  public static add(date,unit) {
    if (date) {
      return moment(date).add('year',unit).format('jYYYY/jMM/jDD');
    }
    return false;
  }

  public static getJaliliDateFromIsoOrFull2(date) {
    if (date) {
      return moment(date).format('jYYYY/jMM/jDD-HH:mm:s:ms');
    }
    return false;
  }

  public static getJaliliDateFromIsoOrFullSec(date) {
    if (date) {
      return moment(date).format('HH:mm:s-jYYYY/jMM/jDD');
    }
    return false;
  }

  public static getJaliliDateFromIsoOrFull(date) {
    if (date) {
      return moment(date).format('HH:mm -jYYYY/jMM/jDD');
    }
    return false;
  }

  public static getHorseAndMinFromIsoOrFull(date) {
    if (date) {
      return moment(date).format('HH:mm');
    }
    return false;
  }

  public static getJaliliDateFromIso(date) {
    if (date) {
      return moment(date).format('jYYYY/jMM/jDD');
    }
    return false;
  }

  public static DateDiff(start,end) {
    if (start && end )
     {
      return moment(end).diff( moment(start),'days');
    }
    return false;
  }

  public static getGregorianDateFromIsoOrFull(date) {
    if (date) {
      return moment(date).format('HH:mm - YYYY/MM/DD');
    }
    return false;
  }

  public static getGregorianDateFromIso(date) {
    if (date) {
      return moment(date).format('YYYY/MM/DD');
    }
    return false;
  }


  public static convertJaliliToGregorian(jDate) {
    return moment(
      moment(Tools.Fa2En(jDate), 'jYYYY/jMM/jDD').toISOString()
    ).format('YYYY/MM/DD');
  }

  public static convertJaliliToGregorianWithTime(jDate) {
    return moment(
      moment(Tools.Fa2En(jDate), 'HH:mm - jYYYY/jMM/jDD').toISOString()
    ).format('HH:mm - YYYY/MM/DD');
  }

  public static convertGregorianToJalili(date) {
    return moment(
      moment(Tools.Fa2En(date), 'YYYY/MM/DD').toISOString()
    ).format('YYYY/MM/DD');
  }

  public static convertGregorianToJaliliWithTime(date) {
    return moment(
      moment(Tools.Fa2En(date), 'HH:mm - YYYY/MM/DD').toISOString()
    ).format('HH:mm - YYYY/MM/DD');
  }

  public static convertJaliliToIsoDate(jDate) {
    return moment(Tools.Fa2En(jDate), 'jYYYY/jMM/jDD').toISOString();
  }

  public static convertJaliliToDate(jDate) {
    return moment(Tools.Fa2En(jDate), 'jYYYY/jMM/jDD');
  }

  public static convertJaliliToIsoDateWithTime(jDate) {
    return moment(Tools.Fa2En(jDate), 'jYYYY/jMM/jDD - h:m').toISOString();
  }

  public static convertGregorianToIsoDate(jDate) {
    return moment(Tools.Fa2En(jDate), 'YYYY/MM/DD').toISOString();
  }

  public static convertGregorianToIsoDateWithTime(jDate) {
    return moment(Tools.Fa2En(jDate), 'HH:mm - YYYY/MM/DD').toISOString();
  }


  public static convertJaliliToDateWithTime(jDate) {
    return moment(Tools.Fa2En(jDate), 'HH:mm - jYYYY/jMM/jDD').toDate();
  }

  public static convertIsoToDateWithTime(date) {
    return moment(date).toDate();

  }

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  public static convertIsoToJDateWithTimeEnToFa(date) {
    const dateConvert = DateConvert;
    if (date) {
      // const y = date.split('-')[0];
      // const m = date.split('-')[1];
      // const d = +date.split('-')[2].split('T')[0];
      // const pDate = dateConvert.convertGToP(y, m, d);
      // // const h = new Date(date).getHours();
      // const h = date.split('-')[2].split('T')[1].split(':')[0];
      // // const min = new Date(date).getMinutes();
      // const min = date.split('-')[2].split('T')[1].split(':')[1];
      // const time = h + ':' + min;
      // return Toolkit2.Common.En2Fa((pDate[0] + '/' + pDate[1] + '/' + pDate[2] + '-' + time));


      const y = +date.split('-')[0];
      const m = +date.split('-')[1];
      const d = +date.split('-')[2].split('T')[0];
      const h = date.split('-')[2].split('T')[1].split(':')[0];
      const min = date.split('-')[2].split('T')[1].split(':')[1];
      const res = this.convertDateByTimZone(y, m, d, h, min);
      return Tools.Fa2En(res.y + '/' + res.m + '/' + res.d + '-' + res.h + ':' + res.min);


    } else {
      return ('--------');
    }
  }

  public static convertIsoToJDateEnToFa(date) {
    const dateConvert = DateConvert;
    if (date) {
      const y = date.split('-')[0];
      const m = date.split('-')[1];
      const d = +date.split('-')[2].split('T')[0];
      const pDate = dateConvert.convertGToP(y, m, d);
      // const h = new Date(date).getHours();
      const h = date.split('-')[2].split('T')[1].split(':')[0];
      // const min = new Date(date).getMinutes();
      const min = date.split('-')[2].split('T')[1].split(':')[1];
      const time = h + ':' + min;
      return Tools.Fa2En((pDate[0] + '/' + pDate[1] + '/' + pDate[2]));
    } else {
      return ('--------');
    }
  }

  public static convertGDateToJDateEnToFa(date, persian) {
    const dateConvert = DateConvert;
    if (date) {
      const y = date.split('-')[0];
      const m = date.split('-')[1];
      const d = +date.split('-')[2];
      const pDate = dateConvert.convertGToP(y, m, d);
      // const h = new Date(date).getHours();
      // const h = date.split('-')[2].split('T')[1].split(':')[0];
      // const min = new Date(date).getMinutes();
      // const min = date.split('-')[2].split('T')[1].split(':')[1];
      // const time = h + ':' + min;
      if(persian) {
        return Tools.Fa2En((pDate[0] + '/' + pDate[1] + '/' + pDate[2]));
      } else {
        return pDate[0] + '/' + pDate[1] + '/' + pDate[2];
      }
    } else {
      return ('--------');
    }
  }

  public static convertIsoToJDateOnlyTimeEnToFa(date) {
    if (date) {
      // // const h = new Date(date).getHours();
      // const h = date.split('-')[2].split('T')[1].split(':')[0];
      // // const min = new Date(date).getMinutes();
      // const min = date.split('-')[2].split('T')[1].split(':')[1];
      // const time = h + ':' + min;
      // return Tools.Fa2En((time));


      const y = +date.split('-')[0];
      const m = +date.split('-')[1];
      const d = +date.split('-')[2].split('T')[0];
      const h = date.split('-')[2].split('T')[1].split(':')[0];
      const min = date.split('-')[2].split('T')[1].split(':')[1];
      const res = this.convertDateByTimZone(y, m, d, h, min);
      return Tools.Fa2En(res.h + ':' + res.min);

    } else {
      return ('--------');
    }
  }

  public static convertIsoToJDateWithTime(date) {

    if (date) {
      const y = +date.split('-')[0];
      const m = +date.split('-')[1];
      const d = +date.split('-')[2].split('T')[0];
      const h = date.split('-')[2].split('T')[1].split(':')[0];
      const min = date.split('-')[2].split('T')[1].split(':')[1];
      const res = this.convertDateByTimZone(y, m, d, h, min);
      return (res.y + '/' + res.m + '/' + res.d + '-' + res.h + ':' + res.min);
    } else {
      return ('--------');
    }
  }

  public static convertIsoToJDateFa(date) {
    const dateConvert = DateConvert;
    const myMoment = Moment;
    if (date) {
      // const y = date.split('-')[0];
      // const m = date.split('-')[1];
      // const d = +date.split('-')[2].split('T')[0];
      // const pDate = dateConvert.convertGToP(y, m, d);
      // return Tools.Fa2En(pDate[0] + '/' + pDate[1] + '/' + pDate[2]);


      const y = +date.split('-')[0];
      const m = +date.split('-')[1];
      const d = +date.split('-')[2].split('T')[0];
      const h = date.split('-')[2].split('T')[1].split(':')[0];
      const min = date.split('-')[2].split('T')[1].split(':')[1];
      const res = this.convertDateByTimZone(y, m, d, h, min);
      return Tools.Fa2En(res.y + '/' + res.m + '/' + res.d);

    } else {
      return ('--------');
    }

  }

  public static convertIsoToJDate(date) {
    const dateConvert = DateConvert;
    const myMoment = Moment;
    if (date) {
      const y = date.split('-')[0];
      const m = date.split('-')[1];
      const d = +date.split('-')[2].split('T')[0];
      const pDate = dateConvert.convertGToP(y, m, d);
      return (pDate[0] + '/' + pDate[1] + '/' + pDate[2]);
    } else {
      return ('--------');
    }

  }

  public static getJDateFromIsoOnlyYear(date) {

    if (date) {
      const y = +date.split('-')[0];
      const m = +date.split('-')[1];
      const d = +date.split('-')[2].split('T')[0];
      const h = date.split('-')[2].split('T')[1].split(':')[0];
      const min = date.split('-')[2].split('T')[1].split(':')[1];
      const res = this.convertDateByTimZone(y, m, d, h, min);
      return (res.y);
    } else {
      return ('--------');
    }
  }

  public static getDayTitle(day) {
    switch (day) {
      case 0:
        return 'یکشنبه';
      case 1:
        return 'دوشنبه';
      case 2:
        return 'سه شنبه';
      case 3:
        return 'چهارشنبه';
      case 4:
        return 'پنجشنبه';
      case 5:
        return 'جمعه';
      case 6:
        return 'شنبه';
    }
    return false;
  }

  public static convertDateByTimZone(y, m, d, h, min) {
    const dateConvert = DateConvert;
    const pDate = dateConvert.convertGToP(y, m, d);
    const timeZoneOffset = new Date().getTimezoneOffset();
    // const hz = +(timeZoneOffset / 60).toString().split('.')[0] * -1;// ساعت تایم زون لوکال
    const minZ = +(timeZoneOffset % 60) * -1;// دقیقه تایم زون لوکال
    let minFa: any = +min + minZ;
    let hFa: any = +JSON.parse(JSON.stringify(h));
    let yFa = +JSON.parse(JSON.stringify(pDate[0]));
    let mFa: any = +JSON.parse(JSON.stringify(pDate[1]));
    let dFa: any = +JSON.parse(JSON.stringify(pDate[2]));
    // hFa += hz;
    if (mFa > 7) {
      hFa += 3;
    } else {
      hFa += 4;
    }
    if (minFa > 59) {
      minFa = minFa - 60;
      hFa += 1;
    }
    if (hFa > 23) {
      hFa = hFa - 24;
      dFa += 1;
    }
    if (mFa === 12) {
      if (dFa > 29) {
        dFa = dFa - 29;
        mFa = 1;
        yFa += 1;
      }
    } else if (mFa < 7) {
      if (dFa > 31) {
        dFa = dFa - 31;
        mFa += 1;
      }
    } else if (mFa > 7) {
      if (dFa > 30) {
        dFa = dFa - 30;
        mFa += 1;
      }
    }
    hFa.toString().length === 1 ? hFa = '0' + hFa : '';
    minFa.toString().length === 1 ? minFa = '0' + minFa : '';
    mFa.toString().length === 1 ? mFa = '0' + mFa : '';
    dFa.toString().length === 1 ? dFa = '0' + dFa : '';
    const date = {
      y: yFa,
      m: mFa,
      d: dFa,
      h: hFa,
      min: minFa
    };
    return date;
  }
}


// 2018-12-19T13:35:00.000Z
// 2018-12-17T13:45:51.380Z
