import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireFunctions } from '@angular/fire/functions';
import { AdminViewBooking, DanceClassBookingsApi } from '@swagex/shared-models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClassBookingsService implements DanceClassBookingsApi {
  constructor(
    private db: AngularFirestore,
    private firebaseFunctions: AngularFireFunctions
  ) {}

  getBookings(classId: string): Observable<AdminViewBooking[]> {
    console.log(classId);
    return this.db
      .collection<AdminViewBooking>('bookings', ref =>
        ref.where('danceClassId', '==', classId).orderBy('spaceNumber')
      )
      .valueChanges();
  }
}
