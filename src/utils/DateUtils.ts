export function validate_date(dateString: string) {
    const inputDate = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to 00:00:00 for today's date
    if (inputDate < today) {
        throw new Error("Date must be equal or greater than today");
    }
}
