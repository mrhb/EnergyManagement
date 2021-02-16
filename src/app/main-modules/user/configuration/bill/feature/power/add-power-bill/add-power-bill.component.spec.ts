import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPowerBillComponent } from './add-power-bill.component';

describe('AddPowerBillComponent', () => {
  let component: AddPowerBillComponent;
  let fixture: ComponentFixture<AddPowerBillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPowerBillComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPowerBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
