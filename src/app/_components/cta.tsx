import { Button } from '@/components/button';
import Link from 'next/link';

const CTA = () => {
	return (
		<section id='cta' className='mx-auto max-w-screen-sm px-4'>
			<div className='space-y-4 rounded-xl border-4 border-primary-500 bg-white p-8 text-center shadow-2xl sm:p-12 md:p-16'>
				<h2 className='text-center text-3xl font-black tracking-tight sm:text-4xl md:text-5xl'>
					Get Started Today!
				</h2>
				<p className='mx-auto mt-4 max-w-[34ch] leading-relaxed sm:text-lg md:text-xl'>
					Sign up now and take control of your study life with NoteCal.
				</p>
				<Button asChild size='lg'>
					<Link href='/auth/register'>Sign Up for Free</Link>
				</Button>
			</div>
		</section>
	);
};

export default CTA;
