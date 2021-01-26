import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

import {
  NewBookingPayload,
  BookingData,
  BookingServiceApi,
  LineItem
} from '@swagex/shared-models';
import { WindowRefService } from '@swagex/utils';
import { StripeService } from 'ngx-stripe';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { BookingStoreService } from './stores/booking-store.service';
import { BookingPayloadAdapterService } from './booking-payload-adapter.service';
import { ApiService } from './api/api.service';

/**
 * Handles the two main booking flows
 * Booking with Credit Card Payment
 * Booking with Subscription
 */
@Injectable({
  providedIn: 'root'
})
export class ClassBookingsService implements BookingServiceApi {
  constructor(
    private bookingStore: BookingStoreService,
    private payloadAdapter: BookingPayloadAdapterService,
    private stripeService: StripeService,
    private windowService: WindowRefService,
    private router: Router,
    private spinnerService: NgxSpinnerService,
    private api: ApiService,
    @Inject('environment') private environment: any
  ) {}

  /**
   * Books class in DB without calling payment api
   * @param bookingData
   * @param danceClassId
   */
  bookClassWithSubscription(bookingData: BookingData) {
    let payload: NewBookingPayload;
    this.spinnerService.show();
    this.payloadAdapter
      .getNewBookingPayload(bookingData)
      .pipe(
        tap(val => (payload = val)),
        switchMap((payload: NewBookingPayload) =>
          this.bookingStore.add(payload)
        ),
        tap(_ => this.cacheConfirmationData('subscription', payload)),
        switchMap(_ => this.redirectToConfirmationView())
      )
      .subscribe(_ => this.spinnerService.hide());
  }

  /**
   * Redirects user to payment screen
   * Booking gets created by cloud function after payments hook
   * @param bookingData
   * @param danceClassId
   */
  bookClassWithCreditCardPayment(bookingData: BookingData) {
    this.spinnerService.show();
    let payload: NewBookingPayload;
    this.payloadAdapter
      .getNewBookingPayload(bookingData)
      .pipe(
        switchMap((val: NewBookingPayload) => {
          payload = val;
          return this.createCheckoutSession(val);
        }),
        tap(({ id: sessionId }) =>
          this.cacheConfirmationData(sessionId, payload)
        ),
        switchMap(({ id: sessionId }) => this.redirectToCheckout(sessionId)),
        tap(_ => this.spinnerService.hide())
      )
      .subscribe(
        response => console.log('redirectToCheckout response', response),
        err => console.log('redirectToCheckout error', err)
      );
  }

  /**
   * Creates payment checkout session
   * @param payload
   */
  createCheckoutSession(data: NewBookingPayload): Observable<{ id: string }> {
    const { stripeCustomerId, stripeSessionId, ...rest } = data;
    const metadata = { ...rest };
    const successRoute = 'payment-succeeded';
    const cancelRoute = `classes/${data.danceClassId}/book`;
    const customerEmail = data.email;
    const productImage = `${this.environment.webAppUrl}/assets/images/dance-classes/${data.danceClassId}.jpg`;
    const description = `${data.danceClassDate}, ${data.danceClassTime} - Space Number: ${data.spaceNumber}`;

    const lineItems: LineItem = {
      name: data.danceClassTitle,
      amount: 1500,
      currency: 'usd',
      quantity: 1,
      images: [productImage],
      ...(!!description && { description })
    };
    return this.api.createSession({
      lineItems,
      successRoute,
      cancelRoute,
      customerEmail,
      metadata
    });
  }

  redirectToCheckout(sessionId: string) {
    return this.stripeService.redirectToCheckout({ sessionId });
  }

  redirectToConfirmationView() {
    return this.router.navigate(['payment-succeeded'], {
      queryParams: { session_id: 'subscription' }
    });
  }

  cacheConfirmationData(
    sessionId,
    {
      spaceNumber,
      danceClassTitle,
      danceClassDate,
      danceClassTime
    }: NewBookingPayload
  ) {
    let confirmationCache = {
      spaceNumber,
      danceClassTitle,
      danceClassDate,
      danceClassTime
    };
    this.windowService.nativeWindow.localStorage.setItem(
      sessionId,
      JSON.stringify(confirmationCache)
    );
  }
}
