import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PowerBillListComponent } from './power-bill-list.component';

describe('PowerBillListComponent', () => {
  let component: PowerBillListComponent;
  let fixture: ComponentFixture<PowerBillListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PowerBillListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PowerBillListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
