import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function formatExcelDate(serial: number | string): string {
    // If it's already a string like "2024-01-01", just return it
    if (typeof serial === 'string' && serial.includes('-')) return serial;

    // If it's a number (Excel serial date)
    const num = Number(serial);
    if (!isNaN(num)) {
        // Excel base date is Dec 30, 1899
        // 25569 is the offset for Unix epoch
        const date = new Date(Math.round((num - 25569) * 86400 * 1000));
        return date.toLocaleDateString('en-CA'); // YYYY-MM-DD
    }

    return String(serial);
}
