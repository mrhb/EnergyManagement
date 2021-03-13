import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerationBillListComponent } from './generation-bill-list.component';

describe('GenerationBillListComponent', () => {
  let component: GenerationBillListComponent;
  let fixture: ComponentFixture<GenerationBillListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerationBillListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerationBillListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
