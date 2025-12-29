const DATE_REGEX = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
const MAX_AGE_DAYS = 80 * 52 * 7;

// parse dd/mm/yyyy into numeric components
export const parseDate = (value: string): {
    day: number,
    month: number,
    year: number
} | null => {
    const match = value.match(DATE_REGEX);
    if (!match) return null;

    const [, day, month, year] = match;

    return {
        day: Number(day),
        month: Number(month),
        year: Number(year)
    };
}

// checks whether the date exists on the calendar
const isValidCalendarDate = (
    day: number,
    month: number,
    year: number
): boolean => {
    if (month < 1 || month > 12) return false;
    if (day < 1) return false;

    const daysInMonth = new Date(year, month, 0).getDate();
    return day <= daysInMonth;
}

// ensures the date is not in the future and not older than max age
const isWithinAllowedRange = (
    date: Date,
    today: Date
): boolean => {
    if (date > today) return false;

    const diffMs = today.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    return diffDays <= MAX_AGE_DAYS;
}

const checkDateValidity = (dateString: string): boolean => {
    const parsed = parseDate(dateString);
    if (!parsed) return false;

    const { day, month, year } = parsed;

    if (!isValidCalendarDate(day, month, year)) return false;

    const date = new Date(year, month - 1, day);
    const today = new Date();

    return isWithinAllowedRange(date, today);
}

export default checkDateValidity;