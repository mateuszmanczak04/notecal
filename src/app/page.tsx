import Image from 'next/image';

export default function Home() {
	return (
		<div className='items-center text-center w-[600px] max-w-[calc(100%-32px)] mx-auto mt-16'>
			<p className='text-xl font-semibold'>NoteCal</p>
			<h1 className='text-5xl font-bold mt-2'>
				Let Your University Notes Be Organised
			</h1>
			<p className='mt-4'>
				Are you tired of grouping your university notes by a specific course
				lesson or date? NoteCal has been made to decrease your fatigue.
			</p>
			<button className='bg-pink-700 h-10 rounded-md px-3 text-white mt-8 w-full'>
				Click Here to Learn More
			</button>
		</div>
	);
}
