import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValveSizeComponent } from './valveSize.component';

describe('ValveSizeComponent', () => {
  let component: ValveSizeComponent;
  let fixture: ComponentFixture<ValveSizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValveSizeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValveSizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
