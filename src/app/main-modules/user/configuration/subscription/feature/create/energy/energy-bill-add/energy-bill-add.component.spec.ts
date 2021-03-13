import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnergyBillAddComponent } from './energy-bill-add.component';

describe('EnergyBillAddComponent', () => {
  let component: EnergyBillAddComponent;
  let fixture: ComponentFixture<EnergyBillAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnergyBillAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnergyBillAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
