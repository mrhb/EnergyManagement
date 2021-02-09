import {Component, OnInit} from '@angular/core';
import {Password, Profile} from '../model/profile';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MyPattern} from '../../../../shared/tools/myPattern';
// @ts-ignore
import Notiflix from 'notiflix';
import {ProfileService} from '../service/profile.service';
import {GATEWAY_URL} from "../../../../_base/service/model/rest-constants";
import {DataService} from '../../../../../service/dataService/dataService';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  touched = false;
  editProfile = false;
  password = new Password();
  profile = new Profile();
  email: string;
  form: FormGroup;
  passForm: FormGroup;
  emailForm: FormGroup;
  myPattern = MyPattern;
  pathUrl = '';

  constructor(private formBuilder: FormBuilder,
              private profileService: ProfileService,
              private router: Router) {
    this.form = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(3), Validators.pattern(this.myPattern.nameAndFamily)]],
      lastName: ['', [Validators.required, Validators.minLength(3), Validators.pattern(this.myPattern.nameAndFamily)]],
      phone: ['', [Validators.required, Validators.pattern(this.myPattern.fixedPhone)]],
      organizationalUnit: ['', [Validators.required, Validators.pattern(this.myPattern.faAndEnNumberAndText)]],
      organizationalLevel: ['', [Validators.required, Validators.pattern(this.myPattern.faAndEnNumberAndText)]],
      address: ['', [Validators.required, Validators.pattern(this.myPattern.faAndEnNumberAndTextParagraph)]],
      city: ['', [Validators.required, Validators.pattern(this.myPattern.faAndEnNumberAndTextParagraph)]],
      province: ['', [Validators.required, Validators.pattern(this.myPattern.faAndEnNumberAndTextParagraph)]],
    });
    this.emailForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.minLength(3), Validators.pattern(this.myPattern.email)]],
    });
    this.passForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(3), Validators.pattern(this.myPattern.password)]],
      passwordConfirm: ['', [Validators.required, Validators.minLength(3), Validators.pattern(this.myPattern.password)]],
    }, {
      validators: this.checkValidators('password', 'passwordConfirm')
    });

    this.pathUrl = GATEWAY_URL + '/api/file/get?link=';
  }

  ngOnInit(): void {
    this.getOne();
  }

  getOne(): void {
    this.profileService.getOne()
      .subscribe((res: any) => {
        if (res) {
          if (res.flag) {
            // this.profile = res.data;
            this.profile.address = res.data.address;
            this.profile.city = res.data.city;
            this.profile.firstName = res.data.firstName;
            this.profile.lastName = res.data.lastName;
            this.profile.photo = res.data.photo;
            localStorage.setItem('account', JSON.stringify(res.data));
            DataService.setAccount(res.data);
            if (!this.profile.photo) {
              this.profile.photo = ' ';
            }
            this.profile.phone = res.data.phone;
            this.profile.organizationalLevel = res.data.organizationalLevel;
            this.profile.organizationalUnit = res.data.organizationalUnit;
            this.profile.province = res.data.province;
            this.email = res.data.email;
          }
        }
      });
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


  updateProfile(): void {
    this.touched = true;
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      Notiflix.Notify.Failure('ورودی ها بررسی شود.');
      return;
    }

    this.profileService.updateProfile(this.profile)
      .subscribe((res: any) => {
        if (res) {
          if (res.flag) {
            localStorage.setItem('account', JSON.stringify(this.profile));
            DataService.setAccount(this.profile);
            Notiflix.Notify.Success('آپدیت پروفایل با موفقیت تغییر یافت.');
          }
        }
      });


  }

  uploading($event): void {
    if ($event) {
      this.profileService.updatePhoto({photo: $event})
        .subscribe((res: any) => {
          if (res) {
            this.profile.photo = $event;
            localStorage.setItem('account', JSON.stringify(this.profile));
            DataService.setAccount(this.profile);
          }
        });

    }
  }

  emailUpdate(): void {
    if (this.emailForm.invalid) {
      this.emailForm.markAllAsTouched();
      Notiflix.Notify.Failure('ورودی ها رو بررسی کنید!');
      return;
    }

    this.profileService.updateEmail(this.email)
      .subscribe((res: any) => {
        if (res) {
          Notiflix.Notify.Success('آپدیت ایمیل با موفقیت تغییر یافت.');
        }
      });
  }

  passwordUpdate(): void {
    if (this.passForm.invalid) {
      this.passForm.markAllAsTouched();
      Notiflix.Notify.Failure('ورودی ها رو بررسی کنید!');
      return;
    }

    this.profileService.updatePassword(this.password)
      .subscribe((res: any) => {
        if (res) {
          Notiflix.Notify.Success('آپدیت رمز عبور با موفقیت تغییر یافت.');
        }
      });
  }
}
