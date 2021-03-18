import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoltagComponent } from './voltag.component';

describe('VoltagComponent', () => {
  let component: VoltagComponent;
  let fixture: ComponentFixture<VoltagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoltagComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VoltagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
