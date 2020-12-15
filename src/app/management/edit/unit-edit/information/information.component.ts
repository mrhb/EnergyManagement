import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '@app/_services/alert.service';
import { icon, latLng, Map, marker, point, polyline, tileLayer } from 'leaflet';
import { UnitsService } from '../../../services/units.service';
import { first, switchMap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { DialogBodyComponent } from '@app/management/dialog-body/dialog-body.component';



@Component({
  selector: 'unit-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css']
})
export class InformationComponent implements OnInit {
  form: FormGroup;
  id: string;
  isAddMode: boolean;
  loading = false;
  submitted = false;  


  constructor(
    private UnitsService: UnitsService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService,
    public dialog: MatDialog) { 

    }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;
    
    // password not required in edit mode
    const passwordValidators = [Validators.minLength(6)];
    if (this.isAddMode) {
        passwordValidators.push(Validators.required);
    }

    this.form = this.formBuilder.group({
        // title: ['', Validators.required],
        name: ['', Validators.required],
        totalArea: ['', Validators.required],
        // lastName: ['', Validators.required],
        // email: ['', [Validators.required, Validators.email]],
        // role: ['1', Validators.required],
        // password: ['1234'],
        // password: ['', [Validators.minLength(6), this.isAddMode ? Validators.required : Validators.nullValidator]],
        // confirmPassword: ['', this.isAddMode ? Validators.required : Validators.nullValidator]
    }, {
       // validator: MustMatch('password', 'confirmPassword')
    });

    if (!this.isAddMode) {
        this.UnitsService.get(this.id)
            .pipe(first())
            .subscribe(x => this.form.patchValue(x));
    }
  }
  resetForm(){
    this.router.navigate(['management/users']);
  }
  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }
  
  onSubmit() {
      this.submitted = true;
  
      // reset alerts on submit
      this.alertService.clear();
  
      // stop here if form is invalid
      if (this.form.invalid) {
          return;
      }
  
      this.loading = true;
      if (this.isAddMode) {
          this.create();
      } else {
          this.update();
      }
  }
  
  private create() {
      this.UnitsService.create(this.form.value)
          .pipe(first())
          .subscribe({
              next: () => {
                  this.alertService.success('Building added', { keepAfterRouteChange: true });
                  this.router.navigate(['/management/units'], { relativeTo: this.route });
              },
              error: error => {
                  this.alertService.error(error);
                  this.loading = false;
              }
          });
  }
  
    private update() {
        this.UnitsService.update(this.id, this.form.value)
            .pipe(first())
            .subscribe({
                next: () => {
                    this.alertService.success('Unit updated', { keepAfterRouteChange: true });
                    this.router.navigate(['management/units']);
                },
                error: error => {
                    this.alertService.error(error);
                    this.loading = false;
                }
            });
    }

    onDelete( ){

        const dialogRef = this.dialog.open(DialogBodyComponent, {
          width: '400px',
          data: {name: this.form.value.name, type: "unit"}
        });
    
        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
          if(result){
            this.UnitsService.delete(this.id).subscribe();
            this.router.navigate(['management/units']);
        } 
        });      
      }
  }