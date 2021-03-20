import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandSumComponent } from './demandSum.component';

describe('DemandSumComponent', () => {
  let component: DemandSumComponent;
  let fixture: ComponentFixture<DemandSumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemandSumComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandSumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
