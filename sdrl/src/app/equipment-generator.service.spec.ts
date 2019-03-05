import { TestBed } from '@angular/core/testing';

import { EquipmentGeneratorService } from './equipment-generator.service';

describe('EquipmentGeneratorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EquipmentGeneratorService = TestBed.get(EquipmentGeneratorService);
    expect(service).toBeTruthy();
  });
});
