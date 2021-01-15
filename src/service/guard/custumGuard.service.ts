import {JwtService} from "./jwt.service";
import {Injectable, Injector}                                              from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from "@angular/router";
@Injectable()
export class CustomGuardService implements CanActivate {
  constructor(private jwtService: JwtService, private injector: Injector) {
  }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean | UrlTree> {
    let guards = route.data.guards || [];
    console.log('guards', guards);
    for (let guard of guards) {
      let instance: CanActivate = this.injector.get(guard);
      let result = await instance.canActivate(route, state);
      console.log('CanActivate', result);
      if (result === false || result instanceof UrlTree) {
        return result;
      }
    }
    return true;
  }


}
