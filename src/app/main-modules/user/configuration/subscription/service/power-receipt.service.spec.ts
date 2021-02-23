import { TestBed } from '@angular/core/testing';

import { PowerReceiptService } from './power-receipt.service';

describe('PowerReceiptService', () => {
  let service: PowerReceiptService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PowerReceiptService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
