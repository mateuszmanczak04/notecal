import { Metadata } from 'next';
import NotePage from '../_components/note-page';

export const metadata: Metadata = {
	title: 'Notecal | Note',
	robots: {
		index: false,
	},
};

// Had to extract it to a separate file to use metadata API.
const page = () => <NotePage />;

export default page;
