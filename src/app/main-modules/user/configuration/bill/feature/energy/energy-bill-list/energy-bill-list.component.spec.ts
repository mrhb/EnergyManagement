import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnergyBillListComponent } from './energy-bill-list.component';

describe('EnergyBillListComponent', () => {
  let component: EnergyBillListComponent;
  let fixture: ComponentFixture<EnergyBillListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnergyBillListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnergyBillListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
