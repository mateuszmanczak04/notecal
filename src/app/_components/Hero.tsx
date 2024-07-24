import { Button } from '@/components/ui/button';
import Link from 'next/link';

const Hero = () => {
	return (
		<div className='fles-1 mx-auto w-[600px] max-w-[calc(100%-32px)] items-center pt-16 text-center'>
			<p className='text-xl font-semibold sm:text-2xl'>NoteCal</p>
			<h1 className='mt-2 text-5xl font-bold sm:text-7xl'>
				Let Your University Notes Be Organised
			</h1>
			<p className='mt-4 sm:text-lg'>
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
