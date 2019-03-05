import { TestBed } from '@angular/core/testing';

import { EnemyGeneratorService } from './enemy-generator.service';

describe('EnemyGeneratorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EnemyGeneratorService = TestBed.get(EnemyGeneratorService);
    expect(service).toBeTruthy();
  });
});
