import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PowerCreateComponent } from './power-create.component';

describe('PowerCreateComponent', () => {
  let component: PowerCreateComponent;
  let fixture: ComponentFixture<PowerCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PowerCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PowerCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
