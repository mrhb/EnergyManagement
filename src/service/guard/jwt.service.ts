import {Injectable} from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';

const helper = new JwtHelperService();

@Injectable()
export class JwtService {

  constructor() {
  }

  decode(token: string | null ): void {
    return helper.decodeToken(token);
  }
}
