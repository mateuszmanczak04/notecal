import React, { FC } from 'react';
import { Alert, AlertTitle } from '@/components/ui/alert';

interface Props {
	children: React.ReactNode;
}

const SuccessMessage: FC<Props> = ({ children }) => {
	return (
		<Alert
			variant='default'
			className='border-green-500 bg-green-100 text-green-700'>
			<AlertTitle className='mb-0'>{children}</AlertTitle>
		</Alert>
	);
};

export default SuccessMessage;
