import { ComponentFixture, TestBed } from '@angular/core/testing';

import {InstrumConsumptionComponent } from './instrumConsumption.component';

describe('InstrumConsumptionComponent', () => {
  let component:InstrumConsumptionComponent;
  let fixture: ComponentFixture<InstrumConsumptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InstrumConsumptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InstrumConsumptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
