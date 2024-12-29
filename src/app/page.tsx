import { Metadata } from 'next';
import Footer from './_components/footer';
import Hero from './_components/hero';

export const metadata: Metadata = {
	title: 'NoteCal - The Ultimate Student Note and Task Organizer',
	description:
		'Organize your study life with NoteCal. Create courses, write lecture notes, manage tasks, and stay productive. Featuring a WYSIWYG editor, customizable calendar views, and secure authentication. Boost your learning efficiency today!',
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
