import ErrorMessage from '@/components/common/error-message';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'An error occurred',
	robots: {
		index: false,
	},
};

const page = () => {
	return <ErrorMessage>Auth error occurred</ErrorMessage>;
};

export default page;
