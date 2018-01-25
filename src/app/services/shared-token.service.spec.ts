import { TestBed, inject } from '@angular/core/testing';

import { SharedTokenService } from './shared-token.service';

describe('SharedTokenService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SharedTokenService]
    });
  });

  it('should be created', inject([SharedTokenService], (service: SharedTokenService) => {
    expect(service).toBeTruthy();
  }));
});
