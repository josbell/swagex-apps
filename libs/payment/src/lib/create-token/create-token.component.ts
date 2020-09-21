import { Component, OnInit, ViewChild } from '@angular/core';
import {
  StripeCardComponent,
  StripeService,
  StripeCardNumberComponent
} from 'ngx-stripe';
import {
  StripeCardElementOptions,
  StripeElementsOptions
} from '@stripe/stripe-js';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'swagex-create-token',
  templateUrl: './create-token.component.html',
  styleUrls: ['./create-token.component.scss']
})
export class CreateTokenComponent implements OnInit {
  @ViewChild(StripeCardNumberComponent) card: StripeCardNumberComponent;
  stripeTest: FormGroup;
  cardOptions: StripeCardElementOptions = {
    hideIcon: false,
    iconStyle: 'default',
    hidePostalCode: false,
    style: {
      base: {
        iconColor: '#666EE8',
        color: '#31325F',
        fontWeight: '300',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '18px',
        '::placeholder': {
          color: '#CFD7E0'
        }
      }
    }
  };

  elementsOptions: StripeElementsOptions = {
    locale: 'en'
  };

  constructor(private fb: FormBuilder, private stripeService: StripeService) {}

  ngOnInit(): void {
    this.stripeTest = this.fb.group({
      name: ['', [Validators.required]],
      email: [''],
      amount: [1001, [Validators.required, Validators.pattern(/\d+/)]]
    });
  }

  pay() {
    this.stripeService.redirectToCheckout();
  }

  createToken(): void {
    const name = this.stripeTest.get('name').value;
    this.stripeService
      .createToken(this.card.element, { name })
      .subscribe(result => {
        if (result.token) {
          // Use the token
        } else if (result.error) {
          // Error creating the token
        }
      });
  }
}
