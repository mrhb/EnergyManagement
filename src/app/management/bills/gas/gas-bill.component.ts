import {SelectionModel} from '@angular/cdk/collections';
import {Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';

import { MatDialogRef, MatDialog } from "@angular/material/dialog";
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';


import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';



import { BooleanInput } from '@angular/cdk/coercion';
import { BillgasService } from './_service/bill-gas.service';
import { billgas } from './_service/bill-gas';
import { DialogBodyComponent } from '../../dialog-body/dialog-body.component';
import { Unit } from '../../services/unit';
import { HttpClient } from '@angular/common/http';

/**
 * @title Table with selection
 */
@Component({
  selector: 'app-gas-bill',
  templateUrl: './gas-bill.component.html',
  styleUrls: ['./gas-bill.component.css']
})
export class GasBillComponent implements OnInit {
 
  loading=false;
  selected;
  
  constructor(private UsersService: BillgasService,
    public dialog: MatDialog,
    public http:HttpClient) { }
    

  ngOnInit(): void {    
    

  }

  onSubmit()
  {

  }
  


}