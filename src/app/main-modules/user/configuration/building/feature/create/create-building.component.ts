import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MyPattern} from '../../../../../../shared/tools/myPattern';
import {Region} from '../../model/building';

@Component({
  selector: 'app-create-building',
  templateUrl: './create-building.component.html',
  styleUrls: ['./create-building.component.scss']
})
export class CreateBuildingComponent implements OnInit {
  form: FormGroup;
  myPattern = MyPattern;
  currentStep = 5;
  endActiveStep = 5;
  region = new Region();
  buildingId: string;
  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(3), Validators.pattern(this.myPattern.nameAndFamily)]],
    });
  }

  ngOnInit(): void {
  }

  getStep(currentStep): void {
    this.currentStep = currentStep;
    if (this.endActiveStep < currentStep) {
      this.endActiveStep = currentStep;
    }
  }

  getRegion($event): void {
    this.region = $event;
  }

  getBuildingId($event: any): void {
    this.buildingId = $event;
  }
}
