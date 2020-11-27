export interface BookingDB {
  id: string;
  canceled: boolean;
  danceClassDate: string;
  danceClassId: string;
  danceClassTime: string;
  email: string;
  firstName: string;
  lastName?: string;
  paymentMethod: string;
  spaceNumber: string;
  stripeCustomerId?: string;
  stripeSessionId?: string;
}

export interface DanceClass {
  id: string;
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
