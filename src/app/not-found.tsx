import { Button } from '@/components/button';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
	title: 'Page not found',
	robots: {
		index: false,
	},
};

const notFound = () => {
	return (
		<div className='mx-auto text-center'>
			<p>This page does not exist</p>
			<Button asChild>
				<Link prefetch href='/'>
					Go Back Home
				</Link>
			</Button>
		</div>
	);
};

export default notFound;
