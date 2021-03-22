import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GasAmountComponent } from './gasAmount.component';

describe('GasAmountComponent', () => {
  let component: GasAmountComponent;
  let fixture: ComponentFixture<GasAmountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GasAmountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GasAmountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
