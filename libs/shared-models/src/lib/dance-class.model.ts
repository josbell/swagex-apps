import { Instructor, Student } from './shared-models';

export interface DanceClass {
  id: string;
  active: boolean;
  description: string;
  instructor: string;
  shortDescription: string;
  subtitle: string;
  title: string;
  weekday: number;
  weekdayDisplay: string;
  time: string;
  timeDisplay: string;
  spacesBooked: BookedSpace[];
}

export interface BookedSpace {
  spaceNumber: number;
  booking: string;
}

export interface DanceClassConfig {
  id: string;
  name: string;
  mainInstructor: string; // Instructor ID
  description: string;
  recurring?: boolean;
  recurringRules?: RecurringRule[];
}

export interface DanceClassInstance {
  config: DanceClassConfig;
  date: Date;
  archived: boolean;
  studentsReserved: string[];
  studentsBooked: string[];
  studentsAttended: string[];
  bookingInfo: any;
}

export interface DanceSpot {
  number: number;
  booked: boolean;
}

export interface RecurringRule {
  weekday: WeekDay;
  time: string;
  instructor?: string; // Instructor ID
}

export enum WeekDay {
  SUNDAY,
  MONDAY,
  TUESDAY,
  WEDNESDAY,
  THURSDAY,
  FRIDAY,
  SATURDAY
}

export enum DifficultyLevel {
  BEGINNER = 'Beginner',
  INTERMEDIATE = 'Intermediate',
  ADVANCED = 'Advanced'
}
