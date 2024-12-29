const Features = () => {
	return (
		<section id='features' className='mx-auto max-w-screen-md px-4'>
			<h2 className='text-center text-3xl font-black tracking-tight sm:text-4xl md:text-5xl'>
				Why Choose NoteCal?
			</h2>
			<div className='mt-4 grid gap-4 sm:mt-6 md:mt-8'>
				<article className='rounded-xl bg-neutral-100 p-4 text-center sm:p-6 md:p-8'>
					<h3 className='text-balance font-medium sm:text-lg md:text-xl'>
						Create and manage courses like Maths or Physics.
					</h3>
				</article>
				<article className='rounded-xl bg-neutral-100 p-4 text-center sm:p-6 md:p-8'>
					<h3 className='text-balance font-medium sm:text-lg md:text-xl'>
						Write lecture notes with a powerful WYSIWYG editor.
					</h3>
				</article>
				<article className='rounded-xl bg-neutral-100 p-4 text-center sm:p-6 md:p-8'>
					<h3 className='text-balance font-medium sm:text-lg md:text-xl'>
						Organize tasks and plan your study schedule.
					</h3>
				</article>
				<article className='rounded-xl bg-neutral-100 p-4 text-center sm:p-6 md:p-8'>
					<h3 className='text-balance font-medium sm:text-lg md:text-xl'>
						Customizable calendar views to suit your needs.
					</h3>
				</article>
				<article className='rounded-xl bg-neutral-100 p-4 text-center sm:p-6 md:p-8'>
					<h3 className='text-balance font-medium sm:text-lg md:text-xl'>
						Fast and secure: server-side rendering for safety, client-side rendering for performance.
					</h3>
				</article>
			</div>
		</section>
	);
};

export default Features;
