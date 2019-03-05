import { TestBed } from '@angular/core/testing';

import { CombatHandlerService } from './combat-handler.service';

describe('CombatHandlerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CombatHandlerService = TestBed.get(CombatHandlerService);
    expect(service).toBeTruthy();
  });
});
