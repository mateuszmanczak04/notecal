import { Metadata } from 'next';
import RegisterPage from '../_components/register-page';

export const metadata: Metadata = {
	title: 'Join us today and improve your productivity!',
};

const page = () => <RegisterPage />;

export default page;
