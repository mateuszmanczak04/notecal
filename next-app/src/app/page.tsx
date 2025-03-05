import { Metadata } from 'next';
import CTA from './_components/cta';
import Features from './_components/features';
import Footer from './_components/footer';
import Hero from './_components/hero';
import HowItWorks from './_components/how-it-works';
import Pricing from './_components/pricing';

export const metadata: Metadata = {
	title: 'NoteCal - The Ultimate Student Note and Task Organizer',
	description:
		'Organize your study life with NoteCal. Create courses, write lecture notes, manage tasks, and stay productive. Featuring a WYSIWYG editor, customizable calendar views, and secure authentication. Boost your learning efficiency today!',
};

const page = () => {
	return (
		<main className='space-y-16'>
			<Hero />
			<Features />
			<HowItWorks />
			<Pricing />
			<CTA />
			<Footer />
		</main>
	);
};

export default page;
