import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaterConsumptionComponent } from './waterConsumption.component';

describe('WaterConsumptionComponent', () => {
  let component: WaterConsumptionComponent;
  let fixture: ComponentFixture<WaterConsumptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WaterConsumptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WaterConsumptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
