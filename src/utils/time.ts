export function isPickUpTimeValid(date: Date) {
  const current_date = new Date();
  return current_date.getTime() + 3600_000 <= date.getTime(); // +1 hour from current timestamp
}
