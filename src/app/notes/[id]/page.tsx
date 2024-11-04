import { Metadata } from 'next';
import NotePage from '../_components/note-page';

export const metadata: Metadata = {
	title: 'Note',
	robots: {
		index: false,
	},
};

const page = () => <NotePage />;

export default page;
