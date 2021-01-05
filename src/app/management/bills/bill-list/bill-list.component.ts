import {SelectionModel} from '@angular/cdk/collections';
import {Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';

import { MatDialogRef, MatDialog } from "@angular/material/dialog";

import { BooleanInput } from '@angular/cdk/coercion';
import { BillsService } from '../services/bills.service';
import { Bill } from '../services/bill';
import { DialogBodyComponent } from '../../dialog-body/dialog-body.component';
@Component({
  selector: 'app-bill-list',
  templateUrl: './bill-list.component.html',
  styleUrls: ['./bill-list.component.scss']
})
export class BillListComponent implements OnInit {
  bills:Bill[];
  displayedColumns: string[] = ['select', 'id', 'type','name','unit','fromdate','todate','price','shen'];
  dataSource = new MatTableDataSource<Bill>([]);
  selection = new SelectionModel<Bill>(true, []);

  constructor(private BillsService: BillsService,
    public dialog: MatDialog) { }
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  ngOnInit(): void {
    this.retrieveBills();
  }

  retrieveBills(): void {
    this.BillsService.getAll()
      .subscribe(
        data => {
          this.bills = data;
          this.dataSource = new MatTableDataSource<Bill>(this.bills);
          this.selection = new SelectionModel<Bill>(true, []);
          console.log(data);
        },
        error => {
          console.log(error);
        });

        
  }
  deleteUser( unit: Bill){

    const dialogRef = this.dialog.open(DialogBodyComponent, {
      width: '400px',
      data: {name: unit.name, type: "unit"}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if(result){
        this.BillsService.delete(unit.id).subscribe();
        this.retrieveBills();
      } 
    });      
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Bill): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }
}