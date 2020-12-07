import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { UsersService } from '../../users/_service/users.service';
import { User } from '../../users/_service/user';
import { Observable } from 'rxjs';
import { first, switchMap } from 'rxjs/operators';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import{MustMatch}from '../../../_helpers/must-match.validator';
import{AlertService}  from '../../../_services/alert.service';
@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  form: FormGroup;
  id: string;
  isAddMode: boolean;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UsersService,
    private alertService: AlertService
  ) { }
  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;
    
    // password not required in edit mode
    const passwordValidators = [Validators.minLength(6)];
    if (this.isAddMode) {
        passwordValidators.push(Validators.required);
    }

    this.form = this.formBuilder.group({
        // title: ['', Validators.required],
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        // role: ['1', Validators.required],
        password: ['1234'],
        // password: ['', [Validators.minLength(6), this.isAddMode ? Validators.required : Validators.nullValidator]],
        // confirmPassword: ['', this.isAddMode ? Validators.required : Validators.nullValidator]
    }, {
       // validator: MustMatch('password', 'confirmPassword')
    });

    if (!this.isAddMode) {
        this.userService.get(this.id)
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
        this.createUser();
    } else {
        this.updateUser();
    }
}

private createUser() {
    this.userService.create(this.form.value)
        .pipe(first())
        .subscribe({
            next: () => {
                this.alertService.success('User added', { keepAfterRouteChange: true });
                this.router.navigate(['../'], { relativeTo: this.route });
            },
            error: error => {
                this.alertService.error(error);
                this.loading = false;
            }
        });
}

  private updateUser() {
    this.userService.update(this.id, this.form.value)
        .pipe(first())
        .subscribe({
            next: () => {
                this.alertService.success('User updated', { keepAfterRouteChange: true });
                this.router.navigate(['management/users']);
            },
            error: error => {
                this.alertService.error(error);
                this.loading = false;
            }
        });
  }
}