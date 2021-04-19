import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MyPattern } from 'src/app/shared/tools/myPattern';
import { EnergyLabel, EnergyLableDto } from './model/energyLabel';
import { EnergyLabelType } from './model/EnergyLabelType';
import { EnergyLabelService } from './service/energy-label.service';

@Component({
  selector: 'app-energy-label',
  templateUrl: './energy-label.component.html',
  styleUrls: ['./energy-label.component.scss']
})
export class EnergyLabelComponent implements OnInit {
  pageSize = 5;
  pageIndex = 0;
  length = -1;
  totalPages = 1;
  
  myPattern = MyPattern;
  form: FormGroup;
  touched = false;
  energyLableDto = new EnergyLableDto();
  buildingList = [];

  regionId ="111111111111111111111111";


  energyLabel:EnergyLabel = {
    consumptionIndex: '1277',
    label: 'A',
    labelType: EnergyLabelType.NON_RESIDENTIAL,
    ratio: '10.98'
  };
  
constructor(private formBuilder: FormBuilder,
  private energyLabelService: EnergyLabelService,
  public router: Router,

  ) { 
  this.form = this.formBuilder.group({
    year: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(3), Validators.pattern(this.myPattern.number)]],
  }, {
  });
  // تعریف متغیرها
}

  ngOnInit(): void {
    this.energyLableDto.year = 1399;
    this.getBuildingList();

  }


  getBuildingList(): void {
    this.energyLabelService.getBuildingList({
      page: this.pageIndex,
      size: this.pageSize,
    }, {regionId: this.regionId}).subscribe((res: any) => {
      if (res) {
        this.buildingList = res.content;
        this.length = res.totalElements;
        this.pageIndex = res.page;
        this.totalPages = res. totalPages;
      }
    });
  }

  navigate(): void {
    this.router.navigate([window.location.hash.split('#/')[1].split('?')[0]], {
      queryParams: {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
      },
    });

  }

  changePage(event: any): void {
    console.log('event.length', event.length);
    this.length = event.length;
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.navigate();
  }

}
