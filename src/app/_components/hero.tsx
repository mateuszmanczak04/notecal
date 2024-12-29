import { Button } from '@/components/button';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

const Hero = () => {
	return (
		<section className='fles-1 mx-auto items-center px-4 pb-32 pt-16 text-center sm:pb-40 md:pb-48'>
			<h1 className='mx-auto max-w-[12ch] text-6xl font-black tracking-tight sm:text-7xl md:text-8xl'>
				Welcome to
				<span className='bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-[1.25em] text-transparent'>
					{' '}
					NoteCal
				</span>
			</h1>
			<p className='mx-auto mt-4 max-w-[34ch] leading-relaxed sm:text-lg md:text-xl'>
				The ultimate tool to organize your notes, tasks, and study life. Say goodbye to unorganized university
				assets!
			</p>
			<Button className='mt-4 shadow-2xl sm:mt-6 md:mt-8' asChild size='lg'>
				<Link prefetch href='/auth/register'>
					Try it yourself, it&apos;s free! <ChevronRight />
				</Link>
			</Button>
		</section>
	);
};

export default Hero;
