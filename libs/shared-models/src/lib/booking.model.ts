import { PersonalDetails } from './dance-class.model';

export interface NewBookingPayload extends PersonalDetails {
  canceled: boolean;
  archived: boolean;
  danceClassDate: string;
  danceClassId: string;
  danceClassTime: string;
  danceClassTitle: string;
  paymentMethod: string;
  spaceNumber: string;
  stripeCustomerId?: string;
  stripeSessionId?: string;
}
export interface BookingData extends PersonalDetails {
  danceClassId: string;
  paymentMethod: string;
  spaceNumber: string;
  stripeCustomerId?: string;
  stripeSessionId?: string;
}
export interface Booking extends NewBookingPayload {
  id: string;
}

export function isNewBookingPayload(
  payload: NewBookingPayload | BookingData
): payload is NewBookingPayload {
  const {
    danceClassTime,
    danceClassTitle,
    danceClassDate
  } = payload as NewBookingPayload;
  return !!danceClassTime || !!danceClassTitle || !!danceClassDate;
}
