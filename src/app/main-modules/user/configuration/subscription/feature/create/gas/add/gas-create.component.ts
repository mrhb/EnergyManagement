import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MyPattern} from '../../../../../../../../shared/tools/myPattern';
import {ActivatedRoute, Router} from '@angular/router';
import {GasDto} from '../../../../model/gas';
import {GroupGasEnum, UseTypeGasEnum} from '../../../../model/gasEnum';
// @ts-ignore
import Notiflix from 'notiflix';
import {GasService} from '../../../../service/gas.service';

@Component({
  selector: 'app-gas-create',
  templateUrl: './gas-create.component.html',
  styleUrls: ['./gas-create.component.scss']
})
export class GasCreateComponent implements OnInit {
  gasId = '';
  touched = false;
  edited = false;
  form: FormGroup;
  myPattern = MyPattern;
  gasDto = new GasDto();
  groupEnum = GroupGasEnum;
  useTypeGasEnum = UseTypeGasEnum;
  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private gasService: GasService,
              private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParams.subscribe(params => {
      console.log('params', params);
      if (params.id) {
        this.edited = true;
        this.gasId = params.id;
        this.getOneGas(params.id);
      }
    });
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', [Validators.minLength(3), Validators.pattern(this.myPattern.nameAndFamily)]],
      address: [''],
      billingId: ['', [Validators.required, Validators.pattern(this.myPattern.number)]],
      city: ['', [Validators.minLength(1)]],
      domainCode: [''],
      addressCode: ['', [Validators.required, Validators.maxLength(400), Validators.pattern(this.myPattern.number)]],
      numberShare: [''],
      fileNumber: [''],
      serialShare: [''],
      useType: ['', [Validators.required]],
      group: ['', [Validators.required]],
      capacity: [''],
      coefficient: [''],
    });
  }

  createGas(): void {
    this.touched = true;
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      Notiflix.Notify.Failure('ورودی رو بررسی کنید!');
      return;
    }

    if (!this.edited) {
      this.gasService.createGas(this.gasDto)
        .subscribe((res: any) => {
          if (res) {
            Notiflix.Notify.Success('ایجاد اشتراک گاز با موفقیت انجام شد.');
            // this.router.navigate(['/index/user/configuration/gasList']).then();
            this.router.navigateByUrl('/index/user/configuration/gasList').then();
          }
        });
    } else {
      this.gasService.updateGas({id: this.gasId}, this.gasDto)
        .subscribe((res: any) => {
          if (res) {
            Notiflix.Notify.Success('ویرایش اشتراک گاز با موفقیت انجام شد.');
            this.router.navigateByUrl('/index/user/configuration/gasList').then();
          }
        });
    }
  }

  getOneGas(gId): void {
    this.gasService.getOneGas({id: gId})
      .subscribe((res: any) => {
        if (res) {
          this.gasDto = res.data;
        }
      });
  }
}
