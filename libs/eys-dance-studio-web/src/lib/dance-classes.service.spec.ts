import { TestBed } from '@angular/core/testing';

import { DanceClassesService } from './dance-classes.service';

describe('DanceClassesService', () => {
  let service: DanceClassesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DanceClassesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
