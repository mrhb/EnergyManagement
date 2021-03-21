import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DamandPenaltyComponent } from './damandPenalty.component';

describe('DamandPenaltyComponent', () => {
  let component: DamandPenaltyComponent;
  let fixture: ComponentFixture<DamandPenaltyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DamandPenaltyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DamandPenaltyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
