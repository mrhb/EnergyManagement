import { TestBed } from '@angular/core/testing';

import { EnergyLabelService } from './energy-label.service';

describe('EnergyLabelService', () => {
  let service: EnergyLabelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnergyLabelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
