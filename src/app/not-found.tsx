import { buttonVariants } from '@/components/Button';
import Link from 'next/link';

const notFound = () => {
	return (
		<div className='mx-auto text-center'>
			<p>This page does not exist</p>
			<Link
				href='/'
				className={buttonVariants({ variant: 'primary', size: 'large' })}>
				Go Back to Home
			</Link>
		</div>
	);
};

export default notFound;
