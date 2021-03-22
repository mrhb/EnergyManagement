import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PowerAmountComponent } from './powerAmount.component';

describe('PowerAmountComponent', () => {
  let component: PowerAmountComponent;
  let fixture: ComponentFixture<PowerAmountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PowerAmountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PowerAmountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
