import { TestBed } from '@angular/core/testing';

import { SvGuard } from './sv.guard';

describe('SvGuard', () => {
  let guard: SvGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SvGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
