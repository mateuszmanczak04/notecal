import Link from 'next/link';

const Footer = () => {
	return (
		<footer className='bg-primary-500 mt-auto p-8 text-white'>
			<div className='mx-auto grid max-w-screen-sm grid-cols-1 gap-2 text-center'>
				<Link href='/privacy-policy' className='hover:underline'>
					Privacy policy
				</Link>
				<Link href='https://app.notecal.app/auth/login' className='hover:underline'>
					Login page
				</Link>
				<Link href='https://app.notecal.app/auth/register' className='hover:underline'>
					Register page
				</Link>
			</div>
		</footer>
	);
};

export default Footer;
