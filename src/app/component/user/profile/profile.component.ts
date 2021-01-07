import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../service/user/user.service';
import {Constants} from '../../../model/enum/constants';
import {User} from '../../../model/user/user';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UpdateProfile} from '@app/model/user/updateProfile';
import {fakeAsync} from '@angular/core/testing';
import {MatDialog} from '@angular/material/dialog';
import {ChangePassword} from '@app/model/user/changePassword';

declare var $: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  profileForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    phone: ['', Validators.required],
    mobile: ['', Validators.required],
    email: ['', Validators.required],
    organizationalUnit: ['', Validators.required],
    organizationalLevel: ['', Validators.required],
    address: ['', Validators.required],
    city: ['', Validators.required],
    province: ['', Validators.required],
  });

  isMobileValid = false;
  isEmailValid = false;
  editMode = false;

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    public dialog: MatDialog
  ) {
  }

  public user: User = new User();

  ngOnInit(): void {
    this.profileForm = new FormGroup({
      firstName: new FormControl(this.user.firstName, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(25)
      ]),
      lastName: new FormControl(this.user.lastName, [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(25)
      ]),
      phone: new FormControl(this.user.phone, [
        Validators.required,
        Validators.minLength(11),
        Validators.maxLength(11)
      ]),
      organizationalUnit: new FormControl(this.user.organizationalUnit, [
        Validators.required
      ]),
      organizationalLevel: new FormControl(this.user.organizationalLevel, [
        Validators.required
      ]),
      address: new FormControl(this.user.address, [
        Validators.required,
        Validators.minLength(15),
        Validators.maxLength(100)
      ]),
      city: new FormControl(this.user.city, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50)
      ]),
      province: new FormControl(this.user.province, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50)
      ]),
    });
    this.route.queryParams
      .subscribe(params => {
          if (params.mode !== null) {
            if (params.mode === 'edit') {
              this.editMode = true;
              $('#profileForm :input').attr('readonly', false);
              $('#inMobile :input').attr('readonly', true);
              $('#inEmail :input').attr('readonly', true);
              $('#btnUpdateProfile').html('ذخیره');
            } else {
              this.editMode = false;
              $('#profileForm :input').attr('readonly', true);
              $('#btnUpdateProfile').html('ویرایش');
            }
          }
        }
      );
    const token = localStorage.getItem(Constants.Authorization.toString());
    console.log('token ' + token);
    if (token) {
      this.userService.getProfile().subscribe(result => {
        if (result.flag !== null) {
          if (result.flag) {
            this.user = result.data;
          } else {
            alert(result.message);
          }
        }
        // tslint:disable-next-line:no-shadowed-variable
      }, error => console.log(error));
    } else {
      this.router.navigateByUrl('/login');
    }
  }

  // tslint:disable-next-line:typedef
  get f() {
    return this.profileForm.controls;
  }

  // tslint:disable-next-line:typedef
  onProfileUpdateSubmit(profileForm) {
    if (!this.editMode) {
      this.router.navigate(['/profile'], {queryParams: {mode: 'edit'}, queryParamsHandling: 'merge'});
      return;
    }
    console.log('profileForm ' + profileForm.status);
    // stop here if form is invalid
    if (profileForm.invalid) {
      alert('اطلاعات وارد شده صحیح نمیباشد.');
      return;
    }

    this.updateProfile();
  }

  // tslint:disable-next-line:typedef
  updateProfile() {
    const reqUpdateProfile = new UpdateProfile(this.user);
    console.log('nm ' + reqUpdateProfile.firstName);
    this.userService
      .updateProfile(reqUpdateProfile)
      .subscribe(result => {
          console.log('data flag' + result.flag);
          console.log('data data' + result.data);
          if (result.flag !== null) {
            if (result.flag) {
              console.log('data ' + result.data);
              alert('اطلاعات شما با موفقیت بروز رسانی شد.');
              this.router.navigateByUrl('/profile?mode=show');
            } else {
              alert(result.message);
            }
          }
        },
        error => console.log(error));
  }


  // tslint:disable-next-line:typedef
  openChangePasswordDialog() {
    this.dialog.open(ChangePasswordDialog);
  }

  // tslint:disable-next-line:typedef
  openChangeEmailDialog() {
    this.dialog.open(ChangeEmailDialog);
  }
}


@Component({
  // tslint:disable-next-line:component-selector
  selector: 'change-password-modal',
  templateUrl: './modal/change-password-modal.html'
})
// tslint:disable-next-line:component-class-suffix
export class ChangePasswordDialog {

  hideOldPassword = true;
  hidePassword = true;
  hidePasswordConfirm = true;
  isPasswordValid = false;

  reqChangePassword: ChangePassword = new ChangePassword();

  changePasswordForm = this.fb.group({
    password: new FormControl(this.reqChangePassword.password, [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(24)
    ]),
    oldPassword: new FormControl(this.reqChangePassword.oldPassword, [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(24)
    ]),
    passwordConfirm: new FormControl(this.reqChangePassword.passwordConfirm, [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(24)
    ]),
  });

  constructor(
    private userService: UserService,
    private dialog: MatDialog,
    private fb: FormBuilder
  ) {
  }

  // tslint:disable-next-line:typedef
  get f() {
    return this.changePasswordForm.controls;
  }

  // tslint:disable-next-line:typedef
  close() {
    this.dialog.closeAll();
  }

  // tslint:disable-next-line:typedef
  checkRequest(changePasswordForm) {
    if (changePasswordForm.invalid) {
      return;
    }
    if (!this.isPasswordValid) {
      return;
    }

    this.userService
      .updatePassword(this.reqChangePassword)
      .subscribe(result => {
          console.log('data flag' + result.flag);
          console.log('data data' + result.data);
          if (result.flag !== null) {
            if (result.flag) {
              console.log('data ' + result.data);
              alert('رمز شما با موفقیت بروز رسانی شد.');
              this.dialog.closeAll();
              return;
            } else {
              alert(result.message);
            }
          }
        },
        error => console.log(error));
  }

  // tslint:disable-next-line:typedef
  checkPassword() {
    if (this.reqChangePassword.passwordConfirm.length < 8) {
      this.isPasswordValid = false;
      alert('تکرار رمز معتبر نمیباشد.');
      return;
    }
    if (this.reqChangePassword.passwordConfirm !== this.reqChangePassword.password) {
      this.isPasswordValid = false;
      alert('تکرار رمز با خود رمز یکسان نمیباشد.');
      return;
    } else {
      this.isPasswordValid = true;
      return;
    }
  }

}


@Component({
  // tslint:disable-next-line:component-selector
  selector: 'change-email-modal',
  templateUrl: './modal/change-email-modal.html'
})
// tslint:disable-next-line:component-class-suffix
export class ChangeEmailDialog {

  constructor(
    private dialog: MatDialog
  ) {
  }

  // tslint:disable-next-line:typedef
  close() {
    this.dialog.closeAll();
  }
}
