import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PowerConsumptionComponent } from './powerConsumption.component';

describe('PowerConsumptionComponent', () => {
  let component: PowerConsumptionComponent;
  let fixture: ComponentFixture<PowerConsumptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PowerConsumptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PowerConsumptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
