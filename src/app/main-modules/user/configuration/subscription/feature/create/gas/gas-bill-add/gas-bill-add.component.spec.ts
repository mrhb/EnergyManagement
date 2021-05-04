import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GasBillAddComponent } from './gas-bill-add.component';

describe('GasBillAddComponent', () => {
  let component: GasBillAddComponent;
  let fixture: ComponentFixture<GasBillAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GasBillAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GasBillAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
