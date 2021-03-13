import { TestBed } from '@angular/core/testing';

import { EnergyReceiptService } from './energy-receipt.service';

describe('EnergyReceiptService', () => {
  let service: EnergyReceiptService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnergyReceiptService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
