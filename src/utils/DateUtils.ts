export function isDateValid(date: Date) {
  const current_date = new Date();
  console.log({ date, current_date });
  return (
    date >= current_date &&
    date.getHours() >= current_date.getHours() + 1 &&
    date.getMinutes() >= current_date.getMinutes()
  );
}
