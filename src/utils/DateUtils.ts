export function validate_date(dateString: string) {
    const inputDate = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    inputDate.setHours(0, 0, 0, 0);

    if (inputDate < today) {
        throw new Error("Date must be equal or greater than today");
    }
}

export function format_date(dateString: string) {
    const date = new Date(dateString);
    const formattedDate = new Intl.DateTimeFormat("id-ID", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    }).format(date);
    return formattedDate;
}
