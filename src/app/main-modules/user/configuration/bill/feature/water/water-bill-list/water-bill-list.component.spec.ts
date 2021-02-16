import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaterBillListComponent } from './water-bill-list.component';

describe('WaterBillListComponent', () => {
  let component: WaterBillListComponent;
  let fixture: ComponentFixture<WaterBillListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WaterBillListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WaterBillListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
