import {JwtService} from "./jwt.service";
import {Injectable, Injector}                                              from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
@Injectable({
  providedIn: 'root'
})
export class CustomGuardService implements CanActivate {
  decodedToken: any;
  constructor(private jwtService: JwtService, private router: Router, private injector: Injector) {
  }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean | UrlTree> {
    // const guards = route.data.guards || [];
    // console.log('guards', guards);
    // for (const guard of guards) {
    //   const instance: CanActivate = this.injector.get(guard);
    //   const result = await instance.canActivate(route, state);
    //   console.log('CanActivate', result);
    //   if (result === false || result instanceof UrlTree) {
    //     return result;
    //   }
    // }
    // return true;

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
