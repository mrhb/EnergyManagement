export class Login {
  username: string;
  password: string;
  type: LoginType;
  // captcha: string;
}


export enum LoginType {
  MOBILE = 'MOBILE',
  EMAIL = 'EMAIL'
}
