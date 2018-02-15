import { TestBed, inject } from '@angular/core/testing';

import { SharedMovieObjectService } from './shared-movie-object.service';

describe('SharedMovieObjectService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SharedMovieObjectService]
    });
  });

  it('should be created', inject([SharedMovieObjectService], (service: SharedMovieObjectService) => {
    expect(service).toBeTruthy();
  }));
});
