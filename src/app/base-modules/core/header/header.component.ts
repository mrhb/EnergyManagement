import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {JwtService} from '../../../../service/guard/jwt.service';
import {ROLE_ADMIN, ROLE_USER} from '../../../shared/constants/role.constants';
import {DataService} from '../../../../service/dataService/dataService';
import {Account} from '../model/account';
import {GATEWAY_URL} from '../../../_base/service/model/rest-constants';
import { OrganizationalLevelEnum } from 'src/app/main-modules/user/profile/model/profile';

declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  decodedToken: any;
  role = '';
  account = new Account();
  pathUrl = GATEWAY_URL + '/api/file/get?link=';
  organizationalLevelEnum = OrganizationalLevelEnum; 
  constructor(private router: Router, private jwtService: JwtService, ) {
  }

  ngOnInit(): void {
    const accessToken = localStorage.getItem('TOKEN');
    this.decodedToken = this.jwtService.decode(accessToken);
    const role = this.decodedToken.authorities;
    if (role === ROLE_ADMIN) {
      this.role = 'admin';
    } else if (role === ROLE_USER) {
      this.role = 'user';
      this.getAccount();
    }

    $('.dropdown-menu a.dropdown-toggle').on('click', function(e) {
      if (!$(this).next().hasClass('show')) {
        $(this).parents('.dropdown-menu').first().find('.show').removeClass('show');
      }
      const $subMenu = $(this).next('.dropdown-menu');
      $subMenu.toggleClass('show');


      $(this).parents('li.nav-item.dropdown.show').on('hidden.bs.dropdown', function(e) {
        $('.dropdown-submenu .show').removeClass('show');
      });


      return false;
    });
  }


  getAccount(): void {
    const account = JSON.parse(localStorage.getItem('account'));
    if (account) {
      DataService.setAccount(account);
    }
    DataService.getAccount.subscribe(res => {
      if (res) {
        console.log('res', res);
        this.account = res;
      }
    });
  }

  logOut(): void {
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate(['/']);
  }
}
