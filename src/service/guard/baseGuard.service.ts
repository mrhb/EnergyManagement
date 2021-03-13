import {CanActivate} from "@angular/router";
import {Injectable} from "@angular/core";

@Injectable()
export class BaseGuardService implements CanActivate {
  constructor() {
  }


  canActivate(): boolean {
    const access_token = localStorage.getItem('TOKEN');

    if (access_token) {
      return false;
    } else {
      return true;
    }
  }


}
