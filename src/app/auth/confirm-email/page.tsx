import { Metadata } from 'next';
import ConfirmEmailPage from '../_components/confirm-email-page';

export const metadata: Metadata = {
	title: 'Confirm your e-mail address',
	robots: {
		index: false,
	},
};

const page = () => <ConfirmEmailPage />;

export default page;
