import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GazBillListComponent } from './gaz-bill-list.component';

describe('GazBillListComponent', () => {
  let component: GazBillListComponent;
  let fixture: ComponentFixture<GazBillListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GazBillListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GazBillListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
