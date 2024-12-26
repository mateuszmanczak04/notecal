import { Metadata } from 'next';
import CalendarPage from './_components/calendar-page';

export const metadata: Metadata = {
	title: 'Notecal | Calendar view',
	robots: {
		index: false,
	},
};

const page = () => <CalendarPage />;

export default page;
