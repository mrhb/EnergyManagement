import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MyPattern} from '../../../../../../../../shared/tools/myPattern';
import {PowerDto} from '../../../../model/power';
import {
  GeneralEnum, GroupEnum,
  HomeEnum,
  Industry_productsEnum, OtherEnum, powerSupplyVoltage,
  UseTypePowerEnum, VoltageTypeEnum,
  Water_productsEnum
} from '../../../../model/powerEnum';
import {PowerService} from '../../../../service/power.service';
// @ts-ignore
import Notiflix from 'notiflix';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-power-create',
  templateUrl: './power-create.component.html',
  styleUrls: ['./power-create.component.scss']
})
export class PowerCreateComponent implements OnInit {
  touched = false;
  edited = false;
  powerId = '';
  form: FormGroup;
  myPattern = MyPattern;
  powerDto = new PowerDto();
  useTypeEnum = UseTypePowerEnum;
  voltageTypeEnum = VoltageTypeEnum;
  useCodeEnum;
  groupEnum = GroupEnum;
  powerSupplyVoltageEnum = powerSupplyVoltage;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private  powerService: PowerService) {
    this.activatedRoute.queryParams.subscribe(params => {
      console.log('params', params);
      if (params.id) {
        this.edited = true;
        this.powerId = params.id;
        this.getOnePower(params.id);
      }
    });
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', [Validators.minLength(3), Validators.pattern(this.myPattern.nameAndFamily)]],
      address: [''],
      billingId: ['', [Validators.required, Validators.pattern(this.myPattern.number)]],
      systemPass: ['', [Validators.minLength(1), Validators.pattern(this.myPattern.number)]],
      city: ['', [Validators.minLength(1)]],
      domainCode: [''],
      addressCode: ['', [Validators.required, Validators.maxLength(400), Validators.pattern(this.myPattern.number)]],
      numberShare: [''],
      fileNumber: [''],
      serialShare: [''],
      useType: ['', [Validators.required]],
      useCode: ['', [Validators.required]],
      group: [''],
      capacity: [''],
      coefficient: [''],
      voltageType: [''],
      powerSupplyVoltage: [''],
      // buildingList: [''],
      // buildingNum: ['', [Validators.pattern(this.myPattern.number)]],
    });
  }

  getOnePower(pId): void {
    this.powerService.getOneBuilding({
      id: pId
    })
      .subscribe((res: any) => {
        if (res) {
          this.powerDto = res.data;
        }
      });
  }

  setEnumUseType(): void {
    console.log('this.powerDto.useType', this.powerDto.useType);
    console.log('UseTypeEnum.HOME', UseTypePowerEnum.HOME);
    console.log('UseTypeEnum.HOME', UseTypePowerEnum.HOME === this.powerDto.useType);
    switch (this.powerDto.useType) {
      case UseTypePowerEnum[UseTypePowerEnum.HOME.toString()]:
        this.useCodeEnum = HomeEnum;
        break;
      case UseTypePowerEnum[UseTypePowerEnum.GENERAL.toString()]:
        this.useCodeEnum = GeneralEnum;
        break;
      case UseTypePowerEnum[UseTypePowerEnum.WATER_PRODUCTS.toString()]:
        this.useCodeEnum = Water_productsEnum;
        break;
      case UseTypePowerEnum[UseTypePowerEnum.INDUSTRY_PRODUCTS.toString()]:
        this.useCodeEnum = Industry_productsEnum;
        break;
      case UseTypePowerEnum[UseTypePowerEnum.OTHER.toString()]:
        this.useCodeEnum = OtherEnum;
        break;
    }
  }

  createPower(): void {
    this.touched = true;
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      Notiflix.Notify.Failure('ورودی رو بررسی کنید!');
      return;
    }

    if (!this.edited) {
      this.powerService.createPower(this.powerDto)
        .subscribe((res: any) => {
          if (res) {
            Notiflix.Notify.Success('ایجاد اشتراک برق با موفقیت انجام شد.');
            this.router.navigate(['/index/user/configuration/powerList']);
          }
        });
    } else {

      this.powerService.updatePower({id: this.powerId}, this.powerDto)
        .subscribe((res: any) => {
          if (res) {
            Notiflix.Notify.Success('ویرایش اشتراک برق با موفقیت انجام شد.');
            this.router.navigate(['/index/user/configuration/powerList']);
          }
        });
    }


  }
}
