import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const COLORS = [
	{ description: 'Blue', hex: '#2563eb' },
	{ description: 'Green', hex: '#16a34a' },
	{ description: 'Yellow', hex: '#ca8a04' },
	{ description: 'Orange', hex: '#ea580c' },
	{ description: 'Red', hex: '#dc2626' },
	{ description: 'Pink', hex: '#db2777' },
	{ description: 'Purple', hex: '#9333ea' },
];

export const cmdOrCtrl = () =>
	window.navigator.platform.match(/^Mac/) ? 'cmd' : 'ctrl';
