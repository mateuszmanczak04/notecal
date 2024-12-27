import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Notecal | Note',
	robots: {
		index: false,
	},
};

// Had to extract it to a separate file to use metadata API.
// const page = () => <NotePage />;
const page = () => <p>TODO</p>;

export default page;
