'use client';

import ErrorMessage from '@/components/common/error-message';
import { Button } from '@/components/ui/button';
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
