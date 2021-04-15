import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TariffPowerParam2Component } from './tariff-power-param2.component';

describe('TariffPowerParam2Component', () => {
  let component: TariffPowerParam2Component;
  let fixture: ComponentFixture<TariffPowerParam2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TariffPowerParam2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TariffPowerParam2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
