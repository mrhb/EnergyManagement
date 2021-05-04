import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GasBillListComponent } from './gas-bill-list.component';

describe('GasBillListComponent', () => {
  let component: GasBillListComponent;
  let fixture: ComponentFixture<GasBillListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GasBillListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GasBillListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
