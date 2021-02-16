import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnergyLabelComponent } from './energy-label.component';

describe('EnergyLabelComponent', () => {
  let component: EnergyLabelComponent;
  let fixture: ComponentFixture<EnergyLabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnergyLabelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnergyLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
