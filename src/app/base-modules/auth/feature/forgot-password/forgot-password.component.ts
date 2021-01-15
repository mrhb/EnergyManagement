import {Component, OnInit} from '@angular/core';
import {MyPattern} from '../../../../shared/tools/myPattern';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
// @ts-ignore
import Notiflix from 'notiflix';
import {Auth, LoginTypeEnum} from '../../model/auth';
import {CheckUserService} from '../../service/checkUserService';
import {Router} from "@angular/router";

/**
 * create By reza mollaei reza_yki@yahoo.com
 */
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  touched = false;
  stepForget = 'one';
  myPattern = MyPattern;
  reqForgetPass: FormGroup;
  restPasswordForm: FormGroup;
  fieldType = LoginTypeEnum;
  mobileOrEmailDto = new Auth.ReqForgetPassDto();
  restPasswordDto = new Auth.RestPasswordDto();

  constructor(private checkUserService: CheckUserService,
              private formBuilder: FormBuilder,
              private router: Router) {
    this.reqForgetPass = this.formBuilder.group({
      mobileOrEmail: [this.mobileOrEmailDto.username,
        [Validators.required, Validators.minLength(3), Validators.pattern(this.myPattern.phoneOrEmail)]],
    });

    this.restPasswordForm = this.formBuilder.group({
      token: [this.restPasswordDto.token,
        [Validators.required, Validators.minLength(6), Validators.maxLength(6), Validators.pattern(this.myPattern.number)]],
      password: [this.restPasswordDto.password,
        [Validators.required, Validators.minLength(3), Validators.pattern(this.myPattern.password)]],
      passwordConfirm: [this.restPasswordDto.passwordConfirm,
        [Validators.required, Validators.minLength(3), Validators.pattern(this.myPattern.password)]],
    }, {
      validators: this.checkValidators('password', 'passwordConfirm')
    });
  }

  ngOnInit(): void {
    Notiflix.Block.Init({svgSize: '28px', svgColor: '#ffffff', backgroundColor: 'rgba(0,123,255,0.9)'});
  }

  checkValidators(item1: any, item2: any): (group: FormGroup) => any {
    return (group: FormGroup) => {
      const passwordInput = group.controls[item1],
        passwordConfirmationInput = group.controls[item2];
      if (passwordInput.value !== passwordConfirmationInput.value) {
        return passwordConfirmationInput.setErrors({passwordMismatch: true});
      } else {
        return passwordConfirmationInput.setErrors(null);
      }
    };
  }

  reqForgetPassword(): void {
    this.touched = true;
    if (this.reqForgetPass.invalid) {
      this.reqForgetPass.markAllAsTouched();
      Notiflix.Notify.Failure('ورودی ها بررسی شود.');
      return;
    }
    this.checkMobileOrEmail();
    Notiflix.Block.Arrows('#reqBtn');
    this.checkUserService.reqForgetPass(this.mobileOrEmailDto, '#reqBtn').subscribe((res: any) => {
      if (res) {
        this.touched = false;
        Notiflix.Block.Remove('#reqBtn');
        console.log('res', res);
        if (res.flag) {
          this.stepForget = 'two';
        } else {
          Notiflix.Notify.Failure(res.message);
        }
      }
    });
  }

  checkMobileOrEmail(): void {
    if ((this.mobileOrEmailDto.username.match(this.myPattern.email))) {
      this.mobileOrEmailDto.tokenType = this.fieldType[this.fieldType.EMAIL.toString()];
    } else if ((this.mobileOrEmailDto.username.match(this.myPattern.phone))) {
      this.mobileOrEmailDto.tokenType = this.fieldType[this.fieldType.MOBILE.toString()];
    }
  }

  restPassword(): void {
    this.touched = true;
    if (this.reqForgetPass.invalid) {
      this.reqForgetPass.markAllAsTouched();
      Notiflix.Notify.Failure('ورودی ها بررسی شود.');
      return;
    }
    Notiflix.Block.Arrows('#restbtn');
    this.restPasswordDto.tokenType = this.mobileOrEmailDto.tokenType;
    this.restPasswordDto.username = this.mobileOrEmailDto.username;
    this.checkUserService.resetPassword(this.restPasswordDto, '#restbtn')
      .subscribe((res: any) => {
        if (res) {
          this.touched = false;
          Notiflix.Block.Remove('#restbtn');
          if (res && res.flag) {
            Notiflix.Notify.Success('رمزعبور شما تغییر یافت.');
            this.router.navigateByUrl('/auth');
          } else {
            Notiflix.Notify.Failure(res.message);
          }
        }
      });
  }
}
