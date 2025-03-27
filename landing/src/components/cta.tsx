import Link from 'next/link';
import { FRONTEND_DOMAIN } from '../utils/app-domain';
import { Button } from './button';

const CTA = () => {
	return (
		<section id='cta' className='mx-auto max-w-screen-sm px-4'>
			<div className='border-primary-500 space-y-4 rounded-xl border-4 bg-white p-8 text-center shadow-2xl sm:p-12 md:p-16 dark:bg-neutral-800'>
				<h2 className='text-center text-3xl font-black tracking-tight sm:text-4xl md:text-5xl'>
					Get Started Today!
				</h2>
				<p className='mx-auto mt-4 max-w-[34ch] leading-relaxed opacity-75 sm:text-lg md:text-xl'>
					Sign up now and take control of your study life with NoteCal.
				</p>
				<Button asChild size='lg'>
					<Link href={`${FRONTEND_DOMAIN}/auth/register`}>Sign Up for Free</Link>
				</Button>
			</div>
		</section>
	);
};

export default CTA;
