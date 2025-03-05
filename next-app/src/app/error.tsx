'use client';

import { Button } from '@/components/button';
import ErrorMessage from '@/components/error-message';
import { RotateCw } from 'lucide-react';
import { FC } from 'react';

interface ErrorProps {
	error: Error & { digest?: string };
	reset: () => void;
}

const Error: FC<ErrorProps> = ({ error, reset }) => {
	return (
		<div className='mx-auto text-center'>
			<ErrorMessage>{error.message}</ErrorMessage>
			<Button onClick={reset}>
				<RotateCw />
				Try Again
			</Button>
		</div>
	);
};

export default Error;
