import { TestBed } from '@angular/core/testing';

import { StripePaymentsService } from './stripe-payments.service';

describe('StripePaymentsService', () => {
  let service: StripePaymentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StripePaymentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
