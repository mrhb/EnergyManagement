import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../service/user/user.service';
import {Constants} from '../../../model/enum/constants';
import {User} from '../../../model/user/user';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UpdateProfile} from '@app/model/user/updateProfile';
import {fakeAsync} from '@angular/core/testing';

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
    private fb: FormBuilder
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
            }else {
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
    if (!this.editMode){
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
}
