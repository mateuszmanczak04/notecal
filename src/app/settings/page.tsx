import { Metadata } from 'next';
import SettingsPage from './_components/settings-page';

export const metadata: Metadata = {
	title: 'Notecal | Settings',
	robots: {
		index: false,
	},
};

const page = () => <SettingsPage />;

export default page;
