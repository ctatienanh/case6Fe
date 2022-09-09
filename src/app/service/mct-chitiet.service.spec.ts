import { TestBed } from '@angular/core/testing';

import { MctChitietService } from './mct-chitiet.service';

describe('MctChitietService', () => {
  let service: MctChitietService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MctChitietService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
