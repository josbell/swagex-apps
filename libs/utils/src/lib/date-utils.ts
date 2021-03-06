import * as moment from 'moment';

export function nextDay(weekday: number, cutoffTime: string): string {
  let dateDisplay: string;
  const isWeekdayToday = moment().day() === weekday;
  if (isWeekdayToday) {
    const [hour, minute] = cutoffTime.split(':');
    const isPastCutoffTime = moment(hour, minute).isAfter();
    dateDisplay = isPastCutoffTime
      ? moment()
          .day(weekday)
          .add(7, 'days')
          .format('ddd, MMM D')
      : 'Today';
  } else {
    dateDisplay = moment()
      .day(weekday)
      .format('ddd, MMM D');
  }
  return dateDisplay;
}
