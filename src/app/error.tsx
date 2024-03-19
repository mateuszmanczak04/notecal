'use client';

import Button from '@/components/Button';
import { FC } from 'react';

interface ErrorProps {
	error: Error & { digest?: string };
	reset: () => void;
}

const Error: FC<ErrorProps> = ({ error, reset }) => {
	return (
		<div className='mx-auto text-center'>
			<p>{error.message}</p>
			<Button onClick={reset} variant='primary' size='large'>
				Try Again
			</Button>
		</div>
	);
};

export default Error;
