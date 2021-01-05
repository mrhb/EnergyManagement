import { NgModule } from  '@angular/core';
import { Routes, RouterModule } from  '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatRadioModule} from '@angular/material/radio';


import { ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { MatSidenavModule } from '@angular/material/sidenav';


import { BillsComponent } from './bills.component';

import { ElectricBillComponent } from './electric/electric-bill.component';
import { GasBillComponent } from './gas/gas-bill.component';
import { BillListComponent } from './bill-list/bill-list.component';


const  routes:  Routes  = [
  {
      path:  'management/bills',
      component:  BillsComponent,
      children: [
        {
          path:  'electric',
          component: ElectricBillComponent
        },
        {
          path:  'gas',
          component: GasBillComponent
        }
        ,
        {
          path:  'list',
          component: BillListComponent
        }
        ,
        { path: '', redirectTo: 'list', pathMatch: 'full' },
      ]
    }
  ];



@NgModule({
  declarations: [
    ElectricBillComponent,
    GasBillComponent,
    BillsComponent, 
    BillListComponent
      ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatExpansionModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatTableModule,
    MatGridListModule,
    MatRadioModule,
    LeafletModule
    
  ],
  exports: [RouterModule]
})
export class BillsModule { }
