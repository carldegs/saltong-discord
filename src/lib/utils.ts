import { intervalToDuration } from 'date-fns';
import utcToZonedTime from 'date-fns-tz/esm/utcToZonedTime';

export const getPhDate = (date: string | number | Date = new Date()) => {
  return utcToZonedTime(date, 'Asia/Manila');
};

export const titleCase = (string) =>
  string[0].toUpperCase() + string.slice(1).toLowerCase();

export const getRandomItem = <T>(arr: T[]) =>
  arr[Math.floor(Math.random() * arr.length)];

export const getDuration = (start: number, end: number) => {
  const duration = intervalToDuration({
    start: getPhDate(start),
    end: getPhDate(end),
  });

  return `${duration.hours ? `${duration.hours}h ` : ''}${
    duration.minutes ? `${duration.minutes}m ` : ''
  }${
    duration.seconds || (!duration.hours && !duration.minutes)
      ? `${duration.seconds}s`
      : ''
  }`;
};
