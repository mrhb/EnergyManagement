import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../service/user/user.service';
import {Constants} from '../../../model/enum/constants';
import {error} from '@angular/compiler/src/util';
import {User} from '../../../model/user/user';
import {Router} from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private userService: UserService,private router: Router) {
  }

  public user: User = new User();

  ngOnInit(): void {
    const token = localStorage.getItem(Constants.Authorization.toString());
    console.log('token ' + token);
    if (token) {
      this.userService.getProfile().subscribe(result => {
        if (result.flag !== null) {
          if (result.flag){
            this.user = result.data;
          }else {
            alert(result.message);
          }
        }
        // tslint:disable-next-line:no-shadowed-variable
      }, error => console.log(error));
    }else {
      this.router.navigateByUrl('/login');
    }
  }


}
