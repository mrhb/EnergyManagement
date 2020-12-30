import { TestBed } from '@angular/core/testing';

import { BillelectricService } from './bill-gas.service';

describe('UsersService', () => {
  let service: BillelectricService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BillelectricService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
