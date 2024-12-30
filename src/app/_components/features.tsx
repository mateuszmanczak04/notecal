import Image from 'next/image';

const Features = () => {
	return (
		<section id='features' className='mx-auto max-w-screen-2xl px-4 text-center'>
			<h2 className=' text-3xl font-black tracking-tight sm:text-4xl md:text-5xl'>Why Choose NoteCal?</h2>
			<p className='mx-auto mt-4 text-balance  leading-relaxed sm:text-lg md:text-xl'>
				There are some reasons why you should choose NoteCal for your daily productivity app!
			</p>
			<div className='mt-4 grid gap-4 sm:mt-6 sm:gap-6 md:mt-8 md:gap-8 xl:grid-cols-2'>
				<article className='space-y-4 rounded-xl bg-neutral-50 p-4 dark:bg-neutral-800'>
					<h3 className='text-balance font-semibold sm:text-lg md:text-xl'>
						It helps you keep your university notes separated
					</h3>
					<p className='mx-auto text-balance leading-relaxed opacity-75'>
						You will never again struggle with organizing your notes by subjects. We&apos;ve made a tool
						which will help you keep it simple.
					</p>
					<Image width={1440} height={900} alt='' src='/images/courses.png' className='dark:hidden' />
					<Image
						width={1440}
						height={900}
						alt=''
						src='/images/courses-dark.png'
						className='hidden dark:inline-block'
					/>
				</article>
				<article className='space-y-4 rounded-xl bg-neutral-50 p-4 dark:bg-neutral-800'>
					<h3 className='text-balance font-semibold sm:text-lg md:text-xl'>
						Write lecture notes with a powerful WYSIWYG editor.
					</h3>
					<p className='mx-auto text-balance leading-relaxed opacity-75'>
						You are able to write beautiful notes with our powerful WYSIWYG (What You See Is What You Get)
						editor. It&apos;s as simple as it looks here:
					</p>
					<Image width={1440} height={900} alt='' src='/images/editor.png' className='dark:hidden' />
					<Image
						width={1440}
						height={900}
						alt=''
						src='/images/editor-dark.png'
						className='hidden dark:inline-block'
					/>
				</article>
				<article className='space-y-4 rounded-xl bg-neutral-50 p-4 dark:bg-neutral-800'>
					<h3 className='text-balance font-semibold sm:text-lg md:text-xl'>
						Organize tasks and plan your study schedule.
					</h3>
					<p className='mx-auto text-balance leading-relaxed opacity-75'>
						Never forget to keep track of your tasks and deadlines. Our app allows you to organize your
						tasks efficiently and plan your study schedule effectively.
					</p>
					<Image width={1440} height={900} alt='' src='/images/tasks.png' className='dark:hidden' />
					<Image
						width={1440}
						height={900}
						alt=''
						src='/images/tasks-dark.png'
						className='hidden dark:inline-block'
					/>
				</article>
				<article className='space-y-4 rounded-xl bg-neutral-50 p-4 dark:bg-neutral-800'>
					<h3 className='text-balance font-semibold sm:text-lg md:text-xl'>
						Customizable calendar views to suit your needs.
					</h3>
					<p className='mx-auto text-balance leading-relaxed opacity-75'>
						You can see your schedule for any time forward in the calendar view. Moreover everything is
						customisable to your needs.
					</p>
					<Image width={1440} height={900} alt='' src='/images/calendar.png' className='dark:hidden' />
					<Image
						width={1440}
						height={900}
						alt=''
						src='/images/calendar-dark.png'
						className='hidden dark:inline-block'
					/>
				</article>
			</div>
		</section>
	);
};

export default Features;
