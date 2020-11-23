export interface PersonalDetails {
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
}

export interface Shipping {
  name: string;
  phone: string;
  address: Address;
}

export interface Address {
  city: string;
  country: string;
  line1: string;
  line2: string;
  postalCode: string;
  state: string;
}

export interface Instructor extends PersonalDetails {
  danceClassesTeaching?: string[];
}

export interface Student extends PersonalDetails {
  classesBooked?: string[];
  subscriptions: [];
}

export interface Subscription {
  id: string;
  created: Date;
  totalClasses: number;
  classesLeft: number;
  name?: string;
  description?: string;
  paymentMethod?: string;
}
