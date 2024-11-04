import ErrorMessage from '@/components/common/error-message';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'An error occurred',
	robots: {
		index: false,
	},
};

const AuthErrorPage = () => {
	return <ErrorMessage>Auth error occurred</ErrorMessage>;
};

export default AuthErrorPage;
