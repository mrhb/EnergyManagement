import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatBillComponent } from './creat-bill.component';

describe('CreatBillComponent', () => {
  let component: CreatBillComponent;
  let fixture: ComponentFixture<CreatBillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatBillComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
