import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GasDemandComponent } from './gasDemand.component';

describe('GasDemandComponent', () => {
  let component: GasDemandComponent;
  let fixture: ComponentFixture<GasDemandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GasDemandComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GasDemandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
