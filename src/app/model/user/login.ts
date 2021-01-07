import {LoginType} from '@app/model/enum/loginType';

export class Login {
  username: string;
  password: string;
  type: LoginType;
  // captcha: string;
}
