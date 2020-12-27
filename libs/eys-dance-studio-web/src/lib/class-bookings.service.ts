import { Inject, Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireFunctions } from '@angular/fire/functions';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

import {
  AdminViewBooking,
  NewBookingPayload,
  DanceClassBookingsApi,
  LineItem,
  BookingData,
  Booking
} from '@swagex/shared-models';
import { nextDay, WindowRefService } from '@swagex/utils';
import { StripeService } from 'ngx-stripe';
import { from, Observable, of } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { DanceClassesService } from './dance-classes.service';
import { BookingDB } from './db-model';

@Injectable({
  providedIn: 'root'
})
export class ClassBookingsService implements DanceClassBookingsApi {
  constructor(
    private db: AngularFirestore,
    private danceClassService: DanceClassesService,
    private firebaseFunctions: AngularFireFunctions,
    private stripeService: StripeService,
    private windowService: WindowRefService,
    private router: Router,
    private spinnerService: NgxSpinnerService,
    @Inject('environment') private environment: any
  ) {}

  /**
   * Gets bookings from DB
   **/
  getBookings(classId: string): Observable<AdminViewBooking[]> {
    return this.db
      .collection<AdminViewBooking>('bookings', ref =>
        ref
          .where('danceClassId', '==', classId)
          .where('canceled', '==', false)
          .orderBy('spaceNumber')
      )
      .valueChanges({ idField: 'id' });
  }

  /**
   * Books class in DB without calling payment api
   * @param bookingData
   * @param danceClassId
   */
  bookClassWithSubscription(bookingData: BookingData, danceClassId: string) {
    let payload: NewBookingPayload;
    this.spinnerService.show();
    this.getNewBookingPayload(danceClassId, bookingData)
      .pipe(
        tap(val => (payload = val)),
        switchMap((payload: NewBookingPayload) => this.saveNewBooking(payload)),
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
  bookClassWithCreditCardPayment(
    bookingData: BookingData,
    danceClassId: string
  ) {
    this.spinnerService.show();
    let payload: NewBookingPayload;
    this.getNewBookingPayload(danceClassId, bookingData)
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

  addBookingToDB(
    bookingData: BookingData,
    danceClassId: string
  ): Observable<NewBookingPayload> {
    return this.getNewBookingPayload(danceClassId, bookingData).pipe(
      tap(payload => (payload = payload)),
      switchMap((payload: NewBookingPayload) => this.saveNewBooking(payload))
    );
  }

  /**
   * Replaces user booking with new one in DB
   * Does not hit payment api
   * @param oldBooking
   * @param newBooking
   */
  replaceBooking(
    oldBooking: Booking,
    newBooking: NewBookingPayload
  ): Observable<NewBookingPayload> {
    return this.cancelBooking(oldBooking).pipe(
      switchMap(_ => this.saveNewBooking(newBooking))
    );
  }

  /**
   * Saves booking to DB
   * @param booking
   */
  saveNewBooking(booking: NewBookingPayload): Observable<NewBookingPayload> {
    return from(this.db.collection('bookings').add(booking)).pipe(
      switchMap(_ => {
        return of(booking);
      })
    );
  }

  cancelBooking({
    id,
    danceClassId,
    spaceNumber
  }: BookingDB): Observable<void> {
    return from(
      this.db
        .collection('bookings')
        .doc(id)
        .update({ canceled: true })
        .then(_ => this.updateDanceClassSpace(danceClassId, spaceNumber, false))
    );
  }

  updateDanceClassSpace(
    danceClassId: string,
    spaceNumber: string,
    newValue: boolean
  ): Promise<void> {
    const spacesRef = this.db.doc(`dance-class/${danceClassId}`);
    const spaceUpdate = {};
    spaceUpdate[`spaces.${spaceNumber}`] = newValue;

    return spacesRef.update(spaceUpdate);
  }

  /**
   * Stripe Service
   * Creates Stripe payment checkout session
   * @param payload
   */
  createCheckoutSession(
    payload: NewBookingPayload
  ): Observable<{ id: string }> {
    const { stripeCustomerId, stripeSessionId, ...rest } = payload;
    const lineItems = this.buildLineItem(payload);

    const createSession = this.firebaseFunctions.httpsCallable(
      'stripeCheckout'
    );

    const successRoute = 'payment-succeeded';
    const cancelRoute = `classes/${payload.danceClassId}/book`;
    const customerEmail = payload.email;
    const metadata = { ...rest };

    return createSession({
      lineItems,
      successRoute,
      cancelRoute,
      customerEmail,
      metadata
    });
  }

  /**
   * Stripe Payment Service
   * Builds line item
   * @param param0
   */
  buildLineItem({
    danceClassId,
    danceClassTitle,
    danceClassDate,
    spaceNumber,
    danceClassTime
  }: NewBookingPayload): LineItem[] {
    const imageUrl = `${this.environment.webAppUrl}/assets/images/dance-classes/${danceClassId}.jpg`;
    const description = `${danceClassDate}, ${danceClassTime} - Space Number: ${spaceNumber}`;
    const lineItems = [
      {
        name: danceClassTitle,
        amount: 1500,
        currency: 'usd',
        quantity: 1,
        images: [imageUrl],
        ...(!!description && { description })
      }
    ];
    return lineItems;
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

  getNewBookingPayload(
    danceClassId: string,
    {
      firstName = '',
      lastName = '',
      email = '',
      paymentMethod = '',
      spaceNumber = '',
      stripeCustomerId = '',
      stripeSessionId = ''
    }: BookingData
  ): Observable<NewBookingPayload> {
    return this.danceClassService.getClass(danceClassId).pipe(
      take(1),
      map(danceClass => {
        const danceClassDate = nextDay(danceClass.weekday, danceClass.time);
        const booking: NewBookingPayload = {
          canceled: false,
          archived: false,
          danceClassDate,
          danceClassId,
          danceClassTime: danceClass.timeDisplay,
          danceClassTitle: danceClass.title,
          firstName,
          lastName,
          email,
          paymentMethod,
          spaceNumber,
          stripeCustomerId,
          stripeSessionId
        };
        return booking;
      })
    );
  }
}
