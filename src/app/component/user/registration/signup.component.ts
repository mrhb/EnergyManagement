import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Pattern} from '../../../tools/pattern';
import {User} from '../../../model/user/user';
import {UserService} from '../../../service/user/user.service';
import {Router} from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    phone: ['', Validators.required],
    mobile: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
    passwordConfirm: ['', Validators.required],
    organizationalUnit: ['', Validators.required],
    organizationalLevel: ['', Validators.required],
    address: ['', Validators.required],
    city: ['', Validators.required],
    province: ['', Validators.required],
  });

  reqSignup: User = new User();
  isMobileValid = false;
  isEmailValid = false;
  isPasswordValid = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      firstName: new FormControl(this.reqSignup.firstName, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(25)
      ]),
      lastName: new FormControl(this.reqSignup.lastName, [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(25)
      ]),
      phone: new FormControl(this.reqSignup.phone, [
        Validators.required,
        Validators.minLength(11),
        Validators.maxLength(11)
      ]),
      mobile: new FormControl(this.reqSignup.mobile, [
        Validators.required,
        Validators.minLength(11),
        Validators.maxLength(11),
        Validators.pattern(Pattern.phone)
      ]),
      email: new FormControl(this.reqSignup.email, [
        Validators.required,
        Validators.minLength(11),
        Validators.maxLength(50),
        Validators.pattern(Pattern.email)
      ]),
      password: new FormControl(this.reqSignup.password, [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(24)
      ]),
      passwordConfirm: new FormControl(this.reqSignup.passwordConfirm, [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(24)
      ]),
      organizationalUnit: new FormControl(this.reqSignup.organizationalUnit, [
        Validators.required
      ]),
      organizationalLevel: new FormControl(this.reqSignup.organizationalLevel, [
        Validators.required
      ]),
      address: new FormControl(this.reqSignup.address, [
        Validators.required,
        Validators.minLength(15),
        Validators.maxLength(100)
      ]),
      city: new FormControl(this.reqSignup.city, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50)
      ]),
      province: new FormControl(this.reqSignup.province, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50)
      ]),

    });
  }

  // tslint:disable-next-line:typedef
  get f() {
    return this.signupForm.controls;
  }

  // tslint:disable-next-line:typedef
  onSignupSubmit(signupForm) {

    // stop here if form is invalid
    if (signupForm.invalid) {
      alert('اطلاعات وارد شده صحیح نمیباشد.');
      return;
    }

    if (!this.isMobileValid) {
      alert('شماره وارد شده قبلا ثبت شده است.');
      return;
    }

    if (!this.isEmailValid) {
      alert('ایمیل وارد شده قبلا ثبت شده است.');
      return;
    }

    if (!this.isPasswordValid) {
      alert('رمز وارد شده معتبر نیست.');
      return;
    }

    this.signup();
  }

  // tslint:disable-next-line:typedef
  signup() {
    this.userService
      .signup(this.reqSignup)
      .subscribe(result => {
          console.log('data flag' + result.flag);
          console.log('data data' + result.data);
          if (result.flag !== null) {
            if (result.flag) {
              console.log('data ' + result.data);
              alert('ثبت نام شما با موفقیت انجام شد.');
              this.router.navigateByUrl('/login');
            } else {
              alert(result.message);
            }
          }
        },
        error => console.log(error));
  }

  // tslint:disable-next-line:typedef
  isMobileExists() {
    if (this.reqSignup.mobile.length !== 11) {
      this.isMobileValid = false;
      return;
    }
    this.userService
      .isMobileExists(this.reqSignup.mobile)
      .subscribe(result => {
          if (result.flag !== null) {
            if (result.flag) {
              if (result.data !== null) {
                if (result.data) {
                  this.isMobileValid = false;
                  alert('شماره وارد شده قبلا ثبت شده است.');
                } else {
                  this.isMobileValid = true;
                }
              }
            } else {
              this.isMobileValid = false;
            }
          }
        },
        error => console.log(error));
  }

  // tslint:disable-next-line:typedef
  isEmailExists() {
    this.userService
      .isEmailExists(this.reqSignup.email)
      .subscribe(result => {
          if (result.flag !== null) {
            if (result.flag) {
              if (result.data !== null) {
                if (result.data) {
                  this.isEmailValid = false;
                  alert('ایمیل وارد شده قبلا ثبت شده است.');
                } else {
                  this.isEmailValid = true;
                }
              }
            } else {
              this.isEmailValid = false;
            }
          }
        },
        error => console.log(error));
  }

  // tslint:disable-next-line:typedef
  checkPassword() {
    if (this.reqSignup.passwordConfirm.length < 8) {
      this.isPasswordValid = false;
      alert('تکرار رمز معتبر نمیباشد.');
      return;
    }
    if (this.reqSignup.passwordConfirm !== this.reqSignup.password) {
      this.isPasswordValid = false;
      alert('تکرار رمز با خود رمز یکسان نمیباشد.');
      return;
    } else {
      this.isPasswordValid = true;
      return;
    }
  }
}
