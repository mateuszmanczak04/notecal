const HowItWorks = () => {
	return (
		<section id='features' className='mx-auto max-w-screen-md px-4'>
			<h2 className='text-center text-3xl font-black tracking-tight sm:text-4xl md:text-5xl'>How It Works</h2>
			<div className='mt-4 grid gap-4 sm:mt-6 md:mt-8'>
				<article className='rounded-xl bg-neutral-100 p-4 text-center sm:p-6 md:p-8 dark:bg-neutral-800'>
					<h3 className='text-balance font-medium sm:text-lg md:text-xl'>
						Create a course to start organizing your notes.
					</h3>
				</article>
				<article className='rounded-xl bg-neutral-100 p-4 text-center sm:p-6 md:p-8 dark:bg-neutral-800'>
					<h3 className='text-balance font-medium sm:text-lg md:text-xl'>
						Add lecture notes under each course with ease.
					</h3>
				</article>
				<article className='rounded-xl bg-neutral-100 p-4 text-center sm:p-6 md:p-8 dark:bg-neutral-800'>
					<h3 className='text-balance font-medium sm:text-lg md:text-xl'>
						Plan and track your tasks in one convenient tab.
					</h3>
				</article>
				<article className='rounded-xl bg-neutral-100 p-4 text-center sm:p-6 md:p-8 dark:bg-neutral-800'>
					<h3 className='text-balance font-medium sm:text-lg md:text-xl'>
						Customize your app settings for a personalized experience.
					</h3>
				</article>
			</div>
		</section>
	);
};

export default HowItWorks;
