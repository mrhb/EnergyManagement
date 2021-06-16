import { Component, OnInit } from '@angular/core';
import { UserList } from '../../model/profile';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {

  userList: UserList[] = [];

  constructor() { }

  ngOnInit(): void {
      // this.userList();
  }

}
