import Link from 'next/link';

const Footer = () => {
	return (
		<div className='mt-auto bg-primary-500 p-8 text-white'>
			<div className='mx-auto grid max-w-screen-sm grid-cols-1 gap-2 text-center sm:grid-cols-2'>
				<Link href='https://github.com/mateuszmanczak04/notecal' className='mt-0 block hover:underline'>
					Source code (GitHub)
				</Link>
				<Link href='https://www.linkedin.com/in/mateusz-manczak/' className='mt-0 block hover:underline'>
					Author&apos;s LinkedIn
				</Link>
				<Link
					href='https://www.upwork.com/freelancers/~010d3eb9fdecec067e'
					className='mt-0 block hover:underline'
				>
					Author&apos;s Upwork
				</Link>
				<Link href='#' className='pointer-events-none block opacity-50 '>
					Terms & conditions (soon)
				</Link>
				<Link href='#' className='pointer-events-none block opacity-50'>
					Privacy policy (soon)
				</Link>
				<Link href='#' className='pointer-events-none block opacity-50'>
					Sitemap (soon)
				</Link>
			</div>
		</div>
	);
};

export default Footer;
