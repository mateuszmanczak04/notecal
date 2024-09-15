import { Button } from '@/components/ui/button';
import Link from 'next/link';

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
