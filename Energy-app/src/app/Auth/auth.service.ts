import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { throwError, of } from 'rxjs';
import { map } from 'rxjs/operators';
// import { OStore } from '@fireflysemantics/slice';
import { Observable } from 'rxjs';

/** The user key */
export const USER_KEY = "USER_KEY";
export const AUTHENTICATION_ERROR_KEY = "AUTHENTICATION_ERROR_KEY"; 
export const AUTHENTICATION_ERROR_MESSAGE = 'Invalid username or password';

/** Auth Service */
@Injectable({
  providedIn: 'root',
})
export class AuthService {

  //CREATE THE OBJECT STORE
//   public ostore = new OStore();

  //REACTIVE STATE OBSERVABLES
  public user$:Observable<string>;
  public isAuthenticated$:Observable<boolean>; 
  public authenticationError$:Observable<string | boolean>;

  constructor(private router: Router) {
    //INITIALIZE OBJECT STORE STATE
    // this.ostore.post(USER_KEY, null);
    // this.ostore.post(AUTHENTICATION_ERROR_KEY, false);
    //INITIALIZE THE isAuthenticated$ State
    // this.isAuthenticated$ = this.ostore.observe(USER_KEY).pipe(map(u=>!!u));
    // this.authenticationError$ = this.ostore.observe(AUTHENTICATION_ERROR_KEY);
    // this.user$=this.ostore.observe(USER_KEY);
  }

  login(username: string, password:string) {
    this.authenticate(username, password).subscribe(
      user => {
        // this.ostore.put(USER_KEY, user);
        // this.ostore.put(AUTHENTICATION_ERROR_KEY, false);
        this.router.navigate(['/']);
      },
      (error)=>{
        // this.ostore.put(AUTHENTICATION_ERROR_KEY, error);
      });
  }

  logout() {
    // this.ostore.put(USER_KEY, null);
    this.router.navigate(['/login']);
  }

  /**
   * Mock server authentication call
   */
  private authenticate(username:string, password:string) {
  // Mock Authentication Check
  if (username !== 'user') {
      return throwError(AUTHENTICATION_ERROR_MESSAGE);
  }
  return of({ name: username });
  }
}