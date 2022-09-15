import { TestBed } from '@angular/core/testing';

import { SpendinglimitService } from './spendinglimit.service';

describe('SpendinglimitService', () => {
  let service: SpendinglimitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpendinglimitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
