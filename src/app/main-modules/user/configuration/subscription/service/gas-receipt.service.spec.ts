import { TestBed } from '@angular/core/testing';

import { GasReceiptService } from './gas-receipt.service';

describe('GasReceiptService', () => {
  let service: GasReceiptService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GasReceiptService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
