import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PowerBillAddComponent } from './power-bill-add.component';

describe('PowerBillAddComponent', () => {
  let component: PowerBillAddComponent;
  let fixture: ComponentFixture<PowerBillAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PowerBillAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PowerBillAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
