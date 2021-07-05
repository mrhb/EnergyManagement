import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MyPattern } from 'src/app/shared/tools/myPattern';
import { Password, Profile, UserList } from '../../model/profile';
import { ProfileService } from '../../service/profile.service';
import Notiflix from 'notiflix';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {
  
  
  pageSize = 20;
  pageIndex = 0;
  length = -1;
  totalPages = 1;
  touched = false;

  userList: UserList[] = [];
  profile: Profile=new Profile();
  password = new Password();

  myPattern = MyPattern;


  passForm: FormGroup;

  constructor( 
    private formBuilder: FormBuilder,
    private profileService: ProfileService,
    public router: Router,
    private activatedRoute: ActivatedRoute) {
this.activatedRoute.queryParams.subscribe(params => {
if (params.pageIndex) {
this.pageIndex = params.pageIndex;
this.pageSize = params.pageSize;
}
this.getList();
});
}

  ngOnInit(): void {
    this.passForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(3), Validators.pattern(this.myPattern.password)]],
      passwordConfirm: ['', [Validators.required, Validators.minLength(3), Validators.pattern(this.myPattern.password)]],
    }, {
      validators: this.checkValidators('password', 'passwordConfirm')
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
  
  getList(): void {
    this.profileService.getUserList(
      {
        page: this.pageIndex,
        size: this.pageSize,
      },{}
    ).subscribe((res: any) => {
      if (res) {
        this.userList = res.content;
        this.length = res.totalElements;
        this.pageIndex = res.page;
        this.totalPages = res. totalPages;
      }
    });
  }

  myFunction(x) {
    this.profile=x;
    
  }

  passwordUpdate(): void {
    this.password.id=this.profile._id;
    if (this.passForm.invalid) {
      this.passForm.markAllAsTouched();
      Notiflix.Notify.Failure('ورودی ها رو بررسی کنید!');
      return;
    }

    this.profileService.updatePasswordByAdmin(this.password)
      .subscribe((res: any) => {
        if (res) {
          Notiflix.Notify.Success('ویرایش رمز عبور با موفقیت تغییر یافت.');
        }
      });
  }
  navigate(): void {
    this.router.navigate([window.location.hash.split('#/')[1].split('?')[0]], {
      queryParams: {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
      },
    });
    this.getList();
  }

  changePage(event: any): void {
    this.length = event.length;
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.navigate();
  }
}
