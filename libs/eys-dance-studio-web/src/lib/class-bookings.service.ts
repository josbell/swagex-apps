import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { AngularFireFunctions } from '@angular/fire/functions';
import {
  AdminViewBooking,
  NewBookingPayload,
  DanceClassBookingsApi
} from '@swagex/shared-models';
import { nextDay } from '@swagex/utils';
import { from, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { DanceClassesService } from './dance-classes.service';
import { BookingDB } from './db-model';

@Injectable({
  providedIn: 'root'
})
export class ClassBookingsService implements DanceClassBookingsApi {
  constructor(
    private db: AngularFirestore,
    private danceClassService: DanceClassesService
  ) {}

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

  replaceBooking(oldBooking, newBooking): Observable<DocumentReference> {
    console.log(oldBooking, newBooking);
    return this.cancelBooking(oldBooking).pipe(
      switchMap(_ => this.saveNewBooking(newBooking))
    );
  }

  saveNewBooking(booking: BookingDB): Observable<DocumentReference> {
    console.log('saveNewBooking', booking);
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
    }
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
