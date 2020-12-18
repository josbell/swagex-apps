import { Inject, Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { AngularFireFunctions } from '@angular/fire/functions';
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
import { from, iif, Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
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
    @Inject('environment') private environment: any
  ) {}

  /**
   * Gets bookings from DB
   **/
  getBookings(classId: string): Observable<AdminViewBooking[]> {
    console.log(classId);
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
    return this.getNewBookingPayload(danceClassId, bookingData).pipe(
      tap(payload => (payload = payload)),
      switchMap((payload: NewBookingPayload) => this.saveNewBooking(payload)),
      switchMap(_ =>
        this.cacheConfirmationDataAndRedirect('subscription', payload)
      )
    );
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
    let payload: NewBookingPayload;
    this.getNewBookingPayload(danceClassId, bookingData)
      .pipe(
        switchMap((payload: NewBookingPayload) =>
          this.createCheckoutSession(payload)
        ),
        switchMap(({ id: sessionId }) =>
          this.cacheConfirmationDataAndRedirect(sessionId, payload)
        )
      )
      .subscribe(
        response => console.log('redirectToCheckout response', response),
        err => console.log('redirectToCheckout error', err)
      );
  }

  addBookingToDB(
    bookingData: BookingData,
    danceClassId: string
  ): Observable<DocumentReference> {
    return this.getNewBookingPayload(danceClassId, bookingData).pipe(
      tap(payload => (payload = payload)),
      switchMap((payload: NewBookingPayload) => this.saveNewBooking(payload))
    );
  }

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

  cacheConfirmationDataAndRedirect(
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
    return this.stripeService.redirectToCheckout({ sessionId });
  }

  replaceBooking(
    oldBooking: Booking,
    newBooking: NewBookingPayload
  ): Observable<DocumentReference> {
    return this.cancelBooking(oldBooking).pipe(
      switchMap(_ => this.saveNewBooking(newBooking))
    );
  }

  saveNewBooking(booking: NewBookingPayload): Observable<DocumentReference> {
    return from(this.db.collection('bookings').add(booking));
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
      map(danceClass => {
        const danceClassDate = nextDay(danceClass.weekday, danceClass.time);
        const booking: NewBookingPayload = {
          canceled: false,
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
