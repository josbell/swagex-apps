import { TestBed } from '@angular/core/testing';

import { DanceClassService } from './dance-class.service';

describe('DanceClassService', () => {
  let service: DanceClassService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DanceClassService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
