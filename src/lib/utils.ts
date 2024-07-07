import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const COLORS = [
	{ description: 'Blue', hex: '#3b82f6' },
	{ description: 'Green', hex: '#22c55e' },
	{ description: 'Yellow', hex: '#eab308' },
	{ description: 'Orange', hex: '#f97316' },
	{ description: 'Red', hex: '#ef4444' },
	{ description: 'Pink', hex: '#ec4899' },
	{ description: 'Purple', hex: '#a855f7' },
];
