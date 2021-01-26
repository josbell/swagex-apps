import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import {
  Booking,
  BookingData,
  BookingStoreApi,
  NewBookingPayload,
  isNewBookingPayload
} from '@swagex/shared-models';
import { from, Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { BookingPayloadAdapterService } from '../booking-payload-adapter.service';
/**
 * DB abstraction for Bookings resource
 */
@Injectable({
  providedIn: 'root'
})
export class BookingStoreService implements BookingStoreApi {
  constructor(
    private db: AngularFirestore,
    private payloadAdapter: BookingPayloadAdapterService
  ) {}

  /**
   * Gets bookings from DB
   **/
  getBookings(classId: string): Observable<Booking[]> {
    return this.db
      .collection<Booking>('bookings', ref =>
        ref
          .where('danceClassId', '==', classId)
          .where('canceled', '==', false)
          .where('archived', '==', false)
          .orderBy('spaceNumber')
      )
      .valueChanges({ idField: 'id' });
  }

  /**
   * Saves booking given a formatted payload or unformatted payload
   * If unformatted payload then it formats data first and then saves
   * Unformatted payload does not yet contain dance class info
   * @param booking
   */
  add(data: NewBookingPayload | BookingData): Observable<NewBookingPayload> {
    if (isNewBookingPayload(data)) {
      return this.saveToDB(data);
    } else {
      return this.payloadAdapter
        .getNewBookingPayload(data)
        .pipe(
          switchMap((formattedPayload: NewBookingPayload) =>
            this.saveToDB(formattedPayload)
          )
        );
    }
  }

  /**
   * Saves to DB given formatted payload
   * @param payload
   */
  saveToDB(payload: NewBookingPayload): Observable<NewBookingPayload> {
    return from(this.db.collection('bookings').add(payload)).pipe(
      switchMap(_ => {
        return of(payload);
      })
    );
  }

  /**
   * Cancels Booking
   * @param id
   * @param danceClassId
   * @param spaceNumber
   */
  cancelBooking({ id, danceClassId, spaceNumber }: Booking): Observable<void> {
    return from(
      this.db
        .collection('bookings')
        .doc(id)
        .update({ canceled: true })
        .then(_ => this.updateDanceClassSpace(danceClassId, spaceNumber, false))
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
      switchMap(_ => this.saveToDB(newBooking))
    );
  }

  /**
   * Marks spaceNumber as occupied in given dance class
   * @param danceClassId
   * @param spaceNumber
   * @param newValue
   */
  private updateDanceClassSpace(
    danceClassId: string,
    spaceNumber: string,
    newValue: boolean
  ): Promise<void> {
    const spacesRef = this.db.doc(`dance-class/${danceClassId}`);
    const spaceUpdate = {};
    spaceUpdate[`spaces.${spaceNumber}`] = newValue;

    return spacesRef.update(spaceUpdate);
  }
}
