import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GasAmounValidComponent } from './gasAmounValid.component';

describe('GasAmounValidComponent', () => {
  let component: GasAmounValidComponent;
  let fixture: ComponentFixture<GasAmounValidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GasAmounValidComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GasAmounValidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
