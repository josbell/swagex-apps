export interface DanceClass {
  id?: string;
  active: boolean;
  description: string;
  instructor: string;
  shortDescription: string;
  spaces: Spaces;
  subtitle: string;
  time: string;
  timeDisplay: string;
  title: string;
  weekday: number;
  weekdayDisplay: string;
}

export interface Spaces {
  [key: string]: boolean;
}

export interface AdminViewBooking extends PersonalDetails {
  created: Date;
  paymentMethod: string;
  spaceNumber: string;
}

export interface BookedSpace {
  spaceNumber: number;
  booking: string;
  studentInfo: PersonalDetails;
}

export interface PersonalDetails {
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
}

export interface NewBookingPayload {
  canceled: boolean;
  danceClassDate: string;
  danceClassId: string;
  danceClassTime: string;
  danceClassTitle: string;
  email: string;
  firstName: string;
  lastName?: string;
  paymentMethod: string;
  spaceNumber: string;
  stripeCustomerId?: string;
  stripeSessionId?: string;
}

export interface Booking extends NewBookingPayload {
  id: string;
}

export interface PersonalDetails {
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
}
