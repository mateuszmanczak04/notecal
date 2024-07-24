import { Button } from '@/components/ui/button';
import Link from 'next/link';

const Hero = () => {
	return (
		<div className='fles-1 mx-auto min-h-screen w-[640px] max-w-[calc(100%-32px)] items-center pt-16 text-center md:w-[720px]'>
			<p className='text-xl font-semibold sm:text-2xl md:text-3xl'>NoteCal</p>
			<h1 className='mt-2 text-5xl font-bold tracking-tighter sm:text-7xl md:text-8xl'>
				Let Your University Notes Be Organised
			</h1>
			<p className='mt-4 sm:mt-6 sm:text-lg md:mt-8 md:text-xl'>
				Are you tired of grouping your university notes by a specific course
				lesson or date? NoteCal has been made to decrease your fatigue.
			</p>
			<Button size='lg' className='mt-8 w-full sm:w-fit' asChild>
				<Link href='/auth/register'>Click Here to Join</Link>
			</Button>
		</div>
	);
};

export default Hero;
