import { BookingData } from '../booking.model';

export abstract class BookingServiceApi {
  bookClassWithSubscription: (bookingData: BookingData) => void;

  bookClassWithCreditCardPayment: (bookingData: BookingData) => void;
}
