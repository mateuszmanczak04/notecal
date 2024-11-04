import { Metadata } from 'next';
import ResetPasswordPage from '../_components/reset-password-page';

export const metadata: Metadata = {
	title: 'Reset your password',
	robots: {
		index: false,
	},
};

const page = () => <ResetPasswordPage />;

export default page;
