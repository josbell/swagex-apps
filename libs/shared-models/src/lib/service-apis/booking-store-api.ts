import { Observable } from 'rxjs';
import { Booking, BookingData, NewBookingPayload } from '../booking.model';

export abstract class BookingStoreApi {
  getBookings: (id: string) => Observable<Booking[]>;

  add: (booking: NewBookingPayload | BookingData) => Observable<any>;

  cancelBooking: (booking: any) => Observable<any>;

  replaceBooking: (oldBooking, newBooking) => Observable<any>;
}
