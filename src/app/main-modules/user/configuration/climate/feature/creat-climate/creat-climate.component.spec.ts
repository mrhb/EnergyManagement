import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateClimateComponent } from './creat-climate.component';

describe('CreateClimateComponent', () => {
  let component: CreateClimateComponent;
  let fixture: ComponentFixture<CreateClimateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateClimateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateClimateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
