import { TestBed } from '@angular/core/testing';

import { PhGuard } from './ph.guard';

describe('PhGuard', () => {
  let guard: PhGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PhGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
