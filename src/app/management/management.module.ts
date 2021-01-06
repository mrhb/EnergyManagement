import { NgModule } from  '@angular/core';
import { Routes, RouterModule } from  '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';

import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import {MatDialogModule} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatTreeModule} from '@angular/material/tree';



import { EditModule } from  './edit/edit.module';
import { BillsModule } from  './bills/bills.module';




import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { DataService } from './services/data.service';



import { UnitsComponent } from './units/units.component';
import { UsersComponent } from './users/users.component';
import { GroupsComponent } from './groups/groups.component';
import { ManagementComponent } from './management.component';
import { ActivityComponent } from './activity/activity.component';


import { MatTableModule } from '@angular/material/table';
import { DialogBodyComponent } from './dialog-body/dialog-body.component';
import { EditComponent } from './edit/edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { InstrumentsComponent } from './instruments/instruments.component';
import { BillsComponent } from './bills/bills.component';
import { HierarchyComponent } from './hierarchy/hierarchy.component';




const  routes:  Routes  = [
  {
  path:  'management',
  component:  ManagementComponent,
  children: [
    {
      path:  'hierarchy',
      component:  HierarchyComponent
      },
    {
      path:  'users',
      component:  UsersComponent
    },
    {
      path:  'units',
      component:  UnitsComponent
    },
    {
      path:  'instruments',
      component:  InstrumentsComponent
    },
    {
      path:  'bills',
      component:  BillsComponent
    },
    {
      path:  'activity',
      component:  ActivityComponent
    },
    {
      path:  'edit',
      component:  EditComponent
    }
  ]
  }
  ];


@NgModule({
  declarations: [UnitsComponent, UsersComponent, GroupsComponent, ManagementComponent, ActivityComponent, DialogBodyComponent, InstrumentsComponent, HierarchyComponent],
  imports: [

    BrowserModule,
    // import HttpClientModule after BrowserModule.
    HttpClientModule,

    
    CommonModule,
    MatIconModule,
    MatToolbarModule,
    MatTableModule,
    MatCheckboxModule,
    HttpClientModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatTreeModule,

    FormsModule,
    ReactiveFormsModule,
    environment.useMockServer ?   InMemoryWebApiModule.forRoot(DataService, {
      passThruUnknownUrl: true
    }) : [],
    EditModule,
    RouterModule.forChild(routes),
    BillsModule

  ],
  exports: [RouterModule]
})
export class ManagementModule { }
