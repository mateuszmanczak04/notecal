import { Button } from '@/components/ui/button';
import Link from 'next/link';

const NavUnauthenticated = () => {
	return (
		<div className='fixed left-0 top-0 z-50 flex h-16 w-screen items-center justify-between bg-primary p-4 text-white'>
			<Link href='/' className='text-2xl font-bold'>
				NoteCal
			</Link>
			<Button asChild className='leading-10' variant='secondary'>
				<Link href='/auth/signup'>Sign Up</Link>
			</Button>
		</div>
	);
};

export default NavUnauthenticated;
