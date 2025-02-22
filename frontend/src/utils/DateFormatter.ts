export default function toLocalDateShort(input: Date | string | number) {
    const date = new Date(input);

    if (isNaN(date.getTime())) {
        console.error("Invalid date:", input);
        return "تاریخ نامعتبر";
    }

    // const weekday = new Intl.DateTimeFormat('fa-IR', { weekday: 'long' }).format(date);
    const day = new Intl.DateTimeFormat('fa-IR', { day: 'numeric' }).format(date);
    const month = new Intl.DateTimeFormat('fa-IR', { month: 'long' }).format(date);
    const year = new Intl.DateTimeFormat('fa-IR', { year: 'numeric' }).format(date);

    return `${day} ${month} ${year}`;
}