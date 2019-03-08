import { TestBed } from '@angular/core/testing';

import { RoomGeneratorService } from './room-generator.service';

describe('RoomGeneratorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RoomGeneratorService = TestBed.get(RoomGeneratorService);
    expect(service).toBeTruthy();
  });
});
