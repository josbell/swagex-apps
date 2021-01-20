import { Observable } from 'rxjs';
import {
  AdminViewBooking,
  DanceClass,
  PersonalDetails
} from './dance-class.model';
export abstract class DanceClassStoreApi {
  danceClasses: Observable<DanceClass[]>;

  fetchClasses: () => Observable<DanceClass[]>;

  getClass: (id: string) => Observable<DanceClass>;
}

export abstract class DanceClassBookingsApi {
  getBookings: (id: string) => Observable<AdminViewBooking[]>;
  cancelBooking: (booking: any) => Observable<any>;
  replaceBooking: (oldBooking, newBooking) => Observable<any>;
  saveNewBooking: (booking) => Observable<any>;
  addBookingToDB: (
    bookingData: BookingData,
    danceClassId: string
  ) => Observable<any>;
  bookClassWithSubscription: (
    bookingData: BookingData,
    danceClassId: string
  ) => void;
  bookClassWithCreditCardPayment: (
    bookingData: BookingData,
    danceClassId: string
  ) => void;
}

export interface BookingData extends PersonalDetails {
  paymentMethod;
  spaceNumber;
  stripeCustomerId?;
  stripeSessionId?;
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
