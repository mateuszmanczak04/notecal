import Image from 'next/image';

export default function Home() {
	return (
		<div className='mx-auto mt-16 w-[600px] max-w-[calc(100%-32px)] items-center text-center'>
			<p className='text-xl font-semibold'>NoteCal</p>
			<h1 className='mt-2 text-5xl font-bold'>
				Let Your University Notes Be Organised
			</h1>
			<p className='mt-4'>
				Are you tired of grouping your university notes by a specific course
				lesson or date? NoteCal has been made to decrease your fatigue.
			</p>
			<button className='mt-8 h-10 w-full rounded-md bg-pink-700 px-3 text-white'>
				Click Here to Learn More
			</button>
		</div>
	);
}
