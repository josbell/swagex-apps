import { Observable } from 'rxjs';
import { DanceClass } from './dance-class.model';
import { PersonalDetails } from './shared-models';

export abstract class DanceClassStoreApi {
  danceClasses: Observable<DanceClass[]>;

  loadClasses: () => void;

  fetchClasses: () => Observable<DanceClass[]>;

  getClass: (id: string) => Observable<DanceClass>;

  createCheckoutSession: (bookedClass: BookedClassPayload) => void;
}

export interface BookedClassPayload extends DanceClass {
  quantity: number;
  spaceNumber: string;
  classDate: string;
  studentDetails: PersonalDetails & { hasSubscription: boolean };
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
