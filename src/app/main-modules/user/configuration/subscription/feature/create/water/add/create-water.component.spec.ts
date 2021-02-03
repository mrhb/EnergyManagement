import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateWaterComponent } from './create-water.component';

describe('CreateWaterComponent', () => {
  let component: CreateWaterComponent;
  let fixture: ComponentFixture<CreateWaterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateWaterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateWaterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
