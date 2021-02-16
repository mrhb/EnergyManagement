import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGazBillComponent } from './add-gaz-bill.component';

describe('AddGazBillComponent', () => {
  let component: AddGazBillComponent;
  let fixture: ComponentFixture<AddGazBillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddGazBillComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddGazBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
