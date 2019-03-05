import { TestBed } from '@angular/core/testing';

import { AbilityGeneratorService } from './ability-generator.service';

describe('AbilityGeneratorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AbilityGeneratorService = TestBed.get(AbilityGeneratorService);
    expect(service).toBeTruthy();
  });
});
