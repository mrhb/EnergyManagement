import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '@app/model/user/user';
import {LoginType} from '@app/model/enum/loginType';
import {MatStep, MatStepper} from '@angular/material/stepper';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.sass']
})
export class ForgetPasswordComponent implements OnInit {
  name = 'Angular';

  reqForgetPasswordForm: FormGroup;
  reqResetPasswordForm: FormGroup;

  // tslint:disable-next-line:variable-name
  constructor(private fb: FormBuilder) {
  }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.reqForgetPasswordForm = this.fb.group({
      type: ['', Validators.required],
      username: ['', Validators.required],
    });
    this.reqResetPasswordForm = this.fb.group({
      secondCtrl: ['', Validators.required]
    });
  }


  // tslint:disable-next-line:typedef
  checkReqForgetPassword(stepper: MatStepper) {
    stepper.next();
  }
}
