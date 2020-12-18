import { Injectable } from '@angular/core';
import { StripeService } from 'ngx-stripe';

@Injectable({
  providedIn: 'root'
})
export class StripePaymentsService {
  constructor(private stripeService: StripeService) {}
}
