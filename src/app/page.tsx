import { Metadata } from 'next';
import Footer from './_components/footer';
import Hero from './_components/hero';

export const metadata: Metadata = {
	title: 'NoteCal - Organize Your Notes',
	description: 'A productivity app which was made to keep your school notes organised based on lesson.',
};

const page = () => {
	return (
		<main className='flex flex-col'>
			<Hero />
			<Footer />
		</main>
	);
};

export default page;
