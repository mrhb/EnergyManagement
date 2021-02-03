import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEnergyComponent } from './create-energy.component';

describe('CreateEnergyComponent', () => {
  let component: CreateEnergyComponent;
  let fixture: ComponentFixture<CreateEnergyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEnergyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEnergyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
