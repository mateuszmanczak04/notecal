import Link from 'next/link';
import { buttonVariants } from './Button';

const NavUnauthenticated = () => {
	return (
		<div className='fixed left-0 top-0 z-50 flex h-16 w-screen items-center justify-between bg-primary p-4 text-white'>
			<Link href='/' className='text-2xl font-bold'>
				NoteCal
			</Link>
			<Link
				href='/auth/signup'
				className={buttonVariants({
					variant: 'secondary',
					size: 'medium',
					className: 'leading-10',
				})}>
				Sign Up
			</Link>
		</div>
	);
};

export default NavUnauthenticated;
