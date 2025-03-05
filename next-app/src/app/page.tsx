import { Metadata } from 'next';
import CTA from '../components/cta';
import Features from '../components/features';
import Footer from '../components/footer';
import Hero from '../components/hero';
import HowItWorks from '../components/how-it-works';
import Pricing from '../components/pricing';

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
