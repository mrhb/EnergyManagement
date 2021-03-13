export class Tools {

  // Pattern NationalCode
  public static checkNationalCode(value: any) {
    const code = this.Fa2En(value);
    let cont = 0;
    if (typeof value !== "number" && value.length >= 8) {
      const c = parseInt(code.substr(9, 1), 10);
      let s = 0;
      for (let i = 0; i < 9; i++) {
        s += parseInt(code.substr(i, 1), 10) * (10 - i);
        if (code[0] === code[i]) {
          cont++;
        }
      }
      s = s % 11;
      if (cont > 8) {
        return false;
      }
      if ((s < 2 && c === s) || (s >= 2 && c === (11 - s))) {
        return true;
      }
    }
    return false;
  }
  public static isNullOrUndefined(value: any): any {
    return value === undefined || value === null;
  }
  // تبدیل اعداد فارسی به انگلیسی
  public static Fa2En(value: any): any {
    try {
      const englishNumbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.'];
      const persianNumbers = ['۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹', '۰', '٫'];
      for (let i = 0, numbersLen = persianNumbers.length; i < numbersLen; i++) {
        value = value.replace(new RegExp(persianNumbers[i], 'g'), englishNumbers[i]);
      }
      return value;
    } catch (e) {
      return value;
    }
  }

  // تبدیل اعداد انگلیسی به فارسی
  public static EnToFa(value: any): any {
    const persianNumbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '.'];
    const englishNumbers = ['۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹', '۰', '/', '٫'];
    console.log(value);
    for (let i = 0, numbersLen = persianNumbers.length - 1; i < numbersLen; i++) {
      console.log(persianNumbers[i]);
      value = value.replace(new RegExp(persianNumbers[i], 'g'), englishNumbers[i]);
    }
    return value;
  }
}
