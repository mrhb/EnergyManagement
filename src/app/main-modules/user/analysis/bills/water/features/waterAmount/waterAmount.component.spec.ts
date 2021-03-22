import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaterAmountComponent } from './waterAmount.component';

describe('WaterAmountComponent', () => {
  let component: WaterAmountComponent;
  let fixture: ComponentFixture<WaterAmountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WaterAmountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WaterAmountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
