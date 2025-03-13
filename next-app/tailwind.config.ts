import type { Config } from 'tailwindcss';
import colors from 'tailwindcss/colors';

const config = {
	darkMode: 'media',
	content: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
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
	plugins: [],
} satisfies Config;

export default config;
