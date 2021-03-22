import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PowerConsValidComponent } from './powerConsValid.component';

describe('PowerConsValidComponent', () => {
  let component: PowerConsValidComponent;
  let fixture: ComponentFixture<PowerConsValidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PowerConsValidComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PowerConsValidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
