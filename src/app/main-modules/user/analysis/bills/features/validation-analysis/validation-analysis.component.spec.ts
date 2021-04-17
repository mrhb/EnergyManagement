import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationAnalysisComponent } from './validation-analysis.component';

describe('ValidationAnalysisComponent', () => {
  let component: ValidationAnalysisComponent;
  let fixture: ComponentFixture<ValidationAnalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidationAnalysisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidationAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
