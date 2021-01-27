import { Injectable } from '@angular/core';
import { BookingData, NewBookingPayload } from '@swagex/shared-models';
import { nextDay } from '@swagex/utils';
import { Observable, throwError } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { DanceClassesService } from './stores/dance-classes.service';

@Injectable({
  providedIn: 'root'
})
export class BookingPayloadAdapterService {
  constructor(private danceClassService: DanceClassesService) {}

  getNewBookingPayload({
    danceClassId,
    firstName = '',
    lastName = '',
    email = '',
    paymentMethod = '',
    spaceNumber = '',
    stripeCustomerId = '',
    stripeSessionId = ''
  }: BookingData): Observable<NewBookingPayload> {
    if (danceClassId) {
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
    } else {
      return throwError(new Error('danceClass id missing'));
    }
  }
}
