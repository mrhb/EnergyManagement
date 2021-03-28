import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PowerSubscriptionAnalysisComponent } from './power-subscription-analysis.component';

describe('PowerSubscriptionAnalysisComponent', () => {
  let component: PowerSubscriptionAnalysisComponent;
  let fixture: ComponentFixture<PowerSubscriptionAnalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PowerSubscriptionAnalysisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PowerSubscriptionAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
