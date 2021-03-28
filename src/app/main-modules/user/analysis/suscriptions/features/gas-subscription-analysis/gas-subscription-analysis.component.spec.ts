import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GasSubscriptionAnalysisComponent } from './gas-subscription-analysis.component';

describe('GasSubscriptionAnalysisComponent', () => {
  let component: GasSubscriptionAnalysisComponent;
  let fixture: ComponentFixture<GasSubscriptionAnalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GasSubscriptionAnalysisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GasSubscriptionAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
