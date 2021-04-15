import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TariffPowerParam1Component } from './tariff-power-param1.component';

describe('TariffPowerParam1Component', () => {
  let component: TariffPowerParam1Component;
  let fixture: ComponentFixture<TariffPowerParam1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TariffPowerParam1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TariffPowerParam1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
