import {Component, OnInit} from '@angular/core';
import {Login} from '@app/model/user/login';
import {UserService} from '@app/service/user/user.service';
import {Constants} from '@app/model/enum/constants';
import {Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
    type: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private loginService: UserService,
    private router: Router
  ) {
  }

  reqLogin: Login = new Login();
  submitted = false;

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl(this.reqLogin.username, [
        Validators.required,
        Validators.minLength(11)
        // Validators.pattern(Pattern.phone)
      ]),
      password: new FormControl(this.reqLogin.password, [
        Validators.required,
        Validators.minLength(8)
      ]),
      type: new FormControl(this.reqLogin.type, [
        Validators.required
      ])
    });
  }

  // tslint:disable-next-line:typedef
  get f() {
    return this.loginForm.controls;
  }

  // tslint:disable-next-line:typedef
  onLoginSubmit(loginForm) {

    if (loginForm.invalid) {
      alert('لطفا فیلد ها را چک کنید');
      return;
    }

    this.submitted = true;

    this.login();
  }

  // tslint:disable-next-line:typedef
  login() {
    this.loginService
      .login(this.reqLogin).subscribe(result => {
        console.log('data ' + result.flag);
        if (result.flag !== null) {
          if (result.flag) {
            console.log('data ' + result.data);
            localStorage.setItem(Constants.Authorization.toString(), result.data);
            this.router.navigate(['/profile'], {queryParams: {mode: 'show'}, queryParamsHandling: 'merge'});
          } else {
            alert(result.message);
            this.submitted = false;
          }
        }
      },
      error => console.log(error));
  }

}
