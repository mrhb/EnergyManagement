import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaterBillAddComponent } from './water-bill-add.component';

describe('WaterBillAddComponent', () => {
  let component: WaterBillAddComponent;
  let fixture: ComponentFixture<WaterBillAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WaterBillAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WaterBillAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
