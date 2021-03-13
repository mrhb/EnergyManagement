import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GasCreateComponent } from './gas-create.component';

describe('GasCreateComponent', () => {
  let component: GasCreateComponent;
  let fixture: ComponentFixture<GasCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GasCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GasCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
