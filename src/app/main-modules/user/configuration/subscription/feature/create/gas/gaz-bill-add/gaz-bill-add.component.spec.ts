import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GazBillAddComponent } from './gaz-bill-add.component';

describe('GazBillAddComponent', () => {
  let component: GazBillAddComponent;
  let fixture: ComponentFixture<GazBillAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GazBillAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GazBillAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
