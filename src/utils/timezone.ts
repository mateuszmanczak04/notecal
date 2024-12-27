/**
 * Converts a given date to UTC.
 */
export const toUTC = (date: Date): Date => new Date(date.getTime() - date.getTimezoneOffset() * 60000);

/**
 * Converts a given UTC date to local time.
 */
export const fromUTC = (date: Date): Date => new Date(date.getTime() + date.getTimezoneOffset() * 60000);
