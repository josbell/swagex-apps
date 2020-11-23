import { TestBed } from '@angular/core/testing';

import { ClassBookingsService } from './class-bookings.service';

describe('ClassBookingsService', () => {
  let service: ClassBookingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClassBookingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
