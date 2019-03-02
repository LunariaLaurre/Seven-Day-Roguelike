import { TestBed } from '@angular/core/testing';

import { CombatLogService } from './combat-log.service';

describe('CombatLogService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CombatLogService = TestBed.get(CombatLogService);
    expect(service).toBeTruthy();
  });
});
