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
