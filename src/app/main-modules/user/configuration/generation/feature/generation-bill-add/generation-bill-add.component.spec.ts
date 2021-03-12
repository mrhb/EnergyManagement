import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerationBillAddComponent } from './generation-bill-add.component';

describe('GenerationBillAddComponent', () => {
  let component: GenerationBillAddComponent;
  let fixture: ComponentFixture<GenerationBillAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerationBillAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerationBillAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
