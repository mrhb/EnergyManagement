import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GasConsValidComponent } from './gasConsValid.component';

describe('GasConsValidComponent', () => {
  let component: GasConsValidComponent;
  let fixture: ComponentFixture<GasConsValidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GasConsValidComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GasConsValidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
