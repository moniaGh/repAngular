import { TestBed } from '@angular/core/testing';

import { CorrespondantService } from './correspondant.service';

describe('CorrespondantService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CorrespondantService = TestBed.get(CorrespondantService);
    expect(service).toBeTruthy();
  });
});
