import {Component, OnInit} from '@angular/core';
import {MyPattern} from '../../../../shared/tools/myPattern';
import {Auth, LoginTypeEnum} from '../../model/auth';
import {Router} from '@angular/router';
import {JwtService} from '../../../../../service/guard/jwt.service';
import {CacheService} from '../../../../_base/cache/_service/cache.service';
import {TOKEN_CACHE_KEY} from '../../../../_base/service/model/rest-constants';
import {Tools} from '../../../../shared/tools/tools';
import {AuthService} from '../../service/auth.service';
import {ROLE_ADMIN, ROLE_USER} from '../../../../shared/constants/role.constants';
// @ts-ignore
import Notiflix from 'notiflix';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DataService} from '../../../../../service/dataService/dataService';
import {ProfileService} from '../../../../main-modules/user/profile/service/profile.service';

/**
 * create By reza mollaei
 * Email: reza_yki@yahoo.com
 * telegram: reza_yki
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  decodedToken: any;
  dto = new Auth.SignIn();
  enumType = LoginTypeEnum;
  myPattern = MyPattern;
  loginForm: FormGroup;
  touched = false;

  constructor(private authService: AuthService,
              private formBuilder: FormBuilder,
              private jwtService: JwtService,
              private profileService: ProfileService,
              private router: Router) {

    const accessToken = localStorage.getItem(TOKEN_CACHE_KEY);
    if (!Tools.isNullOrUndefined(accessToken)) {
      this.routingToPanel(accessToken);
    }

    this.loginForm = this.formBuilder.group({
      username: [this.dto.username, [Validators.required, Validators.minLength(3), Validators.pattern(this.myPattern.phoneOrEmail)]],
      password: [this.dto.password, [Validators.required, Validators.minLength(3), Validators.pattern(this.myPattern.password)]],
    });
  }

  ngOnInit(): void {
    Notiflix.Block.Init({svgSize: '28px', svgColor: '#ffffff', backgroundColor: 'rgba(0,123,255,0.9)'});
  }

  signIn(): void {
    this.touched = true;
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      Notiflix.Notify.Failure('ورودی ها بررسی شود.');
      return;
    }

    this.checkMobileOrEmail();
    Notiflix.Block.Arrows('#loginBtn');
    this.authService.login(this.dto, '#loginBtn').subscribe((res: any) => {
      if (res) {
        Notiflix.Block.Remove('#loginBtn');
        if (res.flag) {
          // CacheService.setLocalStorage(TOKEN_CACHE_KEY, res.data);
          localStorage.setItem(TOKEN_CACHE_KEY, res.data);
          this.routingToPanel(res.data);
        } else {
          Notiflix.Notify.Failure(res.message);
        }
      }
    });
  }

  getAccount(): void {
    this.profileService.getOne()
      .subscribe((res: any) => {
        if (res) {
          if (res.flag) {
            localStorage.setItem('account', JSON.stringify(res.data));
            DataService.setAccount(res.data);
          }
        }
      });
  }

  checkMobileOrEmail(): void {
    if ((this.dto.username.match(this.myPattern.email))) {
      this.dto.type = this.enumType[this.enumType.EMAIL.toString()];
    } else if ((this.dto.username.match(this.myPattern.phone))) {
      this.dto.type = this.enumType[this.enumType.MOBILE.toString()];
    }
  }

  routingToPanel(accessToken): void {
    console.log('accessToken', accessToken);
    if (!accessToken) {
      return;
    }
    this.decodedToken = this.jwtService.decode(accessToken);
    const role = this.decodedToken.authorities;
    console.log('this.decodedToken', this.decodedToken);
    console.log('role', role);
    // if (role === ROLE_ADMIN) {
    //   this.getAccount()
    //   // this.router.navigateByUrl('/index/admin');
    //   this.router.navigateByUrl('/index/admin/analysis/dashboard').then();
    // } else if (role === ROLE_USER) {
      //   // this.router.navigate(['/index/user']);
      // }
        this.getAccount();
        this.router.navigateByUrl('/index/user/analysis/dashboard').then();
    }

}
