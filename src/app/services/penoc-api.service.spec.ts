import { TestBed } from '@angular/core/testing';

import { PenocApiService } from './penoc-api.service';

describe('PenocApiService', () => {
  let service: PenocApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PenocApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
