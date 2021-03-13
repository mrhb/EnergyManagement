import { TestBed } from '@angular/core/testing';

import { PowerBuildingService } from './power-building.service';

describe('PowerBuildingService', () => {
  let service: PowerBuildingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PowerBuildingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
