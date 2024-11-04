import { Metadata } from 'next';
import ForgotPasswordPage from '../_components/forgot-password-page';

export const metadata: Metadata = {
	title: 'Forgot your password?',
	robots: {
		index: false,
	},
};

const page = () => <ForgotPasswordPage />;

export default page;
