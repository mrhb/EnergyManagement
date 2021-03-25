import {Component, OnInit} from '@angular/core';
import {Auth} from '../../model/auth';
import {MyPattern} from '../../../../shared/tools/myPattern';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../service/auth.service';
import {Tools} from '../../../../shared/tools/tools';
// @ts-ignore
import Notiflix from 'notiflix';
import {CheckUserService} from '../../service/checkUserService';

/**
 * create By reza mollaei reza_yki@yahoo.com
 */
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  dto = new Auth.SignUp();
  myPattern = MyPattern;
  userForm: FormGroup;
  touched = false;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private checkUserService: CheckUserService,
              private authService: AuthService) {
    this.userForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(3), Validators.pattern(this.myPattern.nameAndFamily)]],
      lastName: ['', [Validators.required, Validators.minLength(3), Validators.pattern(this.myPattern.nameAndFamily)]],
      organizationalLevel: ['', [Validators.required, Validators.pattern(this.myPattern.faAndEnNumberAndTextParagraph)]],
      phone: ['', [ Validators.maxLength(12), Validators.pattern(this.myPattern.fixedPhone)]], //شماره تلفن ثابت
      email: ['', [ Validators.pattern(this.myPattern.email)]], //ایمیل
      mobile: ['', [ Validators.maxLength(11), Validators.pattern(this.myPattern.phone)]], // شماره همراه
      useName: [''], // نام کاربری
      address: ['', [ Validators.pattern(this.myPattern.faAndEnNumberAndTextParagraph)]], //آدرس
      organizationalUnit: ['', [ Validators.pattern(this.myPattern.faAndEnNumberAndTextParagraph)]], //واحد سازمانی
      city: ['', [ Validators.pattern(this.myPattern.faAndEnNumberAndTextParagraph)]],// شهر
      province: ['', [ Validators.pattern(this.myPattern.faAndEnNumberAndTextParagraph)]],//استان
      password: ['', [Validators.required, Validators.pattern(this.myPattern.password)]],
      passwordConfirm: ['', [Validators.required, Validators.pattern(this.myPattern.password)]],
    }, {
      validators: this.checkValidators('password', 'passwordConfirm')
    });

  }

  ngOnInit(): void {
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

  checkMobileIsExist(): void {
    if (!Tools.isNullOrUndefined(this.dto.mobile) && this.dto.mobile.length === 11) {
      this.checkUserService.getCheckPhone(this.dto.mobile)
        .subscribe((res: any) => {
          if (res) {
            if (res.data && res.flag) {
              Notiflix.Notify.Failure('شماره موبایل وارد شده تکراری می باشد.');
              this.dto.mobile = '';
            }
          }
        });
    }
  }

  signUpUser(): void {
    this.touched = true;
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      Notiflix.Notify.Failure('ورودی ها رو بررسی کنید!');
      return;
    }
    this.checkUserService.userSignUp(this.dto, '.submitForm').subscribe((res: any) => {
      if (res) {
        console.log('res', res);
        Notiflix.Block.Remove('.submitForm');
        if (res.flag && res.data) {
          console.log('res.flag', res.flag);
          Notiflix.Notify.Success('ثبت نام با موفقیت انجام شد');
          setTimeout(() => {
            Notiflix.Block.Init({});
            this.router.navigateByUrl('/');
          }, 300);
        } else {
          Notiflix.Notify.Failure(res.message);
        }
      }
    });
  }

  checkEmailIsExist(): void {
    console.log('this.userForm.controls[\'email\'].valid', this.userForm.controls.email.valid);
    if (this.userForm.controls.email.valid) {
      this.checkUserService.getCheckEmail(this.dto.email)
        .subscribe((res: any) => {
          if (res) {
            if (res.data && res.flag) {
              Notiflix.Notify.Failure('ایمیل وارد شده تکراری می باشد.');
              this.dto.email = '';
            }
          } else {
            console.log('res', res);
          }
        });
    }

  }
}
