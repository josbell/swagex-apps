import { Observable } from 'rxjs';
import {
  AdminViewBooking,
  DanceClass,
  NewBookingPayload,
  PersonalDetails
} from './dance-class.model';
export abstract class DanceClassStoreApi {
  danceClasses: Observable<DanceClass[]>;

  loadClasses: () => void;

  fetchClasses: () => Observable<DanceClass[]>;

  getClass: (id: string) => Observable<DanceClass>;

  createCheckoutSession: (bookedClass: BookedClassPayload) => void;
}

export abstract class DanceClassBookingsApi {
  getBookings: (id: string) => Observable<AdminViewBooking[]>;
  cancelBooking: (booking: any) => Observable<any>;
  replaceBooking: (oldBooking, newBooking) => Observable<any>;
  saveNewBooking: (booking) => Observable<any>;
  getNewBookingPayload: (
    danceClassId: string,
    options: {
      firstName?;
      lastName?;
      email?;
      paymentMethod?;
      spaceNumber?;
      stripeCustomerId?;
      stripeSessionId?;
    }
  ) => Observable<NewBookingPayload>;
}

export interface BookedClassPayload extends DanceClass {
  spaceNumber: string;
  classDate: string;
  studentDetails: PersonalDetails & {
    paymentMethod: string;
  };
}

export interface BookingConfirmation {
  sessionId: string;
  danceClassId: string;
  danceClassTitle: string;
  danceClassTime: string;
  danceClassDate: string;
  bookingQuantity: number;
  spaceNumber: string;
}
