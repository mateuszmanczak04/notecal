'use client';

import { Button } from '@/components/ui/button';
import { FC } from 'react';

interface ErrorProps {
	error: Error & { digest?: string };
	reset: () => void;
}

const Error: FC<ErrorProps> = ({ error, reset }) => {
	return (
		<div className='mx-auto text-center'>
			<p>{error.message}</p>
			<Button onClick={reset} size='lg'>
				Try Again
			</Button>
		</div>
	);
};

export default Error;
