import React, { FC } from 'react';
import { Alert, AlertTitle } from '@/components/ui/alert';

interface Props {
	children: React.ReactNode;
}

const ErrorMessage: FC<Props> = ({ children }) => {
	return (
		<Alert variant='destructive'>
			<AlertTitle className='mb-0'>{children}</AlertTitle>
		</Alert>
	);
};

export default ErrorMessage;
