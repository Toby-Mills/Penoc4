import { TestBed } from '@angular/core/testing';

import { ScreenWidthService } from './screen-width.service';

describe('ScreenSizeService', () => {
  let service: ScreenWidthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScreenWidthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
