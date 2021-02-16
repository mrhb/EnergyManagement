import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWaterBillComponent } from './add-water-bill.component';

describe('AddWaterBillComponent', () => {
  let component: AddWaterBillComponent;
  let fixture: ComponentFixture<AddWaterBillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddWaterBillComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddWaterBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
