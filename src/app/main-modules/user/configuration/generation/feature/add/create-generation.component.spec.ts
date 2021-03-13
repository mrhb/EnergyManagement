import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateGenerationComponent } from './create-generation.component';

describe('CreateGenerationComponent', () => {
  let component: CreateGenerationComponent;
  let fixture: ComponentFixture<CreateGenerationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateGenerationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateGenerationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
