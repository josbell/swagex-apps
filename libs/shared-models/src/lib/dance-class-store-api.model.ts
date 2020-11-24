import { Observable } from 'rxjs';
import { AdminViewBooking, DanceClass } from './dance-class.model';
import { PersonalDetails } from './shared-models';

export abstract class DanceClassStoreApi {
  danceClasses: Observable<DanceClass[]>;

  loadClasses: () => void;

  fetchClasses: () => Observable<DanceClass[]>;

  getClass: (id: string) => Observable<DanceClass>;

  createCheckoutSession: (bookedClass: BookedClassPayload) => void;
}

export abstract class DanceClassBookingsApi {
  getBookings: (id: string) => Observable<AdminViewBooking[]>;
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
