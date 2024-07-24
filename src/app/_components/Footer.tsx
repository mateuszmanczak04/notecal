import Link from 'next/link';

const Footer = () => {
	return (
		<div className='mt-auto bg-primary-500 p-8 text-white'>
			<div className='mx-auto grid max-w-screen-sm grid-cols-1 space-y-2 text-center sm:grid-cols-2'>
				<Link
					href='https://github.com/mateuszmanczak04/notecal'
					className='block hover:underline'>
					Source code (GitHub)
				</Link>
				<Link
					href='https://www.linkedin.com/in/mateusz-manczak/'
					className='block hover:underline'>
					Author&apos;s LinkedIn
				</Link>
				<Link
					href='https://www.upwork.com/freelancers/~010d3eb9fdecec067e'
					className='block hover:underline'>
					Author&apos;s Upwork
				</Link>
				<p className='pointer-events-none block opacity-50'>
					Terms & conditions (soon)
				</p>
				<p className='pointer-events-none block opacity-50'>
					Privacy policy (soon)
				</p>
				<p className='pointer-events-none block opacity-50'>Sitemap (soon)</p>
			</div>
		</div>
	);
};

export default Footer;
