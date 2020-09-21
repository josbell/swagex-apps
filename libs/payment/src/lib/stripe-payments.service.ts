import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StripeService } from 'ngx-stripe';

interface StripeCheckoutSession {
  id: string;
}

@Injectable({
  providedIn: 'root'
})
export class StripePaymentsService {
  constructor(
    private httpService: HttpClient,
    private stripeService: StripeService
  ) {}

  createCheckoutSession() {
    const url = 'http://localhost:3333/checkout';
    const body = {
      line_items: [
        {
          name: 'Reggaeton Advanced',
          amount: 1500,
          currency: 'usd',
          quantity: 1
        }
      ]
    };

    this.httpService
      .post(url, body)
      .subscribe((response: StripeCheckoutSession) => {
        const { id: sessionId } = response;
        this.stripeService.redirectToCheckout({ sessionId }).subscribe(
          response => console.log('redirectToCheckout response', response),
          err => console.log('redirectToCheckout error', err)
        );
      });
  }
}
