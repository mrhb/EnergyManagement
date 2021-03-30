import { TestBed } from '@angular/core/testing';

import { BillAnalysisService } from './bill-analysis.service';

describe('BillAnalysisService', () => {
  let service: BillAnalysisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BillAnalysisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
