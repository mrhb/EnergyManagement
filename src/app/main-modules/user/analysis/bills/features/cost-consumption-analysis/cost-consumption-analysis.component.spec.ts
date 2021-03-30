import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CostConsumptionAnalysisComponent } from './cost-consumption-analysis.component';

describe('CostConsumptionAnalysisComponent', () => {
  let component: CostConsumptionAnalysisComponent;
  let fixture: ComponentFixture<CostConsumptionAnalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CostConsumptionAnalysisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CostConsumptionAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
