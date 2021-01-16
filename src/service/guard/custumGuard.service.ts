import {JwtService} from "./jwt.service";
import {Injectable, Injector}                                              from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Tools} from "../../app/shared/tools/tools";
@Injectable()
export class CustomGuardService implements CanActivate {
  decodedToken: any;
  constructor(private jwtService: JwtService, private injector: Injector, private router: Router) {

  }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean | UrlTree> {
    const accessToken = localStorage.getItem('TOKEN');
    let result = false;
    if (accessToken !== 'null') {
      this.decodedToken = this.jwtService.decode(accessToken);
      const role = this.decodedToken.authorities;
      const guards = route.data.guards || [];
      result = guards.some(e => e === role);
    }

    if (!result) {
      this.router.navigate(['/auth']);
    }
    return result;
  }


}
