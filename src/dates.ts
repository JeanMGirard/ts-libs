export function dateMinusDays(numberOfDays: number): Date {
  let date = new Date();
  date.setDate(date.getDate() - numberOfDays);
  return date;
}
