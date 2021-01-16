import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {JwtService} from "../../../../service/guard/jwt.service";
import {ROLE_ADMIN, ROLE_USER} from "../../../shared/constants/role.constants";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  decodedToken: any;
  role = '';
  constructor(private router: Router, private jwtService: JwtService,) { }

  ngOnInit(): void {
    const accessToken = localStorage.getItem('TOKEN');
    this.decodedToken = this.jwtService.decode(accessToken);
    const role = this.decodedToken.authorities;
    if (role === ROLE_ADMIN) {
      this.role = 'admin';
    } else if (role === ROLE_USER) {
      this.role = 'user';
    }
  }

  logOut(): void {
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate(['/']);
  }
}
