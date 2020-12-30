import {SelectionModel} from '@angular/cdk/collections';
import {Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';

import { MatDialogRef, MatDialog } from "@angular/material/dialog";
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';


import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';



import { BooleanInput } from '@angular/cdk/coercion';
import { BillelectricService } from './_service/bill-electric.service';
import { billelectric } from './_service/bill-electric';
import { DialogBodyComponent } from '../../dialog-body/dialog-body.component';
import { Unit } from '../../services/unit';
import { HttpClient } from '@angular/common/http';

/**
 * @title Table with selection
 */
@Component({
  selector: 'app-electric-bill',
  templateUrl: './electric-bill.component.html',
  styleUrls: ['./electric-bill.component.css']
})
export class ElectricBillComponent implements OnInit {
 
  loading=false;
  selected;
  
  constructor(private UsersService: BillelectricService,
    public dialog: MatDialog,
    public http:HttpClient) { }
    

  ngOnInit(): void {    
    

  }

  onSubmit()
  {

  }
  


}