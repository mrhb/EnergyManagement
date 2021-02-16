import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEnergyBillComponent } from './add-energy-bill.component';

describe('AddEnergyBillComponent', () => {
  let component: AddEnergyBillComponent;
  let fixture: ComponentFixture<AddEnergyBillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEnergyBillComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEnergyBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
