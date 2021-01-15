export namespace Auth {
  export class SignIn {
    username: string;
    password: string;
    type: LoginTypeEnum;
  }

  export class SignUp {
    firstName: string;
    lastName: string;
    phone: string;
    organizationalUnit: string;
    organizationalLevel: string;
    address: string;
    city: string;
    province: string;
    email: string;
    mobile: string;
    password: string;
    passwordConfirm: string
  }
  
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
