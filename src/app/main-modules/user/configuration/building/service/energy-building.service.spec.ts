import { TestBed } from '@angular/core/testing';

import { EnergyBuildingService } from './energy-building.service';

describe('EnergyBuildingService', () => {
  let service: EnergyBuildingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnergyBuildingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
