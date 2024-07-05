import type { Config } from 'tailwindcss';
import { DefaultColors } from 'tailwindcss/types/generated/colors';

const config = {
	darkMode: 'selector',
	content: [
		'./pages/**/*.{ts,tsx}',
		'./components/**/*.{ts,tsx}',
		'./app/**/*.{ts,tsx}',
		'./src/**/*.{ts,tsx}',
	],
	prefix: '',
	theme: {
		extend: {
			colors: {
				primary: {
					DEFAULT: 'blue',
				},
			},
			height: {
				'calendar-header': '40px',
				'calendar-row': '80px',
			},
		},
	},
	plugins: [require('tailwindcss-animate'), require('tailwind-scrollbar-hide')],
} satisfies Config;

export default config;
