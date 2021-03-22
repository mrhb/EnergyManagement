import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GasConsumptionComponent } from './gasConsumption.component';

describe('GasConsumptionComponent', () => {
  let component: GasConsumptionComponent;
  let fixture: ComponentFixture<GasConsumptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GasConsumptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GasConsumptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
