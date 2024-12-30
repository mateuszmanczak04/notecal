const Pricing = () => {
	return (
		<section id='features' className='mx-auto max-w-screen-md px-4'>
			<h2 className='text-center text-3xl font-black tracking-tight sm:text-4xl md:text-5xl'>Pricing</h2>
			<div className='mt-4 grid gap-4 sm:mt-6 md:mt-8 md:grid-cols-3'>
				<article className='rounded-xl bg-neutral-100 p-4 sm:p-6 md:p-8 dark:bg-neutral-800'>
					<h3 className='text-balance font-bold sm:text-lg md:text-xl'>Starter</h3>
					<p className='mt-1 w-fit rounded-full bg-green-100 px-3 text-green-600'>Free forever</p>
					<ul className='mt-2 list-disc pl-4 opacity-75'>
						<li>Unlimited courses</li>
						<li>Unlimited notes</li>
						<li>Unlimited tasks</li>
						<li>Access 24/7</li>
						<li>Full customization</li>
					</ul>
				</article>
				<article className='relative rounded-xl bg-neutral-100 p-4 sm:p-6 md:col-span-2 md:p-8 dark:bg-neutral-800'>
					<h3 className='text-balance font-bold sm:text-lg md:text-xl'>A+ Student</h3>
					<p>$10/month</p>
					<ul className='mt-2 list-disc pl-4 opacity-75'>
						<li>All from Starter pack</li>
						<li>Prompts to AI</li>
						<li>Sharing notes with classmates</li>
						<li>Flashcards</li>
						<li>Code interpreter</li>
						<li>Maths expressions</li>
						<li>Offline access (even in the browser)</li>
					</ul>
					<div className='absolute inset-0 z-10 grid place-content-center rounded-xl bg-neutral-500/50'>
						<p className='rounded-md bg-white px-3 py-2 dark:bg-neutral-800'>Not available yet</p>
					</div>
				</article>
			</div>
		</section>
	);
};

export default Pricing;
