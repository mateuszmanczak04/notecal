import type { Config } from 'tailwindcss';
import colors from 'tailwindcss/colors';

const config = {
	darkMode: 'class',
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
