import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Profile, UserList } from '../../model/profile';
import { ProfileService } from '../../service/profile.service';

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
  userList: Profile[] = [];

  constructor( 
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
      // this.userList();
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
