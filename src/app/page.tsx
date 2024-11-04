import { Metadata } from 'next';
import Footer from '../components/common/footer';
import Hero from '../components/common/hero';

export const metadata: Metadata = {
	title: 'NoteCal - Organize Your Notes',
	description:
		'A productivity app which was made to keep your school notes organised based on lesson.',
};

const page = () => {
	return (
		<div className='flex flex-col'>
			<Hero />
			<Footer />
		</div>
	);
};

export default page;
