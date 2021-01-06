import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../service/user/user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(
    private userService: UserService,
  ) {
  }

  ngOnInit(): void {
  }
}
