import { Injectable } from '@angular/core';
import {CanActivate} from '@angular/router';
import {JwtService} from './jwt.service';
import {ROLE_USER} from '../../app/shared/constants/role.constants';

@Injectable()
export class UserGuardService implements CanActivate {
  decodedToken: any;
  constructor(private jwtService: JwtService) {
  }
  canActivate(): boolean {
    const accessToken = localStorage.getItem('TOKEN');
    this.decodedToken = this.jwtService.decode(accessToken);
    const role = this.decodedToken.authorities;
    console.log('role', role);
    if (role === ROLE_USER ) {
      return true;
    } else {
      return false;
    }
  }
}
