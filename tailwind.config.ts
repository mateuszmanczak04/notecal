import type { Config } from 'tailwindcss';
import colors from 'tailwindcss/colors';

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
				primary: colors.blue,
				neutral: colors.gray,
				'accent-1': colors.blue,
				'accent-2': colors.green,
				'accent-3': colors.yellow,
				'accent-4': colors.orange,
				'accent-5': colors.red,
				'accent-6': colors.pink,
				'accent-7': colors.purple,
				success: colors.green,
				warning: colors.orange,
				error: colors.red,
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
