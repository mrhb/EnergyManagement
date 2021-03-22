import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnergyAmountComponent } from './energyAmount.component';

describe('EnergyAmountComponent', () => {
  let component: EnergyAmountComponent;
  let fixture: ComponentFixture<EnergyAmountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnergyAmountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnergyAmountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
