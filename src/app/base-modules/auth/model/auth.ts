import { ProvinceEnum } from "src/app/main-modules/user/configuration/climate/model/climateEnum";

export namespace Auth {
  export class SignIn {
    username: string;
    password: string;
    type: LoginTypeEnum;
  }

  export class SignUp {
    firstName: string;
    lastName: string;
    phone: string; // شماره تلفن ثابت
    userName: string; // نام کاربری
    organizationalUnit: string; //واحد سازمانی
    organizationalLevel: string;
    address: string;// آدرس
    city: string; // شهر
    // province: string; //استان
    province: ProvinceEnum;// استان  
    email: string; //ایمیل
    mobile: string; //شماره همراه
    password: string;
    passwordConfirm: string
  }
   // واحد سازمانی و شماره تلفن ثابت و آدرس وشهر واستان و ایمیل و شماره همراه از فرم ثبت نام حذف شد

  export class ReqForgetPassDto {
    tokenType: LoginTypeEnum;
    username: string;
  }

  export class RestPasswordDto {
    username: string;
    tokenType: LoginTypeEnum;
    token: string;
    password: string;
    passwordConfirm: string;
  }
}

export enum LoginTypeEnum {
  MOBILE = 'MOBILE',
  EMAIL = 'EMAIL'
}
