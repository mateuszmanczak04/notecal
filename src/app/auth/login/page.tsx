import { Metadata } from 'next';
import LoginPage from '../_components/login-page';

export const metadata: Metadata = {
	title: 'Login to your account!',
};

const page = () => <LoginPage />;

export default page;
