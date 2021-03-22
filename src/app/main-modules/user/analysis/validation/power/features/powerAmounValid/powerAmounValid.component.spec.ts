import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PowerAmounValidComponent } from './powerAmounValid.component';

describe('PowerAmounValidComponent', () => {
  let component: PowerAmounValidComponent;
  let fixture: ComponentFixture<PowerAmounValidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PowerAmounValidComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PowerAmounValidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
